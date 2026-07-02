import { describe, it, expect, afterEach } from "vitest";
import { createCSR, queryCSR, retrieveCSR, updateCSR, deleteCSR } from "../src";
import { makeCSR, expectOk, cleanUpCSR } from "./helpers";

// Track created CSRs for cleanup
const createdIds: string[] = [];

afterEach(async () => {
  // Clean up all CSRs created during the test
  while (createdIds.length > 0) {
    const id = createdIds.pop()!;
    await cleanUpCSR(id);
  }
});

function trackId(csr: { id?: string }): string {
  const id = csr.id!;
  createdIds.push(id);
  return id;
}

// ---------------------------------------------------------------------------
// 1. createCSR
// ---------------------------------------------------------------------------
describe("createCSR", () => {
  it("should create a CSR and return 201", async () => {
    const csr = makeCSR();
    const response = await createCSR(csr);

    expectOk(response);
    expect(response.status).toBe(201);
    trackId(csr);
  });

  it("should return 409 when creating a duplicate CSR", async () => {
    const csr = makeCSR();
    await createCSR(csr);
    trackId(csr);

    const response = await createCSR(csr);
    expect(response.status).toBe(409);
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
    trackId(csr);

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
    trackId(csr);

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
    trackId(csr);

    const response = await retrieveCSR(csr.id!);

    expectOk(response);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should return 404 for a non-existent CSR", async () => {
    const response = await retrieveCSR("urn:ngsi-ld:CSR:nonexistent");

    expect(response.status).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// 4. updateCSR
// ---------------------------------------------------------------------------
describe("updateCSR", () => {
  it("should update (PATCH) a CSR and return 204", async () => {
    const csr = makeCSR();
    await createCSR(csr);
    trackId(csr);

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

    const response = await updateCSR("urn:ngsi-ld:CSR:nonexistent", patch);

    expect(response.status).toBe(404);
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
    const response = await deleteCSR("urn:ngsi-ld:CSR:nonexistent");

    expect(response.status).toBe(404);
  });
});
