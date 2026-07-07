import { describe, it, expect, beforeEach } from "vitest";
import {
  upsertTemporal,
  queryTemporal,
  retrieveTemporal,
  deleteTemporal,
  appendAttrsTemporal,
  deleteAttrsTemporal,
  updateAttrsTemporal,
  deleteAttrInstanceTemporal,
  temporalQueryBatch,
  retrieveEntity,
  NgsiLdNotImplemented,
  schemas,
} from "../src";
import { cleanUpAll, gateBroker } from "./helpers";
import { NgsiLdBadRequest, NgsiLdNotFound } from "../src";

// Wipe all stale resources from previous crashed runs before each test.
beforeEach(cleanUpAll);

const NGSILD_CORE_CONTEXT = [
  "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
];

let temporalCounter = 0;

interface TemperatureSensor extends schemas.Entity<"TemperatureSensor"> {
  temperature: schemas.Property<number>;
}

/** Create a minimal temporal entity body with observedAt timestamps. */
function makeTemporalEntity(overrides?: {
  type?: string;
  observedAt?: string;
}) {
  temporalCounter += 1;
  const suffix = `${Date.now()}-${temporalCounter}`;
  const id = `urn:ngsi-ld:TemporalEntity:test-${suffix}`;
  const observedAt = overrides?.observedAt ?? new Date().toISOString();

  return {
    "@context": NGSILD_CORE_CONTEXT,
    id,
    type: overrides?.type ?? "TemporalTestEntity",
    temperature: [
      {
        type: "Property" as const,
        value: 25 + temporalCounter,
        observedAt,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// 1. upsertTemporal
// ---------------------------------------------------------------------------
describe("upsertTemporal", () => {
  it("should upsert a temporal entity and return 201", async () => {
    const entity = makeTemporalEntity();
    const response = await upsertTemporal(entity);

    expect(response.status).toBe(201);
  });

  it("should support local=true query parameter", async () => {
    const entity = makeTemporalEntity();

    if (gateBroker("stellio", "upsertTemporal has no ?local=true support")) {
      // Stellio does not support local=true for temporal operations
      await expect(() =>
        upsertTemporal(entity, { local: true }),
      ).rejects.toThrow(NgsiLdNotImplemented);
      return;
    }

    const response = await upsertTemporal(entity, { local: true });

    expect(response.status).toBe(201);
  });
  it("should support ListProperty", async () => {
    // ListProperty is defined in the NGSI-LD spec (§5.2.36) and the spec
    // explicitly mentions instanceId is "only used in temporal representation
    // of ListProperties". However, neither Stellio nor Orion-LD implement it.
    const observedAt = new Date().toISOString();
    const entity = {
      ...makeTemporalEntity({ observedAt }),
      readings: [
        {
          type: "ListProperty" as const,
          valueList: [1, 2, 3],
          observedAt,
        },
      ],
    };

    const isGated = gateBroker(
      ["stellio", "orion"],
      "ListProperty not implemented",
    );
    if (isGated) {
      await expect(upsertTemporal(entity)).rejects.toThrow(NgsiLdBadRequest);
      return;
    }

    // Unknown / future broker — assert the spec-correct behavior.
    const response = await upsertTemporal(entity);
    expect(response.status).toBe(201);
  });

  it("should make the entity available via retrieveEntity with the latest temporal value", async () => {
    // Test verifies that temporal entity value is available via the regular
    // entity endpoint, with the latest temporal value as a plain Property (not
    // an array).

    const observedAt = new Date().toISOString();
    const entity = makeTemporalEntity({
      observedAt,
    });
    await upsertTemporal(entity);

    // Orion-LD does not sync temporal data to the regular entity endpoint, and thus gives 404
    if (gateBroker("orion", "temporal not synced to regular entity")) {
      try {
        await retrieveEntity(entity.id!);
      } catch (err) {
        expect(err).toBeInstanceOf(NgsiLdNotFound);
        return;
      }
    }

    // The regular entity endpoint should return the entity, with the latest
    // temporal attribute value as a plain Property (not an array).
    const regular = await retrieveEntity<TemperatureSensor>(entity.id!);

    expect(regular.id).toBe(entity.id);
    expect(regular.type).toBe(entity.type);
    // The temporal Property[] is collapsed to a single Property on the
    // regular entity endpoint.;
    expect(regular.temperature).toBeDefined();
    expect(regular.temperature.type).toBe("Property");
    expect(regular.temperature.value).toBe(entity.temperature[0].value);
  });
});
// ---------------------------------------------------------------------------
describe("queryTemporal", () => {
  const timeAt = new Date().toISOString();

  it("should query temporal entities", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);

    const data = await queryTemporal({
      type: entity.type as string,
      timerel: "before",
      timeAt,
    });
    expect(Array.isArray(data)).toBe(true);
  });

  it("should return 400 when required temporal query params are missing", async () => {
    await expect(queryTemporal({ type: "NonExistent12345" })).rejects.toThrow(
      NgsiLdBadRequest,
    );
  });
});

// ---------------------------------------------------------------------------
// 3. retrieveTemporal
// ---------------------------------------------------------------------------
describe("retrieveTemporal", () => {
  const timeAt = new Date().toISOString();

  it("should retrieve temporal evolution of an entity", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);

    const data = await retrieveTemporal(entity.id!, {
      timerel: "before",
      timeAt,
    });
    expect(data).toBeDefined();
  });

  it("should return 404 for a non-existent entity", async () => {
    await expect(
      retrieveTemporal("urn:ngsi-ld:TemporalEntity:nonexistent-99999", {
        timerel: "before",
        timeAt,
      }),
    ).rejects.toThrow(NgsiLdNotFound);
  });
});

