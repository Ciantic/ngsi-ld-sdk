import {
  type Entity,
  type CsourceRegistration,
  type EntitySelector,
  type SubscriptionCommon,
  type Property,
  type GeoProperty,
  type EntityTemporal,
  type SubscriptionBody,
  type QueryTemporalBody,
} from "../src/generated/api.schemas";
import {
  deleteEntity,
  deleteCSR,
  deleteSubscription,
  deleteCSRSubscription,
} from "../src/generated/api";

// --- Broker URL ---

/** Broker base URL. Defaults to Orion-LD default port + NGSI-LD API prefix. */
export const brokerUrl: string =
  process.env["NGSILD_BROKER_URL"] ?? "http://localhost:1026/ngsi-ld/v1";

const NGSILD_CORE_CONTEXT = [
  "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
];

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
    properties: {
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
  } as const satisfies SubscriptionBody;
}

// --- Cleanup helpers ---

/**
 * DELETE an entity if it exists. Swallows 404 so teardown always succeeds.
 * Also strips the broker URL prefix if present in the ID.
 */
export async function cleanUpEntity(entityId: string): Promise<void> {
  try {
    // Orion may return the full URI as entity id; extract the path part
    const cleanId = entityId.startsWith("urn:") ? entityId : entityId;
    await deleteEntity(cleanId);
  } catch {
    // Ignore cleanup failures (e.g. already deleted)
  }
}

/** DELETE a CSR if it exists. */
export async function cleanUpCSR(registrationId: string): Promise<void> {
  try {
    await deleteCSR(registrationId);
  } catch {
    // Ignore
  }
}

/** DELETE a subscription if it exists. */
export async function cleanUpSubscription(
  subscriptionId: string,
): Promise<void> {
  try {
    await deleteSubscription(subscriptionId);
  } catch {
    // Ignore
  }
}

/** DELETE a CSR subscription if it exists. */
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

/** Assert the response has a specific status code and body shape. */
export function expectStatus<T extends { status: number }>(
  response: T,
  expectedStatus: number,
): void {
  if (response.status !== expectedStatus) {
    const body = "data" in response ? JSON.stringify(response.data) : "";
    throw new Error(
      `Expected status ${expectedStatus} but got ${response.status}: ${body}`,
    );
  }
}

/**
 * Warn if the broker returned 501 (Not Implemented), indicating that
 * the feature is not enabled. Use this in temporal tests.
 * Pass a human-readable operation name to describe what's missing.
 */
export function warnIf501(status: number, operation?: string): void {
  if (status === 501) {
    const what = operation ? `: ${operation}` : "";
    console.warn(`Not implemented (501)${what}. `);
  }
}
