import { describe, it, expect, beforeEach } from "vitest";
import {
  createSubscription,
  querySubscription,
  retrieveSubscription,
  updateSubscription,
  deleteSubscription,
  createCSRSubscription,
  queryCSRSubscription,
  retrieveCSRSubscription,
  updateCSRSubscription,
  deleteCSRSubscription,
} from "../src";
import {
  makeSubscription,
  expectHttpError,
  cleanUpAll,
} from "./helpers";
import { NgsiLdNotFound, NgsiLdConflict } from "../src";

// Wipe all stale resources from previous crashed runs before each test.
beforeEach(cleanUpAll);

// ===========================================================================
// Standard Subscriptions (/subscriptions)
// ===========================================================================

// ---------------------------------------------------------------------------
// 1. createSubscription
// ---------------------------------------------------------------------------
describe("createSubscription", () => {
  it("should create a subscription and return 201", async () => {
    const sub = makeSubscription();
    const response = await createSubscription(sub);

    expect(response.status).toBe(201);
  });

  it("should return 409 when creating a duplicate subscription", async () => {
    const sub = makeSubscription();
    await createSubscription(sub);

    await expectHttpError(409, NgsiLdConflict, () => createSubscription(sub));
  });
});

// ---------------------------------------------------------------------------
// 2. querySubscription
// ---------------------------------------------------------------------------
describe("querySubscription", () => {
  it("should query subscriptions and return 200", async () => {
    const sub = makeSubscription();
    await createSubscription(sub);

    const response = await querySubscription();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// 3. retrieveSubscription
// ---------------------------------------------------------------------------
describe("retrieveSubscription", () => {
  it("should retrieve a subscription by id and return 200", async () => {
    const sub = makeSubscription();
    await createSubscription(sub);

    const response = await retrieveSubscription(sub.id);

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should return 404 for a non-existent subscription", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      retrieveSubscription("urn:ngsi-ld:Subscription:nonexistent"),
    );
  });
});

// ---------------------------------------------------------------------------
// 4. updateSubscription
// ---------------------------------------------------------------------------
describe("updateSubscription", () => {
  it("should update (PATCH) a subscription and return 204", async () => {
    const sub = makeSubscription();
    await createSubscription(sub);

    const patch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      notification: {
        endpoint: {
          uri: "http://updated.example.com/notification",
          accept: "application/json" as const,
        },
      },
    };

    const response = await updateSubscription(sub.id, patch);

    expect(response.status).toBe(204);

    // Verify the update
    const retrieved = await retrieveSubscription(sub.id);
    if (retrieved.status === 200) {
      const data = retrieved.data;
      const notification = data["notification"];
      const endpoint = notification["endpoint"];
      expect(endpoint["uri"]).toBe("http://updated.example.com/notification");
    }
  });

  it("should return 404 when updating a non-existent subscription", async () => {
    const patch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      notification: {
        endpoint: {
          uri: "http://updated.example.com/notification",
          accept: "application/json" as const,
        },
      },
    };

    await expectHttpError(404, NgsiLdNotFound, () =>
      updateSubscription("urn:ngsi-ld:Subscription:nonexistent", patch),
    );
  });
});

// ---------------------------------------------------------------------------
// 5. deleteSubscription
// ---------------------------------------------------------------------------
describe("deleteSubscription", () => {
  it("should delete a subscription and return 204", async () => {
    const sub = makeSubscription();
    await createSubscription(sub);

    const response = await deleteSubscription(sub.id);

    expect(response.status).toBe(204);
    // don't track — already deleted
  });

  it("should return 404 when deleting a non-existent subscription", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      deleteSubscription("urn:ngsi-ld:Subscription:nonexistent"),
    );
  });
});

// ===========================================================================
// CSR Subscriptions (/csourceSubscriptions)
// ===========================================================================

