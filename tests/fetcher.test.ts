import { describe, it, expect } from "vitest";
import { fromApi, toApi } from "../src/fetcher";

// =============================================================================
// fromApi — Orion wire format → SDK shape
// =============================================================================
describe("fromApi", () => {
  // -------------------------------------------------------------------------
  // Primitives & null/undefined — pass through unchanged
  // -------------------------------------------------------------------------
  it("passes through null", () => {
    expect(fromApi(null)).toBeNull();
  });

  it("passes through undefined", () => {
    expect(fromApi(undefined)).toBeUndefined();
  });

  it("passes through strings", () => {
    expect(fromApi("hello")).toBe("hello");
  });

  it("passes through numbers", () => {
    expect(fromApi(42)).toBe(42);
  });

  it("passes through booleans", () => {
    expect(fromApi(true)).toBe(true);
    expect(fromApi(false)).toBe(false);
  });

  // -------------------------------------------------------------------------
  // Plain objects (no id, no type) — pass through unchanged
  // -------------------------------------------------------------------------
  it("passes through plain objects without id or type", () => {
    const plain = { foo: "bar", baz: 123 };
    expect(fromApi(plain)).toEqual(plain);
  });

  it("passes through empty object", () => {
    expect(fromApi({})).toEqual({});
  });

  // -------------------------------------------------------------------------
  // Entity with dynamic attributes — wrapped into `properties`
  // -------------------------------------------------------------------------
  it("wraps dynamic attributes of an entity into `properties`", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      temperature: { type: "Property", value: 25 },
      humidity: { type: "Property", value: 55 },
    };

    const result = fromApi(wire);

    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      properties: {
        temperature: { type: "Property", value: 25 },
        humidity: { type: "Property", value: 55 },
      },
    });
  });

  // -------------------------------------------------------------------------
  // Entity with only structural keys — no `properties` key
  // -------------------------------------------------------------------------
  it("does not add `properties` when there are no dynamic attributes", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      createdAt: "2024-01-01T00:00:00Z",
      modifiedAt: "2024-01-02T00:00:00Z",
    };

    const result = fromApi(wire);

    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      createdAt: "2024-01-01T00:00:00Z",
      modifiedAt: "2024-01-02T00:00:00Z",
    });
    expect(result).not.toHaveProperty("properties");
  });

  // -------------------------------------------------------------------------
  // @context is structural — stays at top level
  // -------------------------------------------------------------------------
  it("keeps @context at the top level (structural)", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      temperature: { type: "Property", value: 25 },
    };

    const result = fromApi(wire);

    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      properties: {
        temperature: { type: "Property", value: 25 },
      },
    });
  });

  // -------------------------------------------------------------------------
  // Scope — structural
  // -------------------------------------------------------------------------
  it("keeps scope at the top level (structural)", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      scope: "tenantA",
      temperature: { type: "Property", value: 25 },
    };

    const result = fromApi(wire);

    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      scope: "tenantA",
      properties: {
        temperature: { type: "Property", value: 25 },
      },
    });
  });

  // -------------------------------------------------------------------------
  // location, observationSpace, operationSpace — structural
  // -------------------------------------------------------------------------
  it("keeps location/observationSpace/operationSpace at the top level", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      location: {
        type: "GeoProperty",
        value: { type: "Point", coordinates: [24, 60] },
      },
      observationSpace: {
        type: "GeoProperty",
        value: { type: "Point", coordinates: [25, 61] },
      },
      operationSpace: {
        type: "GeoProperty",
        value: { type: "Point", coordinates: [26, 62] },
      },
    };

    const result = fromApi(wire);

    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      location: {
        type: "GeoProperty",
        value: { type: "Point", coordinates: [24, 60] },
      },
      observationSpace: {
        type: "GeoProperty",
        value: { type: "Point", coordinates: [25, 61] },
      },
      operationSpace: {
        type: "GeoProperty",
        value: { type: "Point", coordinates: [26, 62] },
      },
    });
  });

  // -------------------------------------------------------------------------
  // Object with only `id` and a plain key → not wrapped (no NGSI-LD attrs)
  // -------------------------------------------------------------------------
  it("does not wrap objects whose dynamic keys aren't NGSI-LD attributes", () => {
    const wire = {
      id: "urn:ngsi-ld:Attr:1",
      attrName: "temperature",
    };

    const result = fromApi(wire);

    // `attrName` is a plain string, not an NGSI-LD attribute → no wrapping
    expect(result).toEqual({
      id: "urn:ngsi-ld:Attr:1",
      attrName: "temperature",
    });
  });

  // -------------------------------------------------------------------------
  // Object with only `type` — treated as NGSI-LD
  // -------------------------------------------------------------------------
  it("treats objects with only `type` as NGSI-LD", () => {
    const wire = {
      type: "Property",
      value: 42,
      observedAt: "2024-01-01T00:00:00Z",
      unitCode: "CEL",
    };

    const result = fromApi(wire);

    // `value`, `observedAt`, `unitCode` are all structural → no properties
    expect(result).toEqual({
      type: "Property",
      value: 42,
      observedAt: "2024-01-01T00:00:00Z",
      unitCode: "CEL",
    });
  });

  // -------------------------------------------------------------------------
  // Array of entities — each gets wrapped
  // -------------------------------------------------------------------------
  it("handles arrays of entities", () => {
    const wire = [
      {
        id: "urn:ngsi-ld:Test:1",
        type: "T",
        temperature: { type: "Property", value: 25 },
      },
      {
        id: "urn:ngsi-ld:Test:2",
        type: "T",
        humidity: { type: "Property", value: 55 },
      },
    ];

    const result = fromApi(wire);

    expect(result).toEqual([
      {
        id: "urn:ngsi-ld:Test:1",
        type: "T",
        properties: { temperature: { type: "Property", value: 25 } },
      },
      {
        id: "urn:ngsi-ld:Test:2",
        type: "T",
        properties: { humidity: { type: "Property", value: 55 } },
      },
    ]);
  });

  // -------------------------------------------------------------------------
  // Recursive wrapping in nested NGSI-LD attributes
  // -------------------------------------------------------------------------
  it("recursively wraps nested NGSI-LD objects within attributes", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      location: {
        type: "GeoProperty",
        value: { type: "Point", coordinates: [24, 60] },
        // A dynamic property inside a GeoProperty (rare but possible per spec)
        accuracy: { type: "Property", value: 0.95 },
      },
    };

    const result = fromApi(wire);

    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      location: {
        type: "GeoProperty",
        value: { type: "Point", coordinates: [24, 60] },
        properties: {
          accuracy: { type: "Property", value: 0.95 },
        },
      },
    });
  });

  // -------------------------------------------------------------------------
  // createdAt, modifiedAt, deletedAt — structural (system timestamps)
  // -------------------------------------------------------------------------
  it("keeps createdAt/modifiedAt/deletedAt at the top level", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      createdAt: "2024-01-01T00:00:00Z",
      modifiedAt: "2024-01-02T00:00:00Z",
      deletedAt: "2024-01-03T00:00:00Z",
    };

    const result = fromApi(wire);

    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      createdAt: "2024-01-01T00:00:00Z",
      modifiedAt: "2024-01-02T00:00:00Z",
      deletedAt: "2024-01-03T00:00:00Z",
    });
    expect(result).not.toHaveProperty("properties");
  });

  // -------------------------------------------------------------------------
  // Mixed — empty array and objects in arrays
  // -------------------------------------------------------------------------
  it("returns empty array as-is", () => {
    expect(fromApi([])).toEqual([]);
  });

  it("passes through arrays of primitives", () => {
    expect(fromApi([1, "two", true])).toEqual([1, "two", true]);
  });
});

