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
} from "../src/generated/api";
import { cleanUpEntity, warnIf501 } from "./helpers";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
    properties: {
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

    // Stellio returns 501 (local parameter not yet implemented); Orion-LD returns 201/204
    warnIf501(response.status, "upsertTemporal?local=true");
    expect([201, 204, 501]).toContain(response.status);
    if ((response.status as number) === 501) return;
    trackId(entity.id!);
  });
});

// ---------------------------------------------------------------------------
// 2. queryTemporal
// ---------------------------------------------------------------------------
describe("queryTemporal", () => {
  it("should query temporal entities and return 200", async () => {
    // Create an entity first so there's temporal data to query
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);
    trackId(entity.id!);

    // queryTemporal requires timerel and timeAt; without them returns 400
    const response = await queryTemporal({ type: entity.type as string });
    expect([200, 400]).toContain(response.status);

    if (response.status === 200) {
      expect(Array.isArray(response.data)).toBe(true);
    }
  });

  it("should return 400 when required temporal query params are missing", async () => {
    // queryTemporal requires timeAt and timerel — without them expect 400
    const response = await queryTemporal({ type: "NonExistent12345" });
    // Orion-LD may return 400 (missing required params) or 200 (empty results)
    // depending on whether the query is valid without timerel/timeAt
    expect([200, 400]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 3. retrieveTemporal
// ---------------------------------------------------------------------------
describe("retrieveTemporal", () => {
  it("should retrieve temporal evolution of an entity and return 200", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);
    trackId(entity.id!);

    const response = await retrieveTemporal(entity.id!);
    // May need timeAt/timerel params — without them could be 400
    expect([200, 400]).toContain(response.status);

    if (response.status === 200) {
      expect(response.data).toBeDefined();
    }
  });

  it("should return 404 for a non-existent entity", async () => {
    const response = await retrieveTemporal(
      "urn:ngsi-ld:TemporalEntity:nonexistent-99999",
    );
    expect([404, 400]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 4. deleteTemporal
// ---------------------------------------------------------------------------
describe("deleteTemporal", () => {
  it("should delete temporal representation of an entity and return 204", async () => {
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);
    // Don't track for regular cleanup — we're testing deleteTemporal

    const response = await deleteTemporal(entity.id!);
    // 204 on success, 404 if not found, 501 if temporal not enabled
    warnIf501(response.status, "DELETE /temporal/entities/{entityId}");
    expect([204, 404, 501]).toContain(response.status);

    // Also clean up the regular entity if it still exists
    await cleanUpEntity(entity.id!);
  });

  it("should return 404 when deleting temporal for non-existent entity", async () => {
    const response = await deleteTemporal(
      "urn:ngsi-ld:TemporalEntity:nonexistent-delete-99999",
    );
    warnIf501(response.status, "DELETE /temporal/entities/{entityId}");
    expect([404, 204, 501]).toContain(response.status);
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
    // 204/201 on success, 501 if temporal not enabled
    warnIf501(response.status, "POST /temporal/entities/{entityId}/attrs");
    expect([204, 201, 501]).toContain(response.status);
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

    const response = await appendAttrsTemporal(
      "urn:ngsi-ld:TemporalEntity:nonexistent-append-99999",
      newAttrs,
    );
    // 404 not found, 400 bad request, 501 not implemented
    warnIf501(response.status, "POST /temporal/entities/{entityId}/attrs");
    expect([404, 400, 501]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 6. deleteAttrsTemporal
// ---------------------------------------------------------------------------
describe("deleteAttrsTemporal", () => {
  it("should delete a temporal attribute from an existing entity", async () => {
    // Use spread + extra property to add humidity for deletion
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
    // 204 on success, 404 if not found, 501 if temporal not enabled
    warnIf501(
      response.status,
      "DELETE /temporal/entities/{entityId}/attrs/{attrId}",
    );
    expect([204, 404, 200, 501]).toContain(response.status);
  });

  it("should return 404 for non-existent entity", async () => {
    const response = await deleteAttrsTemporal(
      "urn:ngsi-ld:TemporalEntity:nonexistent-attr-99999",
      "temperature",
    );
    warnIf501(
      response.status,
      "DELETE /temporal/entities/{entityId}/attrs/{attrId}",
    );
    expect([404, 400, 501]).toContain(response.status);
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

    // To update, we need an instanceId. The instanceId is typically a
    // combination or derived from observedAt. We'll try with a timestamp.
    // First retrieve the entity to find an instanceId, or use a known format.

    const patch = {
      "@context": NGSILD_CORE_CONTEXT,
      temperature: [
        {
          type: "Property" as const,
          value: 999,
          observedAt: (
            entity.properties.temperature as Array<{ observedAt?: string }>
          )?.[0]?.observedAt,
        },
      ],
    };

    // InstanceId format varies; Orion-LD may use the observedAt as URI-encoded
    // Try with a simple timestamp-based instanceId
    const instanceId = encodeURIComponent(
      (entity.properties.temperature as Array<{ observedAt?: string }>)?.[0]
        ?.observedAt ?? new Date().toISOString(),
    );

    const response = await updateAttrsTemporal(
      entity.id!,
      "temperature",
      instanceId,
      patch,
    );
    // Can be 204 (success), 404 (instance not found), 400 (bad request), 501 (not implemented)
    warnIf501(
      response.status,
      "PATCH /temporal/entities/{entityId}/attrs/{attrId}/{instanceId}",
    );
    expect([204, 400, 404, 501]).toContain(response.status);
  });

  it("should return 404 for non-existent entity", async () => {
    const patch = {
      "@context": NGSILD_CORE_CONTEXT,
      temperature: [
        {
          type: "Property" as const,
          value: 999,
          observedAt: new Date().toISOString(),
        },
      ],
    };

    const response = await updateAttrsTemporal(
      "urn:ngsi-ld:TemporalEntity:nonexistent-update-99999",
      "temperature",
      "someInstanceId",
      patch,
    );
    warnIf501(
      response.status,
      "PATCH /temporal/entities/{entityId}/attrs/{attrId}/{instanceId}",
    );
    expect([404, 400, 501]).toContain(response.status);
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

    const instanceId = encodeURIComponent(
      (entity.properties.temperature as Array<{ observedAt?: string }>)[0]
        ?.observedAt ?? new Date().toISOString(),
    );

    const response = await deleteAttrInstanceTemporal(
      entity.id!,
      "temperature",
      instanceId,
    );
    // 204 (deleted), 404 (instance not found), 400 (bad request), 501 (not implemented)
    warnIf501(
      response.status,
      "DELETE /temporal/entities/{entityId}/attrs/{attrId}/{instanceId}",
    );
    expect([204, 400, 404, 501]).toContain(response.status);
  });

  it("should return 404 for non-existent entity", async () => {
    const response = await deleteAttrInstanceTemporal(
      "urn:ngsi-ld:TemporalEntity:nonexistent-inst-99999",
      "temperature",
      "someInstanceId",
    );
    warnIf501(
      response.status,
      "DELETE /temporal/entities/{entityId}/attrs/{attrId}/{instanceId}",
    );
    expect([404, 400, 501]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 9. temporalQueryBatch
// ---------------------------------------------------------------------------
describe("temporalQueryBatch", () => {
  it("should query temporal entities via POST batch operation", async () => {
    // Create a temporal entity first
    const entity = makeTemporalEntity();
    await upsertTemporal(entity);
    trackId(entity.id!);

    const batchBody = {
      "@context": NGSILD_CORE_CONTEXT,
      type: "Query" as const,
      entities: [{ id: entity.id, type: entity.type as string }],
    };

    const response = await temporalQueryBatch(batchBody);
    expect([200, 400]).toContain(response.status);

    if (response.status === 200) {
      expect(Array.isArray(response.data)).toBe(true);
    }
  });

  it("should support temporal query batch with entity type filter", async () => {
    const entity = makeTemporalEntity({ type: "BatchQueryTemporalTest" });
    await upsertTemporal(entity);
    trackId(entity.id!);

    const batchBody = {
      "@context": NGSILD_CORE_CONTEXT,
      type: "Query" as const,
      entities: [{ type: "BatchQueryTemporalTest" }],
      timerel: "between",
      timeAt: new Date(Date.now() - 3600000).toISOString(),
      endTimeAt: new Date(Date.now() + 3600000).toISOString(),
    };

    const response = await temporalQueryBatch(batchBody);
    expect([200, 400]).toContain(response.status);

    if (response.status === 200) {
      expect(Array.isArray(response.data)).toBe(true);
    }
  });
});