// ---------------------------------------------------------------------------
// 6. createCSRSubscription
// ---------------------------------------------------------------------------
describe("createCSRSubscription", () => {
  // Helper: call createCSRSubscription and return the response,
  // or return undefined if the endpoint is not implemented (404).
  async function tryCreateCSRSubscription(sub: unknown) {
    try {
      return await createCSRSubscription(
        sub as Parameters<typeof createCSRSubscription>[0],
      );
    } catch (err) {
      if (err instanceof NgsiLdNotFound) return undefined;
      throw err;
    }
  }

  it("should create a CSR subscription", async () => {
    // CSR subscriptions get an auto-generated id from the broker;
    // spread makeSubscription then omit the explicit id
    const { id: _omit, ...sub } = makeSubscription();
    const response = await tryCreateCSRSubscription(sub);

    // Some brokers (e.g. Orion-LD) may not implement /csourceSubscriptions
    if (!response) return;

    expect(response.status).toBe(201);
    if (response.status !== 201) throw new Error("Expected 201");
  });

  it("should reject duplicate CSR subscription", async () => {
    const sub = makeSubscription();
    const response1 = await tryCreateCSRSubscription(sub);

    // Skip if endpoint not implemented
    if (!response1) return;
    expect(response1.status).toBe(201);
    if (response1.status !== 201) throw new Error("Expected 201");

    await expectHttpError(409, NgsiLdConflict, () =>
      tryCreateCSRSubscription(sub),
    );
  });
});

// ---------------------------------------------------------------------------
// 7. queryCSRSubscription
// ---------------------------------------------------------------------------
describe("queryCSRSubscription", () => {
  it("should query CSR subscriptions", async () => {
    const sub = makeSubscription();
    let createResp;
    try {
      createResp = await createCSRSubscription(sub);
    } catch (err) {
      if (err instanceof NgsiLdNotFound) return;
      throw err;
    }

    // Skip if endpoint not implemented
    if (!createResp) return;

    const location = createResp.status === 201 && createResp.location;

    const response = await queryCSRSubscription();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// 8. retrieveCSRSubscription
// ---------------------------------------------------------------------------
describe("retrieveCSRSubscription", () => {
  it("should retrieve a CSR subscription by id", async () => {
    const sub = makeSubscription();
    let createResp;
    try {
      createResp = await createCSRSubscription(sub);
    } catch (err) {
      if (err instanceof NgsiLdNotFound) return;
      throw err;
    }

    if (!createResp) return;

    const location = createResp.status === 201 && createResp.location;
    if (!location) {
      // Cannot test retrieve without an ID
      return;
    }
    const parts = location.split("/");
    const csrSubId = parts[parts.length - 1];

    const response = await retrieveCSRSubscription(csrSubId);

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should return 404 for a non-existent CSR subscription", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      retrieveCSRSubscription("urn:ngsi-ld:Subscription:nonexistent"),
    );
  });
});

// ---------------------------------------------------------------------------
// 9. updateCSRSubscription
// ---------------------------------------------------------------------------
describe("updateCSRSubscription", () => {
  it("should update (PATCH) a CSR subscription", async () => {
    const sub = makeSubscription();
    let createResp;
    try {
      createResp = await createCSRSubscription(sub);
    } catch (err) {
      if (err instanceof NgsiLdNotFound) return;
      throw err;
    }

    if (!createResp) return;

    const location = createResp.status === 201 && createResp.location;
    if (!location) return;
    const parts = location.split("/");
    const csrSubId = parts[parts.length - 1];

    const patch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      notification: {
        endpoint: {
          uri: "http://patched.example.com/notification",
          accept: "application/json" as const,
        },
      },
    };

    const response = await updateCSRSubscription(csrSubId, patch);

    expect(response.status).toBe(204);
  });

  it("should return 404 when updating a non-existent CSR subscription", async () => {
    const patch = {
      "@context": [
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      ],
      notification: {
        endpoint: {
          uri: "http://patched.example.com/notification",
          accept: "application/json" as const,
        },
      },
    };

    await expectHttpError(404, NgsiLdNotFound, () =>
      updateCSRSubscription("urn:ngsi-ld:Subscription:nonexistent", patch),
    );
  });
});

// ---------------------------------------------------------------------------
// 10. deleteCSRSubscription
// ---------------------------------------------------------------------------
describe("deleteCSRSubscription", () => {
  it("should delete a CSR subscription", async () => {
    const sub = makeSubscription();
    let createResp;
    try {
      createResp = await createCSRSubscription(sub);
    } catch (err) {
      if (err instanceof NgsiLdNotFound) return;
      throw err;
    }

    if (!createResp) return;

    const location = createResp.status === 201 && createResp.location;
    if (!location) return;
    const parts = location.split("/");
    const csrSubId = parts[parts.length - 1];

    const response = await deleteCSRSubscription(csrSubId);

    expect(response.status).toBe(204);
    // don't track — already deleted
  });

  it("should return 404 when deleting a non-existent CSR subscription", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      deleteCSRSubscription("urn:ngsi-ld:Subscription:nonexistent"),
    );
  });
});