// =============================================================================
// toApi — SDK shape → Orion wire format
// =============================================================================
describe("toApi", () => {
  // -------------------------------------------------------------------------
  // Primitives & null/undefined — pass through
  // -------------------------------------------------------------------------
  it("passes through null", () => {
    expect(toApi(null)).toBeNull();
  });

  it("passes through undefined", () => {
    expect(toApi(undefined)).toBeUndefined();
  });

  it("passes through strings", () => {
    expect(toApi("hello")).toBe("hello");
  });

  it("passes through numbers", () => {
    expect(toApi(42)).toBe(42);
  });

  it("passes through booleans", () => {
    expect(toApi(true)).toBe(true);
    expect(toApi(false)).toBe(false);
  });

  // -------------------------------------------------------------------------
  // Object with `properties` — spread to top level
  // -------------------------------------------------------------------------
  it("spreads `properties` to the top level", () => {
    const sdk = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      properties: {
        temperature: { type: "Property", value: 25 },
        humidity: { type: "Property", value: 55 },
      },
    };

    const result = toApi(sdk);

    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      temperature: { type: "Property", value: 25 },
      humidity: { type: "Property", value: 55 },
    });
  });

  // -------------------------------------------------------------------------
  // Object without `properties` — pass through unchanged
  // -------------------------------------------------------------------------
  it("passes through objects without `properties`", () => {
    const sdk = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
    };

    expect(toApi(sdk)).toEqual(sdk);
  });

  // -------------------------------------------------------------------------
  // `properties` is null — pass through
  // -------------------------------------------------------------------------
  it("passes through when `properties` is null", () => {
    const sdk = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      properties: null,
    };

    expect(toApi(sdk)).toEqual(sdk);
  });

  // -------------------------------------------------------------------------
  // `properties` is not an object (e.g., string) — pass through
  // -------------------------------------------------------------------------
  it("passes through when `properties` is a non-object", () => {
    const sdk = {
      id: "urn:ngsi-ld:Test:1",
      properties: "not-an-object",
    };

    expect(toApi(sdk)).toEqual(sdk);
  });

  // -------------------------------------------------------------------------
  // Array of objects with `properties` — each spread
  // -------------------------------------------------------------------------
  it("handles arrays of SDK objects", () => {
    const sdk = [
      {
        id: "urn:ngsi-ld:Test:1",
        type: "T",
        properties: { temperature: { type: "Property", value: 25 } },
      },
      {
        id: "urn:ngsi-ld:Test:2",
        type: "T",
        properties: { humidity: { type: "Property", value: 55 } },
      },
    ];

    const result = toApi(sdk);

    expect(result).toEqual([
      {
        id: "urn:ngsi-ld:Test:1",
        type: "T",
        temperature: { type: "Property", value: 25 },
      },
      {
        id: "urn:ngsi-ld:Test:2",
        type: "T",
        humidity: { type: "Property", value: 55 },
      },
    ]);
  });

  // -------------------------------------------------------------------------
  // Nested `properties` — recursive spread
  // -------------------------------------------------------------------------
  it("recursively spreads nested `properties`", () => {
    const sdk = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      properties: {
        location: {
          type: "GeoProperty",
          value: { type: "Point", coordinates: [24, 60] },
          properties: {
            accuracy: { type: "Property", value: 0.95 },
          },
        },
      },
    };

    const result = toApi(sdk);

    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      location: {
        type: "GeoProperty",
        value: { type: "Point", coordinates: [24, 60] },
        accuracy: { type: "Property", value: 0.95 },
      },
    });
  });

  // -------------------------------------------------------------------------
  // Empty `properties` — still spread (results in no extra keys)
  // -------------------------------------------------------------------------
  it("handles empty `properties` object", () => {
    const sdk = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      properties: {},
    };

    const result = toApi(sdk);

    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
    });
    expect(result).not.toHaveProperty("properties");
  });

  // -------------------------------------------------------------------------
  // `properties` alongside `@context` — all survive
  // -------------------------------------------------------------------------
  it("preserves @context alongside spread properties", () => {
    const sdk = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      properties: {
        temperature: { type: "Property", value: 25 },
      },
    };

    const result = toApi(sdk);

    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      temperature: { type: "Property", value: 25 },
    });
  });
});

