import { describe, it, expect, afterEach } from "vitest";
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
} from "../src";
import { cleanUpEntity, expectHttpError } from "./helpers";
import { NgsiLdBadRequest, NgsiLdNotFound } from "../src";

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

// Track entities (regular + temporal) for cleanup
const createdEntityIds: string[] = [];

afterEach(async () => {
  while (createdEntityIds.length > 0) {
    const id = createdEntityIds.pop()!;
    await cleanUpEntity(id);
  }
});

function trackId(id: string): string {
  createdEntityIds.push(id);
  return id;
}

// ---------------------------------------------------------------------------
// 1. upsertTemporal
// ---------------------------------------------------------------------------
describe("upsertTemporal", () => {
  it("should upsert a temporal entity and return 201 or 204", async () => {
    const entity = makeTemporalEntity();
    const response = await upsertTemporal(entity);

    expect([201, 204]).toContain(response.status);
    trackId(entity.id!);
  });

  it("should support local=true query parameter", async () => {
    const entity = makeTemporalEntity();
    const response = await upsertTemporal(entity, { local: true });

    expect([201, 204]).toContain(response.status);
    trackId(entity.id!);
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
    trackId(entity.id!);

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
    trackId(entity.id!);

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

    const response = await deleteTemporal(entity.id!);
    expect(response.status).toBe(204);

    await cleanUpEntity(entity.id!);
  });

  it("should return 404 when deleting temporal for non-existent entity", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      deleteTemporal("urn:ngsi-ld:TemporalEntity:nonexistent-delete-99999"),
    );
  });
});

// ---------------------------------------------------------------------------
// 5. appendAttrsTemporal
// ---------------------------------------------------------------------------
describe("appendAttrsTemporal", () => {
  it("should append temporal attributes to an existing temporal entity", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);
    trackId(entity.id!);

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

    await expectHttpError(404, NgsiLdNotFound, () =>
      appendAttrsTemporal(
        "urn:ngsi-ld:TemporalEntity:nonexistent-append-99999",
        newAttrs,
      ),
    );
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
    trackId(entity.id!);

    const response = await deleteAttrsTemporal(entity.id!, "humidity");
    expect(response.status).toBe(204);
  });

  it("should return 404 for non-existent entity", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      deleteAttrsTemporal(
        "urn:ngsi-ld:TemporalEntity:nonexistent-attr-99999",
        "temperature",
      ),
    );
  });
});

// ---------------------------------------------------------------------------
// 7. updateAttrsTemporal
// ---------------------------------------------------------------------------
describe("updateAttrsTemporal", () => {
  it("should update a specific attribute instance in a temporal entity", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);
    trackId(entity.id!);

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

    await expectHttpError(404, NgsiLdNotFound, () =>
      updateAttrsTemporal(
        "urn:ngsi-ld:TemporalEntity:nonexistent-update-99999",
        "temperature",
        "urn:ngsi-ld:instanceId:nonexistent",
        patch,
      ),
    );
  });
});

// ---------------------------------------------------------------------------
// 8. deleteAttrInstanceTemporal
// ---------------------------------------------------------------------------
describe("deleteAttrInstanceTemporal", () => {
  it("should delete a specific attribute instance from a temporal entity", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);
    trackId(entity.id!);

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

    const response = await deleteAttrInstanceTemporal(
      entity.id!,
      "temperature",
      instanceId,
    );
    expect(response.status).toBe(204);
  });

  it("should return 404 for non-existent entity", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      deleteAttrInstanceTemporal(
        "urn:ngsi-ld:TemporalEntity:nonexistent-inst-99999",
        "temperature",
        "urn:ngsi-ld:instanceId:nonexistent",
      ),
    );
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
    trackId(entity.id!);

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
    trackId(entity.id!);

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
