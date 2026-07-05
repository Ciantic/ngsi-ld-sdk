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
  NGSILD_CORE_CONTEXT,
} from "../src";
import { expectHttpError, cleanUpAll } from "./helpers";
import { NgsiLdNotFound, NgsiLdConflict } from "../src";
import { EntitySelector, MaybeContext, Subscription } from "../src/api/schemas";

// Wipe all stale resources from previous crashed runs before each test.
beforeEach(cleanUpAll);

// ===========================================================================
// Standard Subscriptions (/subscriptions)
// ===========================================================================

let subCounter = 0;
function makeSubscription() {
  subCounter += 1;
  const suffix = `${Date.now()}-${subCounter}`;
  return {
    "@context": NGSILD_CORE_CONTEXT,
    id: `urn:ngsi-ld:Subscription:test-${suffix}`,
    type: "Subscription",
    entities: [{ type: "TestEntity" }] as EntitySelector[],
    notification: {
      endpoint: {
        uri: "http://example.com/notification",
        accept: "application/json" as const,
      },
    },
  } as const satisfies MaybeContext<Subscription>;
}

// ---------------------------------------------------------------------------
// 1. createSubscription
// ---------------------------------------------------------------------------
describe("createSubscription", () => {
  it("should create a subscription and return the location", async () => {
    const sub = makeSubscription();
    const { location } = await createSubscription(sub);

    expect(typeof location).toBe("string");
    expect(location).toBeTruthy();
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
  it("should query subscriptions", async () => {
    const sub = makeSubscription();
    await createSubscription(sub);

    const data = await querySubscription();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// 3. retrieveSubscription
// ---------------------------------------------------------------------------
describe("retrieveSubscription", () => {
  it("should retrieve a subscription by id", async () => {
    const sub = makeSubscription();
    await createSubscription(sub);

    const data = await retrieveSubscription(sub.id);

    expect(data).toBeDefined();
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
  it("should update (PATCH) a subscription", async () => {
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

    const result = await updateSubscription(sub.id, patch);

    expect(result).toBeUndefined();

    // Verify the update
    const retrieved = await retrieveSubscription(sub.id);
    const data = retrieved;
    const notification = data["notification"];
    const endpoint = notification["endpoint"];
    expect(endpoint["uri"]).toBe("http://updated.example.com/notification");
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
  it("should delete a subscription", async () => {
    const sub = makeSubscription();
    await createSubscription(sub);

    const result = await deleteSubscription(sub.id);

    expect(result).toBeUndefined();
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
  // Helper: call createCSRSubscription and return the location,
  // or return undefined if the endpoint is not implemented (404).
  async function tryCreateCSRSubscription(
    sub: unknown,
  ): Promise<{ location: string } | undefined> {
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
    const result = await tryCreateCSRSubscription(sub);

    // Some brokers (e.g. Orion-LD) may not implement /csourceSubscriptions
    if (!result) return;

    expect(typeof result.location).toBe("string");
    expect(result.location).toBeTruthy();
  });

  it("should reject duplicate CSR subscription", async () => {
    const sub = makeSubscription();
    const result1 = await tryCreateCSRSubscription(sub);

    // Skip if endpoint not implemented
    if (!result1) return;
    expect(typeof result1.location).toBe("string");

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
    let result;
    try {
      result = await createCSRSubscription(sub);
    } catch (err) {
      if (err instanceof NgsiLdNotFound) return;
      throw err;
    }

    // Skip if endpoint not implemented
    if (!result) return;

    const data = await queryCSRSubscription();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// 8. retrieveCSRSubscription
// ---------------------------------------------------------------------------
describe("retrieveCSRSubscription", () => {
  it("should retrieve a CSR subscription by id", async () => {
    const sub = makeSubscription();
    let result;
    try {
      result = await createCSRSubscription(sub);
    } catch (err) {
      if (err instanceof NgsiLdNotFound) return;
      throw err;
    }

    if (!result) return;

    const parts = result.location.split("/");
    const csrSubId = parts[parts.length - 1];

    const data = await retrieveCSRSubscription(csrSubId);

    expect(data).toBeDefined();
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
    let createResult;
    try {
      createResult = await createCSRSubscription(sub);
    } catch (err) {
      if (err instanceof NgsiLdNotFound) return;
      throw err;
    }

    if (!createResult) return;
    const parts = createResult.location.split("/");
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

    const result = await updateCSRSubscription(csrSubId, patch);

    expect(result).toBeUndefined();
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
    let result;
    try {
      result = await createCSRSubscription(sub);
    } catch (err) {
      if (err instanceof NgsiLdNotFound) return;
      throw err;
    }

    if (!result) return;
    const parts = result.location.split("/");
    const csrSubId = parts[parts.length - 1];

    const deleteResult = await deleteCSRSubscription(csrSubId);

    expect(result).toBeUndefined();
    // don't track — already deleted
  });

  it("should return 404 when deleting a non-existent CSR subscription", async () => {
    await expectHttpError(404, NgsiLdNotFound, () =>
      deleteCSRSubscription("urn:ngsi-ld:Subscription:nonexistent"),
    );
  });
});
