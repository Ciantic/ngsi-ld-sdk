import { expect } from "vitest";
import type { NgsiLdHttpError } from "../src";
import { deleteBatch, queryEntity, queryCSR, querySubscription } from "../src";

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

let entityCounter = 0;

/** Create a minimal test entity with a simple Property. */
export function makeEntity() {
  entityCounter += 1;
  const suffix = `${Date.now()}-${entityCounter}`;
  const id = `urn:ngsi-ld:TestEntity:test-${suffix}`;
  return {
    "@context": NGSILD_CORE_CONTEXT,
    id,
    type: "TestEntity" as const,
    temperature: {
      type: "Property" as const,
      value: 25 + entityCounter,
    },
  };
}

/** Create a test entity with a GeoProperty. */
export function makeEntityWithGeo() {
  return {
    ...makeEntity(),
    location: {
      type: "GeoProperty" as const,
      value: {
        type: "Point" as const,
        coordinates: [24.93, 60.17] as [number, number],
      },
    },
  };
}

function extractIds(data: unknown): string[] {
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
}

export async function cleanUpAll(): Promise<void> {
  // Max limit in stellio is 100 by default
  const results = await Promise.allSettled([
    queryEntity({ type: "TestEntity", limit: 100 }),
    queryEntity({
      type: "DiscoveryTestEntity,DiscoveryDetailsEntity,DiscoveryLocalEntity,EntityTypeInfoTest",
      limit: 100,
    }),
    queryEntity({
      type: "TemporalTestEntity,BatchQueryTemporalTest",
      limit: 100,
    }),
    querySubscription({ limit: 100 }),
    queryCSR({ limit: 100 }),
  ]);

  const deleteIds: string[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      deleteIds.push(...extractIds(result.value));
    } else {
      console.warn("[cleanUpAll] cleanup query failed:", result.reason);
    }
  }

  if (deleteIds.length > 0) await deleteBatch(deleteIds);
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
