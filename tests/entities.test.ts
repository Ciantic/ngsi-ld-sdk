import { describe, it, expect, beforeEach } from "vitest";
import {
  createEntity,
  createCSR,
  queryEntity,
  queryGeoEntity,
  retrieveEntity,
  retrieveGeoEntity,
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
import {
  makeEntity,
  makeEntityWithGeo,
  expectHttpError,
  cleanUpAll,
  detectBroker,
} from "./helpers";
import { NgsiLdNotFound, NgsiLdConflict } from "../src";

// Wipe all stale resources from previous crashed runs before each test.
beforeEach(cleanUpAll);

// ---------------------------------------------------------------------------
// 1. createEntity
// ---------------------------------------------------------------------------
describe("createEntity", () => {
  it("should create an entity and return 201", async () => {
    const entity = makeEntity();
    const response = await createEntity(entity);

    expect(response.status).toBe(201);
  });

  it("should return 409 when creating a duplicate entity", async () => {
    const entity = makeEntity();
    await createEntity(entity);

    await expectHttpError(409, NgsiLdConflict, () => createEntity(entity));
  });

  it("should return 207 when a matching CSR fails but local creation succeeds", async () => {
    // Register a CSR that claims only the "temperature" attribute, supports
    // createEntity, and points to an unreachable endpoint.
    const csr = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      id: `urn:ngsi-ld:CSR:test-${Date.now()}`,
      type: "ContextSourceRegistration" as const,
      endpoint: "http://localhost:9999/ngsi-ld",
      operations: ["createEntity", "federationOps"],
      information: [
        {
          entities: [{ type: "TestEntity" }],
          propertyNames: ["temperature"],
        },
      ],
    };

    const csrResponse = await createCSR(csr);
    expect(csrResponse.status).toBe(201);

    // Create an entity where "temperature" is forwarded to the failing CSR
    // and "humidity" is created locally.
    const entity = {
      ...makeEntity(),
      $props: {
        temperature: { type: "Property" as const, value: 25 },
        humidity: { type: "Property" as const, value: 60 },
      },
    };

    const response = await createEntity(entity);

    // NOTE: This test fails with Orion-LD, it doesn't support 207, it always gives 201
    if (detectBroker() === "orion") {
      expect(response.status).toBe(201);
      return;
    }

    expect(response.status).toBe(207);
    if (response.status === 207) {
      expect(response.data.errors.length).toBeGreaterThan(0);
      expect(response.data.success.length).toBeGreaterThan(0);
    }
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

    const response = await queryEntity({ type: "TestEntity" });
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// 2b. queryGeoEntity
// ---------------------------------------------------------------------------
describe("queryGeoEntity", () => {
  it("should query entities as a GeoJSON FeatureCollection", async () => {
    const entity = makeEntityWithGeo();
    await createEntity(entity);

    const response = await queryGeoEntity({ type: "TestEntity" });
    expect(response.status).toBe(200);

    // Should be a GeoJSON FeatureCollection containing our entity
    const fc = response.data;
    expect(fc.type).toBe("FeatureCollection");
    expect(fc.features).toBeDefined();
    expect(fc.features!.length).toBe(1);

    const feature = fc.features![0];
    expect(feature.id).toBe(entity.id);
    expect(feature).toBeDefined();
    expect(feature!.type).toBe("Feature");
    expect(feature!.properties).toBeDefined();
  });

  it("should return empty FeatureCollection for no matches", async () => {
    const response = await queryGeoEntity({ type: "NonExistentType" });
    expect(response.status).toBe(200);
    expect(response.data.type).toBe("FeatureCollection");
    expect(response.data.features).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 3. retrieveEntity
// ---------------------------------------------------------------------------
describe("retrieveEntity", () => {
  it("should retrieve an entity by id and return 200", async () => {
    const entity = makeEntity();
    await createEntity(entity);

    const response = await retrieveEntity(entity.id!);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should return 404 for a non-existent entity", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      retrieveEntity("urn:ngsi-ld:TestEntity:nonexistent"),
    );
  });
});

// ---------------------------------------------------------------------------
// 3b. retrieveGeoEntity
// ---------------------------------------------------------------------------
describe("retrieveGeoEntity", () => {
  it("should retrieve an entity as a GeoJSON Feature", async () => {
    const entity = makeEntityWithGeo();
    await createEntity(entity);

    const response = await retrieveGeoEntity(entity.id!);
    expect(response.status).toBe(200);

    // Should be a GeoJSON Feature
    const feature = response.data;
    expect(feature.type).toBe("Feature");
    expect(feature.id).toBe(entity.id);
    expect(feature.geometry).toBeDefined();
    // Properties should contain the entity's attributes
    expect(feature.properties).toBeDefined();
  });

  it("should return 404 for a non-existent entity", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      retrieveGeoEntity("urn:ngsi-ld:TestEntity:nonexistent"),
    );
  });

  it("should return 200 but null geometry for entity without GeoProperty", async () => {
    const entity = makeEntity();
    await createEntity(entity);

    const response = await retrieveGeoEntity(entity.id!);
    expect(response.status).toBe(200);

    // Feature with null geometry when no GeoProperty exists
    expect(response.data.type).toBe("Feature");
    expect(response.data.geometry).toBeNull();
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
    await expectHttpError(404, NgsiLdNotFound, () =>
      deleteEntity("urn:ngsi-ld:TestEntity:nonexistent"),
    );
  });
});

// ---------------------------------------------------------------------------
// 5. mergeEntity
// ---------------------------------------------------------------------------
describe("mergeEntity", () => {
  it("should merge (PATCH) attributes into an existing entity", async () => {
    const entity = makeEntity();
    await createEntity(entity);

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
    if (retrieved.status !== 200) {
      throw new Error(
        `Failed to retrieve entity after merge: ${retrieved.status}`,
      );
    }
    const data = retrieved.data;
    const props = data["$props"];
    expect(props?.["humidity"]).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// 6. replaceEntity
// ---------------------------------------------------------------------------
describe("replaceEntity", () => {
  it("should replace an entity (PUT) and return 204", async () => {
    const entity = makeEntity();
    await createEntity(entity);

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

    await expectHttpError(404, NgsiLdNotFound, () =>
      updateAttrs(
        "urn:ngsi-ld:TestEntity:nonexistent",
        "temperature",
        attrPatch,
      ),
    );
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

    const response = await deleteAttrs(entity.id!, "extraAttr");
    expect(response.status).toBe(204);
  });

  it("should return 404 when deleting attribute on non-existent entity", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      deleteAttrs("urn:ngsi-ld:TestEntity:nonexistent", "temperature"),
    );
  });
});

// ---------------------------------------------------------------------------
// 11. replaceAttrs
// ---------------------------------------------------------------------------
describe("replaceAttrs", () => {
  it("should replace a single attribute (PUT) and return 204", async () => {
    const entity = makeEntity();
    await createEntity(entity);

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
