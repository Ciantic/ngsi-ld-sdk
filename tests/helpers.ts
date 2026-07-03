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

export const NGSILD_CORE_CONTEXT = [
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

export async function cleanUpAll(): Promise<void> {
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
    ) => Promise<{ status: number; data: unknown } | unknown[]>,
  ) => {
    try {
      const res = await queryFn({ limit: 1000 });
      // queryEntity now returns data directly (an array)
      if (Array.isArray(res)) {
        const ids = extractIds(res);
        if (ids.length > 0) await deleteBatch(ids);
        return;
      }
      if ((res as any).status !== 200) return;
      const ids = extractIds((res as any).data);
      if (ids.length > 0) await deleteBatch(ids);
    } catch {
      // Ignore cleanup failures
    }
  };

  await deleteAll((p) => queryEntity(p as any));
  await deleteAll((p) => querySubscription(p as any));
  await deleteAll((p) => queryCSR(p as any));
}

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