// =============================================================================
// Round-trip tests
// =============================================================================
describe("fromApi ↔ toApi round-trip", () => {
  // -------------------------------------------------------------------------
  // fromApi then toApi: wire → SDK → wire (should be identity)
  // -------------------------------------------------------------------------
  it("wire → SDK → wire is identity for a simple entity", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      temperature: { type: "Property", value: 25 },
      humidity: { type: "Property", value: 55 },
    };

    const sdk = fromApi(wire);
    const back = toApi(sdk);

    expect(back).toEqual(wire);
  });

  it("wire → SDK → wire is identity for entity with @context", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      temperature: { type: "Property", value: 25 },
    };

    const back = toApi(fromApi(wire));
    expect(back).toEqual(wire);
  });

  it("wire → SDK → wire is identity for entity with timestamps", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      createdAt: "2024-01-01T00:00:00Z",
      modifiedAt: "2024-01-02T00:00:00Z",
      temperature: {
        type: "Property",
        value: 25,
        observedAt: "2024-01-01T01:00:00Z",
      },
    };

    const back = toApi(fromApi(wire));
    expect(back).toEqual(wire);
  });

  it("wire → SDK → wire is identity for entity with GeoProperty", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      location: {
        type: "GeoProperty",
        value: { type: "Point", coordinates: [24.93, 60.17] },
      },
      temperature: { type: "Property", value: 25 },
    };

    const back = toApi(fromApi(wire));
    expect(back).toEqual(wire);
  });

  it("wire → SDK → wire is identity for entity-only (no dynamic attrs)", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      scope: "tenantA",
    };

    const back = toApi(fromApi(wire));
    expect(back).toEqual(wire);
  });

  it("wire → SDK → wire is identity for an array of entities", () => {
    const wire = [
      { id: "urn:ngsi-ld:A:1", type: "T", a: { type: "Property", value: 1 } },
      { id: "urn:ngsi-ld:B:1", type: "T", b: { type: "Property", value: 2 } },
    ];

    const back = toApi(fromApi(wire));
    expect(back).toEqual(wire);
  });

  // -------------------------------------------------------------------------
  // toApi then fromApi: SDK → wire → SDK (should be identity)
  // -------------------------------------------------------------------------
  it("SDK → wire → SDK is identity for an SDK entity", () => {
    const sdk = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      properties: {
        temperature: { type: "Property", value: 25 },
        humidity: { type: "Property", value: 55 },
      },
    };

    const wire = toApi(sdk);
    const back = fromApi(wire);

    expect(back).toEqual(sdk);
  });

  it("SDK → wire → SDK is identity for an SDK entity with @context", () => {
    const sdk = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      properties: {
        temperature: { type: "Property", value: 25 },
      },
    };

    const back = fromApi(toApi(sdk));
    expect(back).toEqual(sdk);
  });

  // -------------------------------------------------------------------------
  // Non-NGSI-LD round-tripping
  // -------------------------------------------------------------------------
  it("passes through non-NGSI-LD objects unchanged in both directions", () => {
    const plain = { foo: "bar", baz: 123 };
    expect(fromApi(plain)).toEqual(plain);
    expect(toApi(plain)).toEqual(plain);

    // Round-trip
    expect(toApi(fromApi(plain))).toEqual(plain);
    expect(fromApi(toApi(plain))).toEqual(plain);
  });
});

