import { describe, it, expect, afterEach } from "vitest";
import {
  retrieveEntityTypes,
  retrieveEntityTypeInfo,
  retrieveAttrTypes,
  retrieveAttrTypeInfo,
  createContext,
  listContexts,
  retrieveContext,
  deleteContext,
  retrieveEntityMap,
  updateEntityMap,
  deleteEntityMap,
  retrieveCSIdentityInfo,
  createEntity,
} from "../src";
import {
  makeEntity,
  expectOk,
  expectHttpError,
  cleanUpEntity,
} from "./helpers";
import { NgsiLdNotFound } from "../src";

// --- Track entities created during discovery tests ---
const createdEntityIds: string[] = [];

afterEach(async () => {
  while (createdEntityIds.length > 0) {
    const id = createdEntityIds.pop()!;
    await cleanUpEntity(id);
  }
});

function trackEntity(entity: { id?: string }): string {
  const id = entity.id!;
  createdEntityIds.push(id);
  return id;
}

// ---------------------------------------------------------------------------
// 1. retrieveEntityTypes
// ---------------------------------------------------------------------------
describe("retrieveEntityTypes", () => {
  it("should retrieve entity types list and return 200", async () => {
    // Create an entity so there's at least one type to query
    const entity = { ...makeEntity(), type: "DiscoveryTestEntity" };
    await createEntity(entity);
    trackEntity(entity);

    const response = await retrieveEntityTypes();
    expectOk(response);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should support details=true query parameter", async () => {
    const entity = { ...makeEntity(), type: "DiscoveryDetailsEntity" };
    await createEntity(entity);
    trackEntity(entity);

    const response = await retrieveEntityTypes({ details: true });
    expectOk(response);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should support local=true query parameter", async () => {
    const entity = { ...makeEntity(), type: "DiscoveryLocalEntity" };
    await createEntity(entity);
    trackEntity(entity);

    const response = await retrieveEntityTypes({ local: true });
    expect(response.status).toBe(200);
  });
});

// ---------------------------------------------------------------------------
// 2. retrieveEntityTypeInfo
// ---------------------------------------------------------------------------
describe("retrieveEntityTypeInfo", () => {
  it("should retrieve type info for an existing entity type", async () => {
    const entity = { ...makeEntity(), type: "EntityTypeInfoTest" };
    await createEntity(entity);
    trackEntity(entity);

    const response = await retrieveEntityTypeInfo("EntityTypeInfoTest");
    expectOk(response);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should return 404 for a non-existent entity type", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      retrieveEntityTypeInfo("NonExistentType12345"),
    );
  });
});

