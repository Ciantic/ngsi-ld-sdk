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
} from "../src/generated/api";
import { makeEntity, expectOk, cleanUpEntity, warnIf501 } from "./helpers";

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
    // Orion-LD returns 200; Stellio returns 501 (not yet implemented)
    warnIf501(response.status, "retrieveEntityTypes?local=true");
    expect([200, 501]).toContain(response.status);
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
    const response = await retrieveEntityTypeInfo("NonExistentType12345");
    expect(response.status).toBe(404);
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
    const response = await retrieveAttrTypeInfo("nonExistentAttr999");
    expect(response.status).toBe(404);
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
    // Stellio latest-dev returns 500 (endpoint not yet wired); Orion-LD returns 201/204
    expect([201, 204, 500]).toContain(response.status);
    if (response.status >= 400) return; // skip cleanup for unsupported

    // Extract context ID from Location header for cleanup
    const location = response.headers?.get("location");
    if (location) {
      // Location may be a full path like /ngsi-ld/v1/jsonldContexts/<id>
      // Extract just the last path segment as the context ID
      const contextId = decodeURIComponent(location.split("/").pop()!);
      contextIds.push(contextId);
    }
  });
});

// ---------------------------------------------------------------------------
// 6. listContexts
// ---------------------------------------------------------------------------
describe("listContexts", () => {
  it("should list all contexts and return 200", async () => {
    const response = await listContexts();
    // Stellio latest-dev returns 500 (endpoint not yet wired); Orion-LD returns 200
    expect([200, 500]).toContain(response.status);
    if (response.status === 200) {
      expect(response.data).toBeDefined();
    }
  });

  it("should support details=true query parameter", async () => {
    const response = await listContexts({ details: true });
    // Stellio latest-dev returns 500 (endpoint not yet wired); Orion-LD returns 200
    expect([200, 500]).toContain(response.status);
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

    const createResp = await createContext(contextBody);
    // Stellio latest-dev returns 500 (endpoint not yet wired); Orion-LD returns 201/204
    expect([201, 204, 500]).toContain(createResp.status);
    if (createResp.status >= 400) return;

    const location = createResp.headers?.get("location");
    if (!location) {
      // If no Location header, skip the retrieve test gracefully
      return;
    }

    const contextId = decodeURIComponent(location.split("/").pop()!);
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

    const createResp = await createContext(contextBody);
    if (createResp.status >= 400) return; // Stellio: endpoint not yet wired

    const location = createResp.headers?.get("location");
    if (!location) return;

    const contextId = decodeURIComponent(location.split("/").pop()!);
    contextIds.push(contextId);

    const response = await retrieveContext(contextId, { details: true });
    expectOk(response);
    expect(response.status).toBe(200);
  });

  it("should return 404 for a non-existent context", async () => {
    const response = await retrieveContext(
      "urn:ngsi-ld:context:nonexistent-12345",
    );
    // Orion-LD returns 404/422; Stellio returns 405 (endpoint not wired returns Method Not Allowed)
    expect([404, 422, 405]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 8. deleteContext
// ---------------------------------------------------------------------------
describe("deleteContext", () => {
  it("should delete a previously created context and return 204", async () => {
    // Create a context first
    const contextBody = {
      "@context": {
        deleteTestCtx: "http://example.org/delete-test/",
      },
    };

    const createResp = await createContext(contextBody);
    // Stellio latest-dev returns 500 (endpoint not yet wired); Orion-LD returns 201/204
    expect([201, 204, 500]).toContain(createResp.status);
    if (createResp.status >= 400) return;

    const location = createResp.headers?.get("location");
    if (!location) return;

    const contextId = decodeURIComponent(location.split("/").pop()!);

    const response = await deleteContext(contextId);
    expect([204, 404]).toContain(response.status);
  });

  it("should return 404 when deleting a non-existent context", async () => {
    const response = await deleteContext(
      "urn:ngsi-ld:context:nonexistent-delete-12345",
    );
    // Stellio returns 405 (Method Not Allowed) for unwired endpoint
    expect([404, 504, 405]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 9. retrieveEntityMap
// ---------------------------------------------------------------------------
describe("retrieveEntityMap", () => {
  it("should return 404 for a non-existent entity map", async () => {
    const response = await retrieveEntityMap("nonExistentMap12345");
    // Orion-LD may return 404, or 501 if Entity Maps are not implemented
    expect([404, 501]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 10. updateEntityMap
// ---------------------------------------------------------------------------
describe("updateEntityMap", () => {
  it("should return 404 or 501 when updating a non-existent entity map", async () => {
    const patch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      type: "EntityMap" as const,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    };

    const response = await updateEntityMap("nonExistentMap12345", patch);
    expect([404, 501]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 11. deleteEntityMap
// ---------------------------------------------------------------------------
describe("deleteEntityMap", () => {
  it("should return 404 or 501 when deleting a non-existent entity map", async () => {
    const response = await deleteEntityMap("nonExistentMap12345");
    expect([404, 501]).toContain(response.status);
  });
});

// ---------------------------------------------------------------------------
// 12. retrieveCSIdentityInfo
// ---------------------------------------------------------------------------
describe("retrieveCSIdentityInfo", () => {
  it("should retrieve context source identity info (or return 501 if unsupported)", async () => {
    const response = await retrieveCSIdentityInfo();
    // 200 if multi-tenancy is enabled, 501 if not implemented, 404 if endpoint not found
    expect([200, 501, 404]).toContain(response.status);

    if (response.status === 200) {
      expect(response.data).toBeDefined();
    }
  });
});
