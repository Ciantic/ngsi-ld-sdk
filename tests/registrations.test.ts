import { describe, it, expect, beforeEach } from "vitest";
import { createCSR, queryCSR, retrieveCSR, updateCSR, deleteCSR } from "../src";
import { makeCSR, expectOk, expectHttpError, cleanUpAll } from "./helpers";
import { NgsiLdNotFound, NgsiLdConflict } from "../src";

// Wipe all stale resources from previous crashed runs before each test.
beforeEach(cleanUpAll);

// ---------------------------------------------------------------------------
// 1. createCSR
// ---------------------------------------------------------------------------
describe("createCSR", () => {
  it("should create a CSR and return 201", async () => {
    const csr = makeCSR();
    const response = await createCSR(csr);

    expectOk(response);
    expect(response.status).toBe(201);
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
  it("should query CSRs and return 200", async () => {
    // Create a CSR first so there's something to query
    const csr = makeCSR();
    await createCSR(csr);

    const response = await queryCSR();

    expectOk(response);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    if (Array.isArray(response.data)) {
      expect(response.data.length).toBeGreaterThan(0);
    }
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

    const response = await queryCSR({ type: "ContextSourceRegistration" });

    expectOk(response);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 3. retrieveCSR
// ---------------------------------------------------------------------------
describe("retrieveCSR", () => {
  it("should retrieve a CSR by id and return 200", async () => {
    const csr = makeCSR();
    await createCSR(csr);

    const response = await retrieveCSR(csr.id!);

    expectOk(response);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
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
  it("should update (PATCH) a CSR and return 204", async () => {
    const csr = makeCSR();
    await createCSR(csr);

    const patch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      endpoint: "http://updated.example.com/ngsi-ld",
    };

    const response = await updateCSR(csr.id!, patch);

    expectOk(response);
    expect(response.status).toBe(204);

    // Verify the update worked
    const retrieved = await retrieveCSR(csr.id!);
    if (retrieved.status === 200) {
      const data = retrieved.data as Record<string, unknown>;
      expect(data["endpoint"]).toBe("http://updated.example.com/ngsi-ld");
    }
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
  it("should delete a CSR and return 204", async () => {
    const csr = makeCSR();
    await createCSR(csr);

    const response = await deleteCSR(csr.id!);

    expect(response.status).toBe(204);
    // don't track — already deleted
  });

  it("should return 404 when deleting a non-existent CSR", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      deleteCSR("urn:ngsi-ld:CSR:nonexistent"),
    );
  });
});
