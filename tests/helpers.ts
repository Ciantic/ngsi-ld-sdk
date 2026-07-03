import { expect } from "vitest";
import {
  type Entity,
  type CsourceRegistration,
  type EntitySelector,
  type SubscriptionCommon,
  type Property,
  type GeoProperty,
  type EntityTemporal,
  type Subscription,
  type QueryTemporalBody,
  type MaybeContext,
} from "../src/generated/schemas";
import { NgsiLdHttpError, NgsiLdNotFound } from "../src";
import {
  deleteBatch,
  deleteCSR,
  deleteSubscription,
  deleteCSRSubscription,
  queryEntity,
  queryCSR,
  querySubscription,
} from "../src";

// --- Broker URL ---

/** Broker base URL. Defaults to Orion-LD default port + NGSI-LD API prefix. */
export const brokerUrl: string =
  process.env["NGSILD_BROKER_URL"] ?? "http://localhost:1026/ngsi-ld/v1";

const NGSILD_CORE_CONTEXT = [
  "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
];

export function detectBroker(): "orion" | "stellio" | "unknown" {
  const explicit = process.env["NGSILD_BROKER_NAME"];
  if (explicit === "orion" || explicit === "stellio") return explicit;

  const url = process.env["NGSILD_BROKER_URL"] ?? "";
  if (url.includes("orion-ld") || url.includes(":1026")) return "orion";
  if (url.includes("stellio") || url.includes(":8080")) return "stellio";
  return "unknown";
}

// --- Factory functions ---

let entityCounter = 0;

/** Create a minimal test entity with a simple Property. */
export function makeEntity() {
  entityCounter += 1;
  const suffix = `${Date.now()}-${entityCounter}`;
  const id = `urn:ngsi-ld:TestEntity:test-${suffix}`;
  return {
    "@context": NGSILD_CORE_CONTEXT,
    id,
    type: "TestEntity",
    $props: {
      temperature: {
        type: "Property" as const,
        value: 25 + entityCounter,
      },
    },
  } as const satisfies Entity & {
    id: string;
    type: string;
    "@context": string[];
  };
}

/** Create a test entity with a GeoProperty. */
export function makeEntityWithGeo() {
  return {
    ...makeEntity(),
    location: {
      type: "GeoProperty" as const,
      value: {
        type: "Point",
        coordinates: [24.93, 60.17],
      },
    },
  } as const satisfies Entity & { id: string; type: string };
}

let csrCounter = 0;

/** Create a minimal Context Source Registration. */
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

let subCounter = 0;

/** Create a minimal subscription body. */
export function makeSubscription() {
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

// --- Cleanup helpers ---

/**
 * Query and batch-delete all entities, subscriptions, and CSRs.
 * Does not need any type — blasts through everything.  Use in `beforeAll` to
 * wipe stale resources from previous crashed runs.
 */
export async function cleanUpAll(): Promise<void> {
  /**
   * Extract entity IDs from a query response that may be:
   *  - `Entity[]` (standard application/ld+json)
   *  - `FeatureCollection` (application/geo+json — Orion-LD may return this
   *    even without an explicit Accept header when entities have GeoProperties)
   */
  const extractIds = (data: unknown): string[] => {
    if (Array.isArray(data)) {
      return data.map((i: any) => i.id).filter((id): id is string => !!id);
    }
    if (
      data &&
      typeof data === "object" &&
      (data as any).type === "FeatureCollection" &&
      Array.isArray((data as any).features)
    ) {
      return (data as any).features
        .map((f: any) => f.id)
        .filter((id: any): id is string => !!id);
    }
    return [];
  };

  const deleteAll = async (
    queryFn: (
      params?: Record<string, unknown>,
    ) => Promise<{ status: number; data: unknown }>,
  ) => {
    try {
      const res = await queryFn({ limit: 1000 });
      if (res.status !== 200) return;
      const ids = extractIds(res.data);
      if (ids.length > 0) await deleteBatch(ids);
    } catch {
      // Ignore cleanup failures
    }
  };

  await deleteAll((p) => queryEntity(p as any));
  await deleteAll((p) => querySubscription(p as any));
  await deleteAll((p) => queryCSR(p as any));
}

/**
 * DELETE an entity if it exists. Swallows 404 so teardown always succeeds.
 * @deprecated Use {@link cleanUpAll} in `beforeAll` instead.
 */
export async function cleanUpEntity(entityId: string): Promise<void> {
  try {
    await deleteBatch([entityId]);
  } catch {
    // Ignore cleanup failures (e.g. already deleted)
  }
}

/**
 * DELETE a CSR if it exists.
 * @deprecated Use {@link cleanUpAll} in `beforeAll` instead.
 */
export async function cleanUpCSR(registrationId: string): Promise<void> {
  try {
    await deleteCSR(registrationId);
  } catch {
    // Ignore
  }
}

/**
 * DELETE a subscription if it exists.
 * @deprecated Use {@link cleanUpAll} in `beforeAll` instead.
 */
export async function cleanUpSubscription(
  subscriptionId: string,
): Promise<void> {
  try {
    await deleteSubscription(subscriptionId);
  } catch {
    // Ignore
  }
}

/**
 * DELETE a CSR subscription if it exists.
 * @deprecated Use {@link cleanUpAll} in `beforeAll` instead.
 */
export async function cleanUpCSRSubscription(
  subscriptionId: string,
): Promise<void> {
  try {
    await deleteCSRSubscription(subscriptionId);
  } catch {
    // Ignore
  }
}

// --- Assertion helpers ---

/**
 * Assert the response has a 2xx status code.
 * Returns the response for chaining.
 */
export function expectOk<T extends { status: number }>(
  response: T,
): asserts response is T & { status: 200 | 201 | 204 } {
  if (response.status < 200 || response.status >= 300) {
    const body = "data" in response ? JSON.stringify(response.data) : "";
    throw new Error(`Expected 2xx status but got ${response.status}: ${body}`);
  }
}

// --- Error assertion helper (since errors now throw) ---

/**
 * Execute an async NGSI-LD call, catch the {@link NgsiLdHttpError},
 * and assert its status code equals `expectedStatus`.
 *
 * If the call resolves instead of throwing, the test fails.
 */
export async function expectHttpError<T extends NgsiLdHttpError>(
  expectedStatus: number,
  errorClass: new (...args: any[]) => T,
  fn: () => Promise<unknown>,
): Promise<T> {
  try {
    await fn();
  } catch (err) {
    if (!(err instanceof errorClass)) {
      throw new Error(
        `Expected ${errorClass.name} but got ${(err as Error).constructor.name}: ${(err as Error).message}`,
      );
    }
    expect(err.status).toBe(expectedStatus);
    return err as T;
  }
  throw new Error(
    `Expected ${errorClass.name} with status ${expectedStatus}, but no error was thrown`,
  );
}

export async function catchHttpError<T>(
  fn: () => Promise<T>,
  handler: (err: NgsiLdHttpError) => void,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    handler(err as NgsiLdHttpError);
    throw err;
  }
}
