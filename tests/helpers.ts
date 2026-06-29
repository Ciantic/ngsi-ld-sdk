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

// --- Factory functions ---

let entityCounter = 0;

/** Create a minimal test entity with a simple Property. */
export function makeEntity(
  overrides?: Partial<Entity>,
): Entity & { id: string; type: string } {
  entityCounter += 1;
  const suffix = `${Date.now()}-${entityCounter}`;
  const id = `urn:ngsi-ld:TestEntity:test-${suffix}`;
  return {
    id,
    type: "TestEntity",
    temperature: {
      type: "Property" as const,
      value: 25 + entityCounter,
    },
    ...overrides,
  } as Entity & { id: string; type: string };
}

/** Create a test entity with a GeoProperty. */
export function makeEntityWithGeo(
  overrides?: Partial<Entity>,
): Entity & { id: string; type: string } {
  const entity = makeEntity(overrides);
  (entity as Record<string, unknown>)["location"] = {
    type: "GeoProperty",
    value: {
      type: "Point",
      coordinates: [24.93, 60.17],
    },
  } satisfies GeoProperty;
  return entity;
}

let csrCounter = 0;

/** Create a minimal Context Source Registration. */
export function makeCSR(
  overrides?: Partial<CsourceRegistration>,
): CsourceRegistration & { id: string; type: string } {
  csrCounter += 1;
  const suffix = `${Date.now()}-${csrCounter}`;
  const id = `urn:ngsi-ld:CSR:test-${suffix}`;
  return {
    id,
    type: "ContextSourceRegistration" as const,
    information: [
      {
        entities: [{ type: "TestEntity" }] as EntitySelector[],
      },
    ],
    endpoint: "http://example.com/ngsi-ld",
    ...overrides,
  } as CsourceRegistration & { id: string; type: string };
}

let subCounter = 0;

/** Create a minimal subscription body. */
export function makeSubscription(
  overrides?: Partial<SubscriptionBody>,
): SubscriptionBody {
  subCounter += 1;
  const suffix = `${Date.now()}-${subCounter}`;
  return {
    id: `urn:ngsi-ld:Subscription:test-${suffix}`,
    type: "Subscription",
    entities: [{ type: "TestEntity" }] as EntitySelector[],
    notification: {
      endpoint: {
        uri: "http://example.com/notification",
        accept: "application/json",
      },
    },
    ...overrides,
  } as SubscriptionBody;
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
export async function cleanUpSubscription(subscriptionId: string): Promise<void> {
  try {
    await deleteSubscription(subscriptionId);
  } catch {
    // Ignore
  }
}

/** DELETE a CSR subscription if it exists. */
export async function cleanUpCSRSubscription(subscriptionId: string): Promise<void> {
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
    throw new Error(
      `Expected 2xx status but got ${response.status}: ${body}`,
    );
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