// ---------------------------------------------------------------------------
// 4. deleteTemporal
// ---------------------------------------------------------------------------
describe("deleteTemporal", () => {
  it("should delete temporal representation of an entity", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);

    if (gateBroker("orion", "deleteTemporal not implemented")) {
      await expect(() => deleteTemporal(entity.id!)).rejects.toThrow(
        NgsiLdNotImplemented,
      );
      return;
    }

    const result = await deleteTemporal(entity.id!);
    expect(result).toBeUndefined();
  });

  it("should return 404 when deleting temporal for non-existent entity", async () => {
    try {
      await deleteTemporal(
        "urn:ngsi-ld:TemporalEntity:nonexistent-delete-99999",
      );
    } catch (err) {
      if (gateBroker("orion", "deleteTemporal not implemented")) {
        expect(err).toBeInstanceOf(NgsiLdNotImplemented);
        return;
      }
      expect(err).toBeInstanceOf(NgsiLdNotFound);
    }
  });
});

// ---------------------------------------------------------------------------
// 5. appendAttrsTemporal
// ---------------------------------------------------------------------------
describe("appendAttrsTemporal", () => {
  it("should append temporal attributes to an existing temporal entity", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);

    const newAttrs = {
      "@context": NGSILD_CORE_CONTEXT,
      humidity: [
        {
          type: "Property" as const,
          value: 60,
          observedAt: new Date().toISOString(),
        },
      ],
    };

    if (gateBroker("orion", "appendAttrsTemporal not implemented")) {
      await expect(() =>
        appendAttrsTemporal(entity.id!, newAttrs),
      ).rejects.toThrow(NgsiLdNotImplemented);
      return;
    }

    const response = await appendAttrsTemporal(entity.id!, newAttrs);
    expect(response).toBeUndefined();
  });

  it("should return 404 for non-existent entity", async () => {
    const newAttrs = {
      "@context": NGSILD_CORE_CONTEXT,
      humidity: [
        {
          type: "Property" as const,
          value: 60,
          observedAt: new Date().toISOString(),
        },
      ],
    };

    try {
      await appendAttrsTemporal(
        "urn:ngsi-ld:TemporalEntity:nonexistent-append-99999",
        newAttrs,
      );
    } catch (err) {
      if (gateBroker("orion", "appendAttrsTemporal not implemented")) {
        expect(err).toBeInstanceOf(NgsiLdNotImplemented);
        return;
      }
      expect(err).toBeInstanceOf(NgsiLdNotFound);
    }
  });
});

// ---------------------------------------------------------------------------
// 6. deleteAttrsTemporal
// ---------------------------------------------------------------------------
describe("deleteAttrsTemporal", () => {
  it("should delete a temporal attribute from an existing entity", async () => {
    const entity = {
      ...makeTemporalEntity(),
      humidity: [
        {
          type: "Property" as const,
          value: 55,
          observedAt: new Date().toISOString(),
        },
      ],
    };
    await upsertTemporal(entity);

    if (gateBroker("orion", "deleteAttrsTemporal not implemented")) {
      await expect(() =>
        deleteAttrsTemporal(entity.id!, "humidity"),
      ).rejects.toThrow(NgsiLdNotImplemented);
      return;
    }

    const response = await deleteAttrsTemporal(entity.id!, "humidity");
    expect(response).toBeUndefined();
  });

  it("should return 404 for non-existent entity", async () => {
    try {
      await deleteAttrsTemporal(
        "urn:ngsi-ld:TemporalEntity:nonexistent-attr-99999",
        "temperature",
      );
    } catch (err) {
      if (gateBroker("orion", "deleteAttrsTemporal not implemented")) {
        expect(err).toBeInstanceOf(NgsiLdNotImplemented);
        return;
      }
      expect(err).toBeInstanceOf(NgsiLdNotFound);
    }
  });
});