// =============================================================================
// Edge cases
// =============================================================================
describe("fromApi / toApi edge cases", () => {
  // -------------------------------------------------------------------------
  // Properties that conflict with structural keys
  // -------------------------------------------------------------------------
  it("handles `properties` attribute in wire data (known limitation)", () => {
    // An entity where `properties` is a legitimate NGSI-LD attribute name.
    // This is an edge case with inherent ambiguity: the SDK uses
    // `properties` as its internal grouping key.
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      properties: { type: "Property", value: "some value" },
    };

    const sdk = fromApi(wire);

    // The `properties` attribute (dynamic) gets nested inside the SDK
    // `properties` container — this is technically a transformation
    // but `properties` as an attribute name is extremely rare.
    expect(sdk).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      properties: {
        properties: { type: "Property", value: "some value" },
      },
    });

    // Round-tripping through toApi produces a flat structure again,
    // but the outer entity `type` is shadowed by the inner attribute's
    // `type`.  This is a known limitation when an NGSI-LD attribute
    // is literally named "properties".
    const back = toApi(sdk);
    expect(back).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "Property",
      value: "some value",
    });
  });

  it("handles `properties` key in wire data that is not an NGSI-LD object", () => {
    // A plain object with a `properties` key but no id/type
    const plain = { properties: { foo: "bar" } };

    // fromApi — not NGSI-LD (no id, no type), so passthrough
    expect(fromApi(plain)).toEqual(plain);

    // toApi — has `properties` that is an object, so it would spread
    // This is handled correctly: non-NGSI-LD data shouldn't go through
    // these transforms normally. The user should only use toApi/fromApi
    // on NGSI-LD payloads.
  });

  // -------------------------------------------------------------------------
  // Deeply nested entities
  // -------------------------------------------------------------------------
  it("handles deeply nested NGSI-LD structures", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      temperature: {
        type: "Property",
        value: 25,
        // A nested inline entity as a property value
        nestedEntity: {
          id: "urn:ngsi-ld:Nested:1",
          type: "NestedType",
          nestedAttr: { type: "Property", value: "deep" },
        },
      },
    };

    const sdk = fromApi(wire);

    expect(sdk).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      properties: {
        temperature: {
          type: "Property",
          value: 25,
          properties: {
            nestedEntity: {
              id: "urn:ngsi-ld:Nested:1",
              type: "NestedType",
              properties: {
                nestedAttr: { type: "Property", value: "deep" },
              },
            },
          },
        },
      },
    });

    // Round-trip
    const back = toApi(sdk);
    expect(back).toEqual(wire);
  });

  // -------------------------------------------------------------------------
  // Relationship attributes — structural keys preserved
  // -------------------------------------------------------------------------
  it("preserves Relationship structural keys (object, objectType, entity)", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      managedBy: {
        type: "Relationship",
        object: "urn:ngsi-ld:Device:1",
        objectType: "Device",
        observedAt: "2024-01-01T00:00:00Z",
      },
    };

    const result = fromApi(wire);

    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      properties: {
        managedBy: {
          type: "Relationship",
          object: "urn:ngsi-ld:Device:1",
          objectType: "Device",
          observedAt: "2024-01-01T00:00:00Z",
        },
      },
    });

    // Round-trip
    expect(toApi(result)).toEqual(wire);
  });

  // -------------------------------------------------------------------------
  // Property with all structural sub-keys
  // -------------------------------------------------------------------------
  it("handles Property with datasetId and unitCode (all structural sub-keys)", () => {
    const wire = {
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      temperature: {
        type: "Property",
        value: 25,
        unitCode: "CEL",
        datasetId: "urn:ngsi-ld:Dataset:1",
        observedAt: "2024-01-01T00:00:00Z",
        instanceId: "urn:ngsi-ld:Instance:1",
        createdAt: "2024-01-01T00:00:00Z",
        modifiedAt: "2024-01-02T00:00:00Z",
      },
    };

    const result = fromApi(wire);

    // All sub-keys are structural → no nested properties
    expect(result).toEqual({
      id: "urn:ngsi-ld:Test:1",
      type: "TestType",
      properties: {
        temperature: {
          type: "Property",
          value: 25,
          unitCode: "CEL",
          datasetId: "urn:ngsi-ld:Dataset:1",
          observedAt: "2024-01-01T00:00:00Z",
          instanceId: "urn:ngsi-ld:Instance:1",
          createdAt: "2024-01-01T00:00:00Z",
          modifiedAt: "2024-01-02T00:00:00Z",
        },
      },
    });

    expect(toApi(result)).toEqual(wire);
  });
});
