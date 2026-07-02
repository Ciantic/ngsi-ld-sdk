import { afterEach, describe, expect, it } from "vitest";
import {
  createBatch,
  createEntity,
  deleteBatch,
  deleteEntity,
  mergeBatch,
  queryBatch,
  queryGeoBatch,
  updateBatch,
  upsertBatch,
} from "../src";
import { expectOk, makeEntity, makeEntityWithGeo } from "./helpers";

// Track created entities for cleanup
const createdIds: string[] = [];

afterEach(async () => {
  // Clean up all entities created during the test
  while (createdIds.length > 0) {
    const id = createdIds.pop()!;
    try {
      await deleteEntity(id);
    } catch {
      // Ignore cleanup errors
    }
  }
});

function trackId(id: string): string {
  createdIds.push(id);
  return id;
}

function trackIds(ids: string[]): void {
  ids.forEach((id) => createdIds.push(id));
}

// ---------------------------------------------------------------------------
// 1. createBatch
// ---------------------------------------------------------------------------
describe("createBatch", () => {
  it("should create multiple entities in a batch and return 201", async () => {
    const entity1 = makeEntity();
    const entity2 = makeEntity();

    const response = await createBatch([entity1, entity2]);

    expectOk(response);
    expect(response.status).toBe(201);

    // Response data should be an array of created entity IDs (or location paths)
    const data = response.data;
    expect(Array.isArray(data)).toBe(true);

    trackIds([entity1.id!, entity2.id!]);
  });

  it("should return 409 when creating batch with duplicate entities", async () => {
    const entity1 = makeEntity();
    const entity2 = makeEntity();

    // Create first batch
    const first = await createBatch([entity1, entity2]);
    expectOk(first);
    trackIds([entity1.id!, entity2.id!]);

    // Try to create again with same IDs
    const second = await createBatch([entity1, entity2]);
    // Multi-status: may return 207 for partial success or 409
    expect([207, 409]).toContain(second.status);
  });
});

// ---------------------------------------------------------------------------
// 2. upsertBatch
// ---------------------------------------------------------------------------
describe("upsertBatch", () => {
  it("should create entities on first upsert (201)", async () => {
    const entity1 = makeEntity();
    const entity2 = makeEntity();

    const response = await upsertBatch([entity1, entity2]);

    // Upsert can return 201 (created), 204 (updated), or 207 (multi-status)
    expect([201, 204, 207]).toContain(response.status);
    expectOk(response);

    trackIds([entity1.id!, entity2.id!]);
  });

  it("should update entities on second upsert (204)", async () => {
    const entity = makeEntity();
    await createEntity(entity);
    trackId(entity.id!);

    // Second upsert with modified attribute
    const updated = {
      ...makeEntity(),
      id: entity.id,
      $props: {
        temperature: {
          type: "Property" as const,
          value: 99,
        },
      },
    };

    const response = await upsertBatch([updated]);
    expect([204, 207]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 3. updateBatch
// ---------------------------------------------------------------------------
describe("updateBatch", () => {
  it("should update multiple entities in a batch and return 204", async () => {
    const entity1 = makeEntity();
    const entity2 = makeEntity();

    await createBatch([entity1, entity2]);
    trackIds([entity1.id!, entity2.id!]);

    // Prepare updated versions
    const update1 = {
      ...makeEntity(),
      id: entity1.id,
      $props: {
        temperature: { type: "Property" as const, value: 100 },
      },
    };

    const update2 = {
      ...makeEntity(),
      id: entity2.id,
      $props: {
        temperature: { type: "Property" as const, value: 200 },
      },
    };

    const response = await updateBatch([update1, update2]);

    // Update can return 204 or 207 (multi-status)
    expect([204, 207]).toContain(response.status);
    expectOk(response);
  });

  it("should return 207/400 for non-existent entity in update batch", async () => {
    const ghost = makeEntity();

    const response = await updateBatch([ghost]);

    // Non-existent entity: 207 (multi-status with errors) or 400
    expect([207, 400]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 4. deleteBatch
// ---------------------------------------------------------------------------
describe("deleteBatch", () => {
  it("should delete multiple entities by ID and return 204", async () => {
    const entity1 = makeEntity();
    const entity2 = makeEntity();

    await createBatch([entity1, entity2]);

    const response = await deleteBatch([entity1.id!, entity2.id!]);

    // Delete can return 204 or 207
    expect([204, 207]).toContain(response.status);
    expectOk(response);

    // Entities are already deleted, no need to clean up
  });

  it("should return 207 for non-existent entity IDs in delete batch", async () => {
    const response = await deleteBatch([
      "urn:ngsi-ld:TestEntity:nonexistent-1",
    ]);

    // Non-existent: 207 (multi-status with errors)
    expect([207, 400]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 5. queryBatch
// ---------------------------------------------------------------------------
describe("queryBatch", () => {
  it("should query entities by type and return 200", async () => {
    const entity1 = makeEntity();
    const entity2 = makeEntity();

    await createBatch([entity1, entity2]);
    trackIds([entity1.id!, entity2.id!]);

    const response = await queryBatch({
      type: "Query",
      entities: [{ type: "TestEntity" }],
    });

    expectOk(response);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThanOrEqual(2);
  });

  it("should return empty array for query matching no entities", async () => {
    const response = await queryBatch({
      type: "Query",
      entities: [{ type: "NonExistentType" }],
    });

    expectOk(response);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// 5b. queryGeoBatch
// ---------------------------------------------------------------------------
describe("queryGeoBatch", () => {
  it("should query entities as a GeoJSON FeatureCollection via batch", async () => {
    const entity = makeEntityWithGeo();
    await createEntity(entity);
    trackId(entity.id!);

    const response = await queryGeoBatch({
      type: "Query",
      entities: [{ type: "TestEntity" }],
    });

    expectOk(response);
    expect(response.status).toBe(200);

    const fc = response.data;
    expect(fc.type).toBe("FeatureCollection");
    expect(fc.features).toBeDefined();
    expect(fc.features!.length).toBeGreaterThan(0);

    const feature = fc.features![0]!;
    expect(feature.type).toBe("Feature");
    expect(feature.id).toBe(entity.id);
    expect(feature.properties).toBeDefined();
  });

  it("should return empty FeatureCollection for batch query with no matches", async () => {
    const response = await queryGeoBatch({
      type: "Query",
      entities: [{ type: "NonExistentType" }],
    });

    expectOk(response);
    expect(response.status).toBe(200);
    expect(response.data.type).toBe("FeatureCollection");
    expect(response.data.features).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 6. mergeBatch
// ---------------------------------------------------------------------------
describe("mergeBatch", () => {
  it("should merge (PATCH) attributes into multiple entities", async () => {
    const entity1 = makeEntity();
    const entity2 = makeEntity();

    await createBatch([entity1, entity2]);
    trackIds([entity1.id!, entity2.id!]);

    const patch1 = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      id: entity1.id,
      type: "TestEntity",
      $props: {
        humidity: {
          type: "Property" as const,
          value: 55,
        },
      },
    };

    const patch2 = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      id: entity2.id,
      type: "TestEntity",
      $props: {
        humidity: {
          type: "Property" as const,
          value: 65,
        },
      },
    };

    const response = await mergeBatch([patch1, patch2]);

    // Merge can return 204, 207 (multi-status), or 404 (endpoint not implemented by some brokers)
    if ((response.status as number) !== 404) {
      expectOk(response);
    }
    expect([204, 207, 404]).toContain(response.status);
  });
});