// ---------------------------------------------------------------------------
// 3. retrieveAttrTypes
// ---------------------------------------------------------------------------
describe("retrieveAttrTypes", () => {
  it("should retrieve attribute types list and return 200", async () => {
    const entity = makeEntity();
    await createEntity(entity);
    trackEntity(entity);

    const response = await retrieveAttrTypes();
    expectOk(response);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should support details=true query parameter", async () => {
    const entity = makeEntity();
    await createEntity(entity);
    trackEntity(entity);

    const response = await retrieveAttrTypes({ details: true });
    expectOk(response);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// 4. retrieveAttrTypeInfo
// ---------------------------------------------------------------------------
describe("retrieveAttrTypeInfo", () => {
  it("should retrieve attribute type info for an existing attribute", async () => {
    const entity = makeEntity();
    await createEntity(entity);
    trackEntity(entity);

    // "temperature" attr exists on the entity created via makeEntity()
    const response = await retrieveAttrTypeInfo("temperature");
    expectOk(response);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should return 404 for a non-existent attribute", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      retrieveAttrTypeInfo("nonExistentAttr999"),
    );
  });
});

// ---------------------------------------------------------------------------
// 5. createContext
// ---------------------------------------------------------------------------
describe("createContext", () => {
  const contextIds: string[] = [];

  afterEach(async () => {
    while (contextIds.length > 0) {
      const id = contextIds.pop()!;
      try {
        await deleteContext(id);
      } catch {
        // Ignore cleanup failures
      }
    }
  });

  it("should create a JSON-LD context and return 201", async () => {
    const contextBody = {
      "@context": {
        discoveryPrefix: "http://example.org/discovery/",
        discoveryProp: {
          "@id": "http://example.org/discovery/discoveryProp",
        },
      },
    };

    const response = await createContext(contextBody);
    expect(response.status).toBe(201);
    expect(response.location).toBeDefined();

    // Extract context ID from Location header for cleanup
    const contextId = decodeURIComponent(response.location.split("/").pop()!);
    contextIds.push(contextId);
  });
});

// ---------------------------------------------------------------------------
// 6. listContexts
// ---------------------------------------------------------------------------
describe("listContexts", () => {
  it("should list all contexts and return 200", async () => {
    const response = await listContexts();
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should support details=true query parameter", async () => {
    const response = await listContexts({ details: true });
    expect(response.status).toBe(200);
  });
});

// ---------------------------------------------------------------------------
// 7. retrieveContext
// ---------------------------------------------------------------------------
describe("retrieveContext", () => {
  const contextIds: string[] = [];

  afterEach(async () => {
    while (contextIds.length > 0) {
      const id = contextIds.pop()!;
      try {
        await deleteContext(id);
      } catch {
        // Ignore
      }
    }
  });

  it("should retrieve a previously created context", async () => {
    // First, create a context to have a valid ID
    const contextBody = {
      "@context": {
        retrieveTest: "http://example.org/retrieve/",
        retrieveProp: {
          "@id": "http://example.org/retrieve/retrieveProp",
        },
      },
    };

    const createResponse = await createContext(contextBody);
    expect(createResponse.status).toBe(201);

    const contextId = decodeURIComponent(
      createResponse.location.split("/").pop()!,
    );
    contextIds.push(contextId);

    const response = await retrieveContext(contextId);
    expectOk(response);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should retrieve context with details=true parameter", async () => {
    const contextBody = {
      "@context": {
        detailsTest: "http://example.org/details/",
      },
    };

    const createResponse = await createContext(contextBody);
    expect(createResponse.status).toBe(201);

    const contextId = decodeURIComponent(
      createResponse.location.split("/").pop()!,
    );
    contextIds.push(contextId);

    const response = await retrieveContext(contextId, { details: true });
    expectOk(response);
    expect(response.status).toBe(200);
  });

  it("should return 404 for a non-existent context", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      retrieveContext("urn:ngsi-ld:context:nonexistent-12345"),
    );
  });
});

// ---------------------------------------------------------------------------
// 8. deleteContext
// ---------------------------------------------------------------------------
describe("deleteContext", () => {
  it("should delete a previously created context and return 204", async () => {
    const contextBody = {
      "@context": {
        deleteTestCtx: "http://example.org/delete-test/",
      },
    };

    const createResponse = await createContext(contextBody);
    expect(createResponse.status).toBe(201);

    const contextId = decodeURIComponent(
      createResponse.location.split("/").pop()!,
    );

    const response = await deleteContext(contextId);
    expect(response.status).toBe(204);
  });

  it("should return 404 when deleting a non-existent context", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      deleteContext("urn:ngsi-ld:context:nonexistent-delete-12345"),
    );
  });
});

// ---------------------------------------------------------------------------
// 9. retrieveEntityMap
// ---------------------------------------------------------------------------
describe("retrieveEntityMap", () => {
  it("should return 404 for a non-existent entity map", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      retrieveEntityMap("nonExistentMap12345"),
    );
  });
});

// ---------------------------------------------------------------------------
// 10. updateEntityMap
// ---------------------------------------------------------------------------
describe("updateEntityMap", () => {
  it("should return 404 when updating a non-existent entity map", async () => {
    const patch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      type: "EntityMap" as const,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    };

    await expectHttpError(404, NgsiLdNotFound, () =>
      updateEntityMap("nonExistentMap12345", patch),
    );
  });
});

// ---------------------------------------------------------------------------
// 11. deleteEntityMap
// ---------------------------------------------------------------------------
describe("deleteEntityMap", () => {
  it("should return 404 when deleting a non-existent entity map", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      deleteEntityMap("nonExistentMap12345"),
    );
  });
});

// ---------------------------------------------------------------------------
// 12. retrieveCSIdentityInfo
// ---------------------------------------------------------------------------
describe("retrieveCSIdentityInfo", () => {
  it("should retrieve context source identity info", async () => {
    const response = await retrieveCSIdentityInfo();
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });
});
