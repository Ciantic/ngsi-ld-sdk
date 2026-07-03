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
  NgsiLdNotImplemented,
} from "../src";
import { cleanUpAll, detectBroker, expectHttpError } from "./helpers";
import { NgsiLdBadRequest, NgsiLdNotFound } from "../src";

// Wipe all stale resources from previous crashed runs before each test.
beforeEach(cleanUpAll);

const NGSILD_CORE_CONTEXT = [
  "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
];

let temporalCounter = 0;

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
    $props: {
      temperature: [
        {
          type: "Property" as const,
          value: 25 + temporalCounter,
          observedAt,
        },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// 1. upsertTemporal
// ---------------------------------------------------------------------------
describe("upsertTemporal", () => {
  it("should upsert a temporal entity and return 201 or 204", async () => {
    const entity = makeTemporalEntity();
    const response = await upsertTemporal(entity);

    expect([201, 204]).toContain(response.status);
  });

  it("should support local=true query parameter", async () => {
    const entity = makeTemporalEntity();

    if (detectBroker() === "stellio") {
      // Stellio does not support local=true for temporal operations
      await expect(() =>
        upsertTemporal(entity, { local: true }),
      ).rejects.toThrow(NgsiLdNotImplemented);
      return;
    }

    const response = await upsertTemporal(entity, { local: true });

    expect([201, 204]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 2. queryTemporal
// ---------------------------------------------------------------------------
describe("queryTemporal", () => {
  const timeAt = new Date().toISOString();

  it("should query temporal entities and return 200", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);

    const response = await queryTemporal({
      type: entity.type as string,
      timerel: "before",
      timeAt,
    });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it("should return 400 when required temporal query params are missing", async () => {
    await expectHttpError(400, NgsiLdBadRequest, () =>
      queryTemporal({ type: "NonExistent12345" }),
    );
  });
});

// ---------------------------------------------------------------------------
// 3. retrieveTemporal
// ---------------------------------------------------------------------------
describe("retrieveTemporal", () => {
  const timeAt = new Date().toISOString();

  it("should retrieve temporal evolution of an entity and return 200", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);

    const response = await retrieveTemporal(entity.id!, {
      timerel: "before",
      timeAt,
    });
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should return 404 for a non-existent entity", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      retrieveTemporal("urn:ngsi-ld:TemporalEntity:nonexistent-99999", {
        timerel: "before",
        timeAt,
      }),
    );
  });
});

// ---------------------------------------------------------------------------
// 4. deleteTemporal
// ---------------------------------------------------------------------------
describe("deleteTemporal", () => {
  it("should delete temporal representation of an entity and return 204", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);

    if (detectBroker() === "orion") {
      await expect(() => deleteTemporal(entity.id!)).rejects.toThrow(
        NgsiLdNotImplemented,
      );
      return;
    }

    const response = await deleteTemporal(entity.id!);
    expect(response.status).toBe(204);
  });

  it("should return 404 when deleting temporal for non-existent entity", async () => {
    try {
      await deleteTemporal(
        "urn:ngsi-ld:TemporalEntity:nonexistent-delete-99999",
      );
    } catch (err) {
      if (detectBroker() === "orion") {
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

    if (detectBroker() === "orion") {
      await expect(() =>
        appendAttrsTemporal(entity.id!, newAttrs),
      ).rejects.toThrow(NgsiLdNotImplemented);
      return;
    }

    const response = await appendAttrsTemporal(entity.id!, newAttrs);
    expect([204, 201]).toContain(response.status);
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
      if (detectBroker() === "orion") {
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

    if (detectBroker() === "orion") {
      await expect(() =>
        deleteAttrsTemporal(entity.id!, "humidity"),
      ).rejects.toThrow(NgsiLdNotImplemented);
      return;
    }

    const response = await deleteAttrsTemporal(entity.id!, "humidity");
    expect(response.status).toBe(204);
  });

  it("should return 404 for non-existent entity", async () => {
    try {
      await deleteAttrsTemporal(
        "urn:ngsi-ld:TemporalEntity:nonexistent-attr-99999",
        "temperature",
      );
    } catch (err) {
      if (detectBroker() === "orion") {
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
    expect(retrieved.status).toBe(200);
    const props = retrieved.data.$props ?? {};
    const tempInstances = (props["temperature"] ?? []) as {
      instanceId?: string;
      observedAt?: string;
    }[];
    const instanceId = tempInstances[0]?.instanceId;
    if (!instanceId) return; // skip if broker doesn't expose instanceId

    const patch = {
      "@context": NGSILD_CORE_CONTEXT,
      type: "Property" as const,
      value: 999,
      observedAt: tempInstances[0]?.observedAt ?? new Date().toISOString(),
    };

    if (detectBroker() === "orion") {
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
    expect(response.status).toBe(204);
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
      if (detectBroker() === "orion") {
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
    expect(retrieved.status).toBe(200);
    const props = retrieved.data.$props ?? {};
    const tempInstances = (props["temperature"] ?? []) as {
      instanceId?: string;
    }[];
    const instanceId = tempInstances[0]?.instanceId;
    if (!instanceId) return;

    if (detectBroker() === "orion") {
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
    expect(response.status).toBe(204);
  });

  it("should return 404 for non-existent entity", async () => {
    try {
      await deleteAttrInstanceTemporal(
        "urn:ngsi-ld:TemporalEntity:nonexistent-inst-99999",
        "temperature",
        "urn:ngsi-ld:instanceId:nonexistent",
      );
    } catch (err) {
      if (detectBroker() === "orion") {
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

    const response = await temporalQueryBatch(batchBody);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
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

    const response = await temporalQueryBatch(batchBody);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });
});
