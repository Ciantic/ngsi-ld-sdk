import { describe, it, expect, beforeEach } from "vitest";
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
  NgsiLdNotImplemented,
  NgsiLdInternalServerError,
} from "../src";
import {
  makeEntity,
  expectHttpError,
  cleanUpAll,
  detectBroker,
} from "./helpers";
import { NgsiLdNotFound, NgsiLdHttpError } from "../src";

// Wipe all stale resources from previous crashed runs before each test.
beforeEach(cleanUpAll);

// ---------------------------------------------------------------------------
// 1. retrieveEntityTypes
// ---------------------------------------------------------------------------
describe("retrieveEntityTypes", () => {
  it("should retrieve entity types list and return 200", async () => {
    // Create an entity so there's at least one type to query
    const entity = { ...makeEntity(), type: "DiscoveryTestEntity" };
    await createEntity(entity);

    const response = await retrieveEntityTypes();
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should support details=true query parameter", async () => {
    const entity = { ...makeEntity(), type: "DiscoveryDetailsEntity" };
    await createEntity(entity);

    const response = await retrieveEntityTypes({ details: true });
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should support local=true query parameter", async () => {
    const entity = { ...makeEntity(), type: "DiscoveryLocalEntity" };
    await createEntity(entity);

    if (detectBroker() === "stellio") {
      // Stellio does not support local=true for entity types discovery
      await expect(() => retrieveEntityTypes({ local: true })).rejects.toThrow(
        NgsiLdNotImplemented,
      );
      return;
    }

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

    const response = await retrieveEntityTypeInfo("EntityTypeInfoTest");
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

    const response = await retrieveAttrTypes();
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should support details=true query parameter", async () => {
    const entity = makeEntity();
    await createEntity(entity);

    const response = await retrieveAttrTypes({ details: true });
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

    // "temperature" attr exists on the entity created via makeEntity()
    const response = await retrieveAttrTypeInfo("temperature");
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
  it("should create a JSON-LD context and return 201", async () => {
    const contextBody = {
      "@context": {
        discoveryPrefix: "http://example.org/discovery/",
        discoveryProp: {
          "@id": "http://example.org/discovery/discoveryProp",
        },
      },
    };

    if (detectBroker() === "stellio") {
      // Stellio does not support jsonldContexts endpoints; returns 500 with
      // "No static resource ngsi-ld/v1/jsonldContexts for request
      // 'http://search-service:8083/ngsi-ld/v1/jsonldContexts'."
      await expect(() => createContext(contextBody)).rejects.toThrow(
        NgsiLdInternalServerError,
      );
      return;
    }

    const response = await createContext(contextBody);
    expect(response.status).toBe(201);
    expect(response.location).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// 6. listContexts
// ---------------------------------------------------------------------------
describe("listContexts", () => {
  it("should list all contexts and return 200", async () => {
    if (detectBroker() === "stellio") {
      // Stellio does not support jsonldContexts endpoints
      await expect(() => listContexts()).rejects.toThrow(
        NgsiLdInternalServerError,
      );
      return;
    }

    const response = await listContexts();
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should support details=true query parameter", async () => {
    if (detectBroker() === "stellio") {
      // Stellio does not support jsonldContexts endpoints
      await expect(() => listContexts({ details: true })).rejects.toThrow(
        NgsiLdInternalServerError,
      );
      return;
    }

    const response = await listContexts({ details: true });
    expect(response.status).toBe(200);
  });
});

// ---------------------------------------------------------------------------
// 7. retrieveContext
// ---------------------------------------------------------------------------
describe("retrieveContext", () => {
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

    if (detectBroker() === "stellio") {
      // Stellio does not support jsonldContexts endpoints, so createContext
      // will fail, and we cannot retrieve a context that was never created.
      await expect(() => createContext(contextBody)).rejects.toThrow(
        NgsiLdInternalServerError,
      );
      return;
    }

    const createResponse = await createContext(contextBody);
    expect(createResponse.status).toBe(201);

    const contextId = decodeURIComponent(
      createResponse.location.split("/").pop()!,
    );

    const response = await retrieveContext(contextId);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should retrieve context with details=true parameter", async () => {
    const contextBody = {
      "@context": {
        detailsTest: "http://example.org/details/",
      },
    };

    if (detectBroker() === "stellio") {
      // Stellio does not support jsonldContexts endpoints
      await expect(() => createContext(contextBody)).rejects.toThrow(
        NgsiLdInternalServerError,
      );
      return;
    }

    const createResponse = await createContext(contextBody);
    expect(createResponse.status).toBe(201);

    const contextId = decodeURIComponent(
      createResponse.location.split("/").pop()!,
    );

    const response = await retrieveContext(contextId, { details: true });
    expect(response.status).toBe(200);
  });

  it("should return 404 for a non-existent context", async () => {
    try {
      await retrieveContext("urn:ngsi-ld:context:nonexistent-12345");
    } catch (err) {
      if (detectBroker() === "stellio") {
        // Stellio returns 405 (only DELETE is supported) since the jsonldContexts
        // endpoint is not implemented.
        expect(err).toBeInstanceOf(NgsiLdHttpError);
        return;
      }
      expect(err).toBeInstanceOf(NgsiLdNotFound);
    }
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
    if (detectBroker() === "stellio") {
      // Stellio does not support jsonldContexts endpoints, so createContext
      // will fail, and we cannot delete a context that was never created.
      await expect(() => createContext(contextBody)).rejects.toThrow(
        NgsiLdInternalServerError,
      );
      return;
    }

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
    if (detectBroker() === "stellio") {
      // Stellio returns 404 for the /info/sourceIdentity endpoint
      await expect(() => retrieveCSIdentityInfo()).rejects.toThrow(
        NgsiLdNotFound,
      );
      return;
    }

    const response = await retrieveCSIdentityInfo();
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });
});
