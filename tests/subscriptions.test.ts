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
import { cleanUpAll, gateBroker } from "./helpers";
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
    const { location } = await createSubscription({ subscription: sub });

    expect(typeof location).toBe("string");
    expect(location).toBeTruthy();
  });

  it("should return 409 when creating a duplicate subscription", async () => {
    const sub = makeSubscription();
    await createSubscription({ subscription: sub });

    await expect(createSubscription({ subscription: sub })).rejects.toThrow(
      NgsiLdConflict,
    );
  });
});

// ---------------------------------------------------------------------------
// 2. querySubscription
// ---------------------------------------------------------------------------
describe("querySubscription", () => {
  it("should query subscriptions", async () => {
    const sub = makeSubscription();
    await createSubscription({ subscription: sub });

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
    await createSubscription({ subscription: sub });

    const data = await retrieveSubscription({ subscriptionId: sub.id });

    expect(data).toBeDefined();
  });

  it("should return 404 for a non-existent subscription", async () => {
    await expect(
      retrieveSubscription({
        subscriptionId: "urn:ngsi-ld:Subscription:nonexistent",
      }),
    ).rejects.toThrow(NgsiLdNotFound);
  });
});

// ---------------------------------------------------------------------------
// 4. updateSubscription
// ---------------------------------------------------------------------------
describe("updateSubscription", () => {
  it("should update (PATCH) a subscription", async () => {
    const sub = makeSubscription();
    await createSubscription({ subscription: sub });

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

    const result = await updateSubscription({
      subscriptionId: sub.id,
      subscriptionFragment: patch,
    });

    expect(result).toBeUndefined();

    // Verify the update
    const retrieved = await retrieveSubscription({ subscriptionId: sub.id });
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

    await expect(
      updateSubscription({
        subscriptionId: "urn:ngsi-ld:Subscription:nonexistent",
        subscriptionFragment: patch,
      }),
    ).rejects.toThrow(NgsiLdNotFound);
  });
});

// ---------------------------------------------------------------------------
// 5. deleteSubscription
// ---------------------------------------------------------------------------
describe("deleteSubscription", () => {
  it("should delete a subscription", async () => {
    const sub = makeSubscription();
    await createSubscription({ subscription: sub });

    const result = await deleteSubscription({ subscriptionId: sub.id });

    expect(result).toBeUndefined();
    // don't track — already deleted
  });

  it("should return 404 when deleting a non-existent subscription", async () => {
    await expect(
      deleteSubscription({
        subscriptionId: "urn:ngsi-ld:Subscription:nonexistent",
      }),
    ).rejects.toThrow(NgsiLdNotFound);
  });
});

// ===========================================================================
// CSR Subscriptions (/csourceSubscriptions)
// ===========================================================================

// ---------------------------------------------------------------------------
// 6. createCSRSubscription
// ---------------------------------------------------------------------------
describe("createCSRSubscription", () => {
  it("should create a CSR subscription", async () => {
    // CSR subscriptions get an auto-generated id from the broker;
    // spread makeSubscription then omit the explicit id
    const { id: _omit, ...sub } = makeSubscription();

    let result;
    try {
      result = await createCSRSubscription({ csrSubscription: sub });
    } catch (err) {
      if (gateBroker("scorpio", "CSR Create gives Conflict?")) {
        expect(err).toBeInstanceOf(NgsiLdConflict);
        return;
      }

      if (
        gateBroker(["stellio", "orion"], "CSR subscriptions not implemented")
      ) {
        expect(err).toBeInstanceOf(NgsiLdNotFound);
        return;
      }
      throw err;
    }

    expect(typeof result.location).toBe("string");
    expect(result.location).toBeTruthy();
  });

  it("should reject duplicate CSR subscription", async () => {
    const sub = makeSubscription();

    try {
      await createCSRSubscription({ csrSubscription: sub });
    } catch (err) {
      if (
        gateBroker(
          ["stellio", "orion", "scorpio"],
          "CSR subscriptions not implemented",
        )
      ) {
        expect(err).toBeInstanceOf(NgsiLdNotFound);
        return;
      }
      throw err;
    }

    await expect(
      createCSRSubscription({ csrSubscription: sub }),
    ).rejects.toThrow(NgsiLdConflict);
  });
});

// ---------------------------------------------------------------------------
// 7. queryCSRSubscription
// ---------------------------------------------------------------------------
describe("queryCSRSubscription", () => {
  it("should query CSR subscriptions", async () => {
    const sub = makeSubscription();

    try {
      await createCSRSubscription({ csrSubscription: sub });
    } catch (err) {
      if (
        gateBroker(
          ["stellio", "orion", "scorpio"],
          "CSR subscriptions not implemented",
        )
      ) {
        expect(err).toBeInstanceOf(NgsiLdNotFound);
        return;
      }
      throw err;
    }

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
      result = await createCSRSubscription({ csrSubscription: sub });
    } catch (err) {
      if (
        gateBroker(
          ["stellio", "orion", "scorpio"],
          "CSR subscriptions not implemented",
        )
      ) {
        expect(err).toBeInstanceOf(NgsiLdNotFound);
        return;
      }
      throw err;
    }

    const parts = result.location.split("/");
    const csrSubId = parts[parts.length - 1];

    const data = await retrieveCSRSubscription({ subscriptionId: csrSubId });

    expect(data).toBeDefined();
  });

  it("should return 404 for a non-existent CSR subscription", async () => {
    await expect(
      retrieveCSRSubscription({
        subscriptionId: "urn:ngsi-ld:Subscription:nonexistent",
      }),
    ).rejects.toThrow(NgsiLdNotFound);
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
      createResult = await createCSRSubscription({ csrSubscription: sub });
    } catch (err) {
      if (
        gateBroker(
          ["stellio", "orion", "scorpio"],
          "CSR subscriptions not implemented",
        )
      ) {
        expect(err).toBeInstanceOf(NgsiLdNotFound);
        return;
      }
      throw err;
    }

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

    const result = await updateCSRSubscription({
      csrSubscriptionId: csrSubId,
      csrSubscriptionFragment: patch,
    });

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

    await expect(
      updateCSRSubscription({
        csrSubscriptionId: "urn:ngsi-ld:Subscription:nonexistent",
        csrSubscriptionFragment: patch,
      }),
    ).rejects.toThrow(NgsiLdNotFound);
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
      result = await createCSRSubscription({ csrSubscription: sub });
    } catch (err) {
      if (
        gateBroker(
          ["stellio", "orion", "scorpio"],
          "CSR subscriptions not implemented",
        )
      ) {
        expect(err).toBeInstanceOf(NgsiLdNotFound);
        return;
      }
      throw err;
    }

    const parts = result.location.split("/");
    const csrSubId = parts[parts.length - 1];

    await deleteCSRSubscription({ csrSubscriptionId: csrSubId });
    // don't track — already deleted
  });

  it("should return 404 when deleting a non-existent CSR subscription", async () => {
    await expect(
      deleteCSRSubscription({
        csrSubscriptionId: "urn:ngsi-ld:Subscription:nonexistent",
      }),
    ).rejects.toThrow(NgsiLdNotFound);
  });
});
