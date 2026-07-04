import { describe, it, expect, beforeEach } from "vitest";
import { createCSR, queryCSR, retrieveCSR, updateCSR, deleteCSR } from "../src";
import { expectHttpError, cleanUpAll, NGSILD_CORE_CONTEXT } from "./helpers";
import { NgsiLdNotFound, NgsiLdConflict } from "../src";
import { CsourceRegistration, EntitySelector } from "../src/api/schemas";

// Wipe all stale resources from previous crashed runs before each test.
beforeEach(cleanUpAll);

/** Create a minimal Context Source Registration. */

let csrCounter = 0;

export function makeCSR() {
  csrCounter += 1;
  const suffix = `${Date.now()}-${csrCounter}`;
  return {
    "@context": NGSILD_CORE_CONTEXT,
    id: `urn:ngsi-ld:CSR:test-${suffix}`,
    type: "ContextSourceRegistration" as const,
    information: [
      {
        entities: [{ type: "TestEntity" }] as EntitySelector[],
      },
    ],
    endpoint: "http://example.com/ngsi-ld",
  } as const satisfies CsourceRegistration & { id: string; type: string };
}

// ---------------------------------------------------------------------------
// 1. createCSR
// ---------------------------------------------------------------------------
describe("createCSR", () => {
  it("should create a CSR and return the location", async () => {
    const csr = makeCSR();
    const { location } = await createCSR(csr);

    expect(typeof location).toBe("string");
    expect(location).toBeTruthy();
  });

  it("should return 409 when creating a duplicate CSR", async () => {
    const csr = makeCSR();
    await createCSR(csr);

    await expectHttpError(409, NgsiLdConflict, () => createCSR(csr));
  });
});

// ---------------------------------------------------------------------------
// 2. queryCSR
// ---------------------------------------------------------------------------
describe("queryCSR", () => {
  it("should query CSRs", async () => {
    // Create a CSR first so there's something to query
    const csr = makeCSR();
    await createCSR(csr);

    const data = await queryCSR();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it("should support query parameters to filter CSRs", async () => {
    const csr = {
      ...makeCSR(),
      information: [
        {
          entities: [{ type: "CSRQueryEntity" }],
          propertyNames: ["temperature"],
        },
      ],
    };
    await createCSR(csr);

    const data = await queryCSR({ type: "ContextSourceRegistration" });

    expect(Array.isArray(data)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 3. retrieveCSR
// ---------------------------------------------------------------------------
describe("retrieveCSR", () => {
  it("should retrieve a CSR by id", async () => {
    const csr = makeCSR();
    await createCSR(csr);

    const data = await retrieveCSR(csr.id!);

    expect(data).toBeDefined();
  });

  it("should return 404 for a non-existent CSR", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      retrieveCSR("urn:ngsi-ld:CSR:nonexistent"),
    );
  });
});

// ---------------------------------------------------------------------------
// 4. updateCSR
// ---------------------------------------------------------------------------
describe("updateCSR", () => {
  it("should update (PATCH) a CSR", async () => {
    const csr = makeCSR();
    await createCSR(csr);

    const patch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      endpoint: "http://updated.example.com/ngsi-ld",
    };

    const result = await updateCSR(csr.id!, patch);

    expect(result).toBeUndefined();

    // Verify the update worked
    const retrieved = await retrieveCSR(csr.id!);
    const data = retrieved as Record<string, unknown>;
    expect(data["endpoint"]).toBe("http://updated.example.com/ngsi-ld");
  });

  it("should return 404 when updating a non-existent CSR", async () => {
    const patch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      endpoint: "http://updated.example.com/ngsi-ld",
    };

    await expectHttpError(404, NgsiLdNotFound, () =>
      updateCSR("urn:ngsi-ld:CSR:nonexistent", patch),
    );
  });
});

// ---------------------------------------------------------------------------
// 5. deleteCSR
// ---------------------------------------------------------------------------
describe("deleteCSR", () => {
  it("should delete a CSR", async () => {
    const csr = makeCSR();
    await createCSR(csr);

    const result = await deleteCSR(csr.id!);

    expect(result).toBeUndefined();
    // don't track — already deleted
  });

  it("should return 404 when deleting a non-existent CSR", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      deleteCSR("urn:ngsi-ld:CSR:nonexistent"),
    );
  });
});