// ---------------------------------------------------------------------------
// 7. updateAttrsTemporal
// ---------------------------------------------------------------------------
describe("updateAttrsTemporal", () => {
  it("should update a specific attribute instance in a temporal entity", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);

    // Retrieve to get the real instanceId (broker-assigned, not guessable)
    const retrieved = await retrieveTemporal(entity.id!, {
      timerel: "before",
      timeAt: new Date(Date.now() + 60000).toISOString(),
    });
    const tempInstances = (retrieved as any)["temperature"] ?? [];
    const typedInstances = tempInstances as {
      instanceId?: string;
      observedAt?: string;
    }[];
    const instanceId = typedInstances[0]?.instanceId;
    if (!instanceId) return; // skip if broker doesn't expose instanceId

    const patch = {
      "@context": NGSILD_CORE_CONTEXT,
      type: "Property" as const,
      value: 999,
      observedAt: typedInstances[0]?.observedAt ?? new Date().toISOString(),
    };

    if (gateBroker("orion", "updateAttrsTemporal not implemented")) {
      await expect(() =>
        updateAttrsTemporal(entity.id!, "temperature", instanceId, patch),
      ).rejects.toThrow(NgsiLdNotImplemented);
      return;
    }

    const response = await updateAttrsTemporal(
      entity.id!,
      "temperature",
      instanceId,
      patch,
    );
    expect(response).toBeUndefined();
  });

  it("should return 404 for non-existent entity", async () => {
    const patch = {
      "@context": NGSILD_CORE_CONTEXT,
      type: "Property" as const,
      value: 999,
      observedAt: new Date().toISOString(),
    };

    try {
      await updateAttrsTemporal(
        "urn:ngsi-ld:TemporalEntity:nonexistent-update-99999",
        "temperature",
        "urn:ngsi-ld:instanceId:nonexistent",
        patch,
      );
    } catch (err) {
      if (gateBroker("orion", "updateAttrsTemporal not implemented")) {
        expect(err).toBeInstanceOf(NgsiLdNotImplemented);
        return;
      }
      expect(err).toBeInstanceOf(NgsiLdNotFound);
    }
  });
});

// ---------------------------------------------------------------------------
// 8. deleteAttrInstanceTemporal
// ---------------------------------------------------------------------------
describe("deleteAttrInstanceTemporal", () => {
  it("should delete a specific attribute instance from a temporal entity", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);

    // Retrieve to get the real instanceId (broker-assigned, not guessable)
    const retrieved = await retrieveTemporal(entity.id!, {
      timerel: "before",
      timeAt: new Date(Date.now() + 60000).toISOString(),
    });
    const tempList = ((retrieved as any)["temperature"] ?? []) as {
      instanceId?: string;
    }[];
    const instanceId = tempList[0]?.instanceId;
    if (!instanceId) return;

    if (gateBroker("orion", "deleteAttrInstanceTemporal not implemented")) {
      await expect(() =>
        deleteAttrInstanceTemporal(entity.id!, "temperature", instanceId),
      ).rejects.toThrow(NgsiLdNotImplemented);
      return;
    }

    const response = await deleteAttrInstanceTemporal(
      entity.id!,
      "temperature",
      instanceId,
    );
    expect(response).toBeUndefined();
  });

  it("should return 404 for non-existent entity", async () => {
    try {
      await deleteAttrInstanceTemporal(
        "urn:ngsi-ld:TemporalEntity:nonexistent-inst-99999",
        "temperature",
        "urn:ngsi-ld:instanceId:nonexistent",
      );
    } catch (err) {
      if (gateBroker("orion", "deleteAttrInstanceTemporal not implemented")) {
        expect(err).toBeInstanceOf(NgsiLdNotImplemented);
        return;
      }
      expect(err).toBeInstanceOf(NgsiLdNotFound);
    }
  });
});

// ---------------------------------------------------------------------------
// 9. temporalQueryBatch
// ---------------------------------------------------------------------------
describe("temporalQueryBatch", () => {
  const timeAt = new Date().toISOString();

  it("should query temporal entities via POST batch operation", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);

    const batchBody = {
      type: "Query" as const,
      entities: [{ id: entity.id, type: entity.type as string }],
      temporalQ: {
        timerel: "before" as const,
        timeAt,
      },
    };

    const data = await temporalQueryBatch(batchBody);
    expect(Array.isArray(data)).toBe(true);
  });

  it("should support temporal query batch with entity type filter", async () => {
    const entity = makeTemporalEntity({ type: "BatchQueryTemporalTest" });
    await upsertTemporal(entity);

    const batchBody = {
      type: "Query" as const,
      entities: [{ type: "BatchQueryTemporalTest" }],
      temporalQ: {
        timerel: "between" as const,
        timeAt: new Date(Date.now() - 3600000).toISOString(),
        endTimeAt: new Date(Date.now() + 3600000).toISOString(),
      },
    };

    const data = await temporalQueryBatch(batchBody);
    expect(Array.isArray(data)).toBe(true);
  });
});
