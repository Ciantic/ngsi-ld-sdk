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
  NgsiLdMethodNotAllowed,
  NgsiLdBadRequest,
} from "../src";
import { makeEntity, cleanUpAll, gateBroker } from "./helpers";
import { NgsiLdNotFound } from "../src";

// Wipe all stale resources from previous crashed runs before each test.
beforeEach(cleanUpAll);

// ---------------------------------------------------------------------------
// 1. retrieveEntityTypes
// ---------------------------------------------------------------------------
describe("retrieveEntityTypes", () => {
  it("should retrieve entity types list", async () => {
    const entity = { ...makeEntity(), type: "DiscoveryTestEntity" };
    await createEntity({ entity });

    const data = await retrieveEntityTypes();
    expect(data).toBeDefined();
  });

  it("should support details=true query parameter", async () => {
    const entity = { ...makeEntity(), type: "DiscoveryDetailsEntity" };
    await createEntity({ entity });

    const data = await retrieveEntityTypes({ params: { details: true } });
    expect(data).toBeDefined();
  });

  it("should support local=true query parameter", async () => {
    const entity = { ...makeEntity(), type: "DiscoveryLocalEntity" };
    await createEntity({ entity });

    if (
      gateBroker("stellio", "retrieveEntityTypes has no ?local=true support")
    ) {
      await expect(() =>
        retrieveEntityTypes({ params: { local: true } }),
      ).rejects.toThrow(NgsiLdNotImplemented);
      return;
    }

    const data = await retrieveEntityTypes({ params: { local: true } });
    expect(data).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// 2. retrieveEntityTypeInfo
// ---------------------------------------------------------------------------
describe("retrieveEntityTypeInfo", () => {
  it("should retrieve type info for an existing entity type", async () => {
    const entity = { ...makeEntity(), type: "EntityTypeInfoTest" };
    await createEntity({ entity });

    const data = await retrieveEntityTypeInfo({ type: "EntityTypeInfoTest" });
    expect(data).toBeDefined();
  });

  it("should return 404 for a non-existent entity type", async () => {
    await expect(
      retrieveEntityTypeInfo({ type: "NonExistentType12345" }),
    ).rejects.toThrow(NgsiLdNotFound);
  });
});

// ---------------------------------------------------------------------------
// 3. retrieveAttrTypes
// ---------------------------------------------------------------------------
describe("retrieveAttrTypes", () => {
  it("should retrieve attribute types list", async () => {
    const entity = makeEntity();
    await createEntity({ entity });

    const data = await retrieveAttrTypes();
    expect(data).toBeDefined();
  });

  it("should support details=true query parameter", async () => {
    const entity = makeEntity();
    await createEntity({ entity });

    const data = await retrieveAttrTypes({ params: { details: true } });
    expect(data).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// 4. retrieveAttrTypeInfo
// ---------------------------------------------------------------------------
describe("retrieveAttrTypeInfo", () => {
  it("should retrieve attribute type info for an existing attribute", async () => {
    const entity = makeEntity();
    await createEntity({ entity });

    const data = await retrieveAttrTypeInfo({ attrId: "temperature" });
    expect(data).toBeDefined();
  });

  it("should return 404 for a non-existent attribute", async () => {
    await expect(
      retrieveAttrTypeInfo({ attrId: "nonExistentAttr999" }),
    ).rejects.toThrow(NgsiLdNotFound);
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

    if (gateBroker("stellio", "jsonldContexts not implemented")) {
      // Stellio does not support jsonldContexts endpoints; returns 500 with
      // "No static resource ngsi-ld/v1/jsonldContexts for request
      // 'http://search-service:8083/ngsi-ld/v1/jsonldContexts'."
      await expect(() =>
        createContext({ context: contextBody }),
      ).rejects.toThrow(NgsiLdInternalServerError);
      return;
    }

    const result = await createContext({ context: contextBody });
    expect(typeof result.location).toBe("string");
    expect(result.location).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// 6. listContexts
// ---------------------------------------------------------------------------
describe("listContexts", () => {
  it("should list all contexts and return 200", async () => {
    if (gateBroker("stellio", "jsonldContexts not implemented")) {
      // Stellio does not support jsonldContexts endpoints
      await expect(() => listContexts()).rejects.toThrow(
        NgsiLdInternalServerError,
      );
      return;
    }

    const data = await listContexts();
    expect(data).toBeDefined();
  });

  it("should support details=true query parameter", async () => {
    if (gateBroker("stellio", "jsonldContexts not implemented")) {
      // Stellio does not support jsonldContexts endpoints
      await expect(() =>
        listContexts({ params: { details: true } }),
      ).rejects.toThrow(NgsiLdInternalServerError);
      return;
    }

    const data = await listContexts({ params: { details: true } });
    expect(data).toBeDefined();
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

    if (gateBroker("stellio", "jsonldContexts not implemented")) {
      // Stellio does not support jsonldContexts endpoints, so createContext
      // will fail, and we cannot retrieve a context that was never created.
      await expect(() =>
        createContext({ context: contextBody }),
      ).rejects.toThrow(NgsiLdInternalServerError);
      return;
    }

    const { location: createLocation } = await createContext({
      context: contextBody,
    });

    const contextId = decodeURIComponent(createLocation.split("/").pop()!);

    const data = await retrieveContext({ contextId });
    expect(data).toBeDefined();
  });

  it("should retrieve context with details=true parameter", async () => {
    const contextBody = {
      "@context": {
        detailsTest: "http://example.org/details/",
      },
    };

    if (gateBroker("stellio", "jsonldContexts not implemented")) {
      // Stellio does not support jsonldContexts endpoints
      await expect(() =>
        createContext({ context: contextBody }),
      ).rejects.toThrow(NgsiLdInternalServerError);
      return;
    }

    const { location: createLocation } = await createContext({
      context: contextBody,
    });

    const contextId = decodeURIComponent(createLocation.split("/").pop()!);

    const data = await retrieveContext({
      contextId,
      params: { details: true },
    });
    expect(data).toBeDefined();
  });

  it("should return 404 for a non-existent context", async () => {
    try {
      await retrieveContext({
        contextId: "urn:ngsi-ld:context:nonexistent-12345",
      });
    } catch (err) {
      if (gateBroker("stellio", "jsonldContexts not implemented")) {
        expect(err).toBeInstanceOf(NgsiLdMethodNotAllowed);
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
    if (gateBroker("stellio", "jsonldContexts not implemented")) {
      // Stellio does not support jsonldContexts endpoints, so createContext
      // will fail, and we cannot delete a context that was never created.
      await expect(() =>
        createContext({ context: contextBody }),
      ).rejects.toThrow(NgsiLdInternalServerError);
      return;
    }

    const { location: createLocation } = await createContext({
      context: contextBody,
    });

    const contextId = decodeURIComponent(createLocation.split("/").pop()!);

    const result = await deleteContext({ contextId });
    expect(result).toBeUndefined();
  });

  it("should return 404 when deleting a non-existent context", async () => {
    await expect(
      deleteContext({
        contextId: "urn:ngsi-ld:context:nonexistent-delete-12345",
      }),
    ).rejects.toThrow(NgsiLdNotFound);
  });
});

// ---------------------------------------------------------------------------
// 9. retrieveEntityMap
// ---------------------------------------------------------------------------
describe("retrieveEntityMap", () => {
  it("should return 404 for a non-existent entity map", async () => {
    if (
      gateBroker(
        "scorpio",
        "returns 400 InvalidRequest instead of 404 for unknown entity map",
      )
    ) {
      await expect(
        retrieveEntityMap({ entityMapId: "nonExistentMap12345" }),
      ).rejects.toThrow(NgsiLdBadRequest);
      return;
    }

    await expect(
      retrieveEntityMap({ entityMapId: "nonExistentMap12345" }),
    ).rejects.toThrow(NgsiLdNotFound);
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

    await expect(
      updateEntityMap({ entityMapId: "nonExistentMap12345", entityMap: patch }),
    ).rejects.toThrow(NgsiLdNotFound);
  });
});

// ---------------------------------------------------------------------------
// 11. deleteEntityMap
// ---------------------------------------------------------------------------
describe("deleteEntityMap", () => {
  it("should return 404 when deleting a non-existent entity map", async () => {
    await expect(
      deleteEntityMap({ entityMapId: "nonExistentMap12345" }),
    ).rejects.toThrow(NgsiLdNotFound);
  });
});

// ---------------------------------------------------------------------------
// 12. retrieveCSIdentityInfo
// ---------------------------------------------------------------------------
describe("retrieveCSIdentityInfo", () => {
  it("should retrieve context source identity info", async () => {
    if (gateBroker("stellio", "retrieveCSIdentityInfo not implemented")) {
      await expect(() => retrieveCSIdentityInfo()).rejects.toThrow(
        NgsiLdNotFound,
      );
      return;
    }

    if (
      gateBroker("scorpio", "returns text/plain URL instead of JSON object")
    ) {
      await expect(() => retrieveCSIdentityInfo()).rejects.toThrow(SyntaxError);
      return;
    }

    const data = await retrieveCSIdentityInfo();
    expect(data).toBeDefined();
  });
});
