import { describe, it, expect, afterEach } from "vitest";
import {
  createEntity,
  queryEntity,
  retrieveEntity,
  deleteEntity,
  mergeEntity,
  replaceEntity,
  appendAttrs,
  updateEntity,
  updateAttrs,
  deleteAttrs,
  replaceAttrs,
} from "../src";
import type { Property } from "../src/generated/schemas";
import { makeEntity, expectOk, expectStatus, cleanUpEntity } from "./helpers";

// Track created entities for cleanup
const createdIds: string[] = [];

afterEach(async () => {
  // Clean up all entities created during the test
  while (createdIds.length > 0) {
    const id = createdIds.pop()!;
    await cleanUpEntity(id);
  }
});

function trackId(entity: { id?: string }): string {
  const id = entity.id!;
  createdIds.push(id);
  return id;
}

// ---------------------------------------------------------------------------
// 1. createEntity
// ---------------------------------------------------------------------------
describe("createEntity", () => {
  it("should create an entity and return 201", async () => {
    const entity = makeEntity();
    const response = await createEntity(entity);

    expectOk(response);
    expect(response.status).toBe(201);
    trackId(entity);
  });

  it("should return 409 when creating a duplicate entity", async () => {
    const entity = makeEntity();
    await createEntity(entity);
    trackId(entity);

    const response = await createEntity(entity);
    expect(response.status).toBe(409);
  });
});

// ---------------------------------------------------------------------------
// 2. queryEntity
// ---------------------------------------------------------------------------
describe("queryEntity", () => {
  it("should query entities by type and return 200", async () => {
    // Create an entity first so there's something to query
    const entity = makeEntity();
    await createEntity(entity);
    trackId(entity);

    const response = await queryEntity({ type: "TestEntity" });
    expectOk(response);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    if (Array.isArray(response.data)) {
      expect(response.data.length).toBeGreaterThan(0);
    } else {
      throw new Error("Expected response data to be an array");
    }
  });
});

// ---------------------------------------------------------------------------
// 3. retrieveEntity
// ---------------------------------------------------------------------------
describe("retrieveEntity", () => {
  it("should retrieve an entity by id and return 200", async () => {
    const entity = makeEntity();
    await createEntity(entity);
    trackId(entity);

    const response = await retrieveEntity(entity.id!);
    expectOk(response);
    expect(response.status).toBe(200);
    // data may be an array or object depending on Accept header
    if (!Array.isArray(response.data)) {
      expect(response.data).toBeDefined();
    }
  });

  it("should return 404 for a non-existent entity", async () => {
    const response = await retrieveEntity("urn:ngsi-ld:TestEntity:nonexistent");
    expect(response.status).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// 4. deleteEntity
// ---------------------------------------------------------------------------
describe("deleteEntity", () => {
  it("should delete an entity and return 204", async () => {
    const entity = makeEntity();
    await createEntity(entity);

    const response = await deleteEntity(entity.id!);
    expect(response.status).toBe(204);
  });

  it("should return 404 when deleting a non-existent entity", async () => {
    const response = await deleteEntity("urn:ngsi-ld:TestEntity:nonexistent");
    expect(response.status).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// 5. mergeEntity
// ---------------------------------------------------------------------------
describe("mergeEntity", () => {
  it("should merge (PATCH) attributes into an existing entity", async () => {
    const entity = makeEntity();
    await createEntity(entity);
    trackId(entity);

    const patch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      $props: {
        humidity: {
          type: "Property" as const,
          value: 55,
        },
      },
    };

    const response = await mergeEntity(entity.id!, patch);
    expect(response.status).toBe(204);

    // Verify the merge worked: retrieve and check the new attribute exists
    const retrieved = await retrieveEntity(entity.id!);
    if (!Array.isArray(retrieved.data)) {
      const data = retrieved.data as Record<string, unknown>;
      const props = data["$props"] as Record<string, unknown> | undefined;
      expect(props?.["humidity"]).toBeDefined();
    }
  });
});

// ---------------------------------------------------------------------------
// 6. replaceEntity
// ---------------------------------------------------------------------------
describe("replaceEntity", () => {
  it("should replace an entity (PUT) and return 204", async () => {
    const entity = makeEntity();
    await createEntity(entity);
    trackId(entity);

    const replacement = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      id: entity.id,
      type: "TestEntity",
      $props: {
        replacedAttr: {
          type: "Property" as const,
          value: 100,
        },
      },
    };

    const response = await replaceEntity(entity.id!, replacement);
    expect(response.status).toBe(204);
  });
});

// ---------------------------------------------------------------------------
// 7. appendAttrs
// ---------------------------------------------------------------------------
describe("appendAttrs", () => {
  it("should append attributes to an existing entity", async () => {
    const entity = makeEntity();
    await createEntity(entity);
    trackId(entity);

    const newAttrs = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      $props: {
        newProperty: {
          type: "Property" as const,
          value: 42,
        },
      },
    };

    const response = await appendAttrs(entity.id!, newAttrs);
    expect(response.status).toBe(204);
  });
});

// ---------------------------------------------------------------------------
// 8. updateEntity
// ---------------------------------------------------------------------------
describe("updateEntity", () => {
  it("should partially update an entity (PATCH) and return 204", async () => {
    const entity = makeEntity();
    await createEntity(entity);
    trackId(entity);

    const patch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      $props: {
        temperature: {
          type: "Property" as const,
          value: 99,
        },
      },
    };

    const response = await updateEntity(entity.id!, patch);
    expect(response.status).toBe(204);
  });
});

// ---------------------------------------------------------------------------
// 9. updateAttrs
// ---------------------------------------------------------------------------
describe("updateAttrs", () => {
  it("should partially update a single attribute", async () => {
    const entity = makeEntity();
    await createEntity(entity);
    trackId(entity);

    const attrPatch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      type: "Property" as const,
      value: 100,
    };

    const response = await updateAttrs(entity.id!, "temperature", attrPatch);
    expect(response.status).toBe(204);
  });

  it("should return 404 when updating attribute on non-existent entity", async () => {
    const attrPatch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      type: "Property" as const,
      value: 100,
    };

    const response = await updateAttrs(
      "urn:ngsi-ld:TestEntity:nonexistent",
      "temperature",
      attrPatch,
    );
    expect(response.status).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// 10. deleteAttrs
// ---------------------------------------------------------------------------
describe("deleteAttrs", () => {
  it("should delete a single attribute from an entity", async () => {
    const entity = {
      ...makeEntity(),
      $props: {
        ...makeEntity().$props,
        extraAttr: { type: "Property" as const, value: 1 },
      },
    };
    await createEntity(entity);
    trackId(entity);

    const response = await deleteAttrs(entity.id!, "extraAttr");
    expect(response.status).toBe(204);
  });

  it("should return 404 when deleting attribute on non-existent entity", async () => {
    const response = await deleteAttrs(
      "urn:ngsi-ld:TestEntity:nonexistent",
      "temperature",
    );
    expect(response.status).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// 11. replaceAttrs
// ---------------------------------------------------------------------------
describe("replaceAttrs", () => {
  it("should replace a single attribute (PUT) and return 204", async () => {
    const entity = makeEntity();
    await createEntity(entity);
    trackId(entity);

    const replacement = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      type: "Property" as const,
      value: 200,
    };

    const response = await replaceAttrs(entity.id!, "temperature", replacement);
    expect(response.status).toBe(204);
  });
});
