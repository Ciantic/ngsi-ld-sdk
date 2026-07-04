import { throwHttpError } from "./errors";

const BASE_URL =
  process.env.NGSILD_BROKER_URL || "http://localhost:1026/ngsi-ld/v1";

/**
 * Returns true if the object looks like a plain GeoJSON geometry
 * (e.g. {"type":"Point","coordinates":[24,60]}) rather than an
 * NGSI-LD structure.  These should be left alone.
 */
function isGeoJsonGeometry(obj: Record<string, unknown>): boolean {
  if (typeof obj.type !== "string") return false;
  if (!GEOJSON_TYPES.has(obj.type)) return false;
  return (
    obj.type === "Feature" ||
    obj.type === "FeatureCollection" ||
    "coordinates" in obj ||
    "geometries" in obj
  );
}

/**
 * Recursively checks whether a value contains any NGSI-LD attribute objects
 * (objects with `type` ∈ {"Property","GeoProperty",…}).  This determines
 * whether the value should be wrapped in `$props`.
 */
function containsNgsildAttribute(v: unknown): boolean {
  if (v === null || typeof v !== "object") return false;
  if (Array.isArray(v)) return v.some(containsNgsildAttribute);
  const obj = v as Record<string, unknown>;
  if (isGeoJsonGeometry(obj)) return false;
  if (typeof obj.type === "string" && NGSILD_ATTR_TYPES.has(obj.type)) {
    return true;
  }
  // Recurse into children — an Entity contains attributes, etc.
  return Object.values(obj).some(containsNgsildAttribute);
}

/**
 * Transform a response body from the Orion wire format into the SDK
 * shape.  Moves all dynamic NGSI-LD attribute keys into a `$props`
 * sub-object so users can access them without an index signature.
 *
 * Only wraps when at least one non-structural key's value looks like an
 * NGSI-LD attribute (object with `type` ∈ {"Property","GeoProperty",…}).
 * This avoids wrapping CsourceRegistration, Subscription, Query, etc.
 *
 * Applies recursively to arrays and nested objects that look like
 * NGSI-LD structures.
 */
export function fromApi<T>(data: T): T {
  if (data === null || data === undefined) return data;
  if (Array.isArray(data)) return data.map(fromApi) as unknown as T;
  if (typeof data !== "object") return data;

  const obj = data as Record<string, unknown>;

  // Never transform plain GeoJSON geometry objects
  if (isGeoJsonGeometry(obj)) return data;

  // Separate structural keys from potential dynamic attribute keys
  const structural: Record<string, unknown> = {};
  const dynamic: Record<string, unknown> = {};

  for (const key of Object.keys(obj)) {
    if (STRUCTURAL_KEYS.has(key)) {
      structural[key] = fromApi(obj[key]);
    } else {
      dynamic[key] = fromApi(obj[key]);
    }
  }

  // Only wrap if at least one dynamic key's value contains an
  // NGSI-LD attribute somewhere (recursive check).
  const hasNgsildAttrs = Object.values(dynamic).some(containsNgsildAttribute);

  if (hasNgsildAttrs && Object.keys(dynamic).length > 0) {
    structural["$props"] = dynamic;
  } else {
    // No wrapping needed — merge dynamic back into structural
    Object.assign(structural, dynamic);
  }

  return structural as unknown as T;
}

/**
 * Transform an SDK-shaped request body back into the Orion wire format.
 * Spreads the `$props` sub-object to the top level so Orion receives
 * the flat JSON-LD it expects.  Recurses into all nested values so
 * deeply nested `$props` are also unwound.
 */
export function toApi<T>(body: T): T {
  if (body === null || body === undefined) return body;
  if (Array.isArray(body)) return body.map(toApi) as unknown as T;
  if (typeof body !== "object") return body;

  const obj = body as Record<string, unknown>;

  // First, recurse into all values (they might themselves have `props`)
  const processed: Record<string, unknown> = {};
  let hasProperties = false;
  for (const key of Object.keys(obj)) {
    processed[key] = toApi(obj[key]);
    if (key === "$props" && isObject(processed[key])) {
      hasProperties = true;
    }
  }

  if (!hasProperties) return processed as unknown as T;

  const { $props, ...rest } = processed;
  // $props is already recursively processed from above,
  // spread its keys to the top level
  return {
    ...rest,
    ...($props as Record<string, unknown>),
  } as unknown as T;
}

function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

export const fetcher = async <T>(
  url: string,
  {
    method,
    params,
    headers,
    body,
    returnFormat,
  }: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    params?: any;
    headers?: [string, string][] | Record<string, string> | Headers;
    body?: any;
    responseType?: string;
    returnFormat?: "body" | "status-data";
  },
): Promise<T> => {
  let targetUrl = `${BASE_URL}${url}`;
  if (params) {
    targetUrl += "?" + new URLSearchParams(params);
  }

  // Transform SDK shape → Orion wire format before sending.
  // The generated API code pre-stringifies the body, so we need to
  // parse it first, apply toApi, then re-stringify.
  let wireBody: string | undefined;
  if (body != null) {
    const parsed = typeof body === "string" ? JSON.parse(body) : body;
    wireBody = JSON.stringify(toApi(parsed));
  }

  const response = await fetch(targetUrl, {
    method,
    body: wireBody,
    headers,
  });
  const responseBody = [204, 205, 304].includes(response.status)
    ? undefined
    : await response.text();
  const data = responseBody ? JSON.parse(responseBody) : {};

  // Throw on non-2XX responses
  if (response.status < 200 || response.status >= 300) {
    throwHttpError(response, data);
  }

  // Transform Orion wire format → SDK shape on the way back
  const location =
    response.status === 201
      ? (response.headers.get("location") ?? undefined)
      : undefined;

  const transformed = fromApi(data);

  if (returnFormat === "body" && response.status === 204) {
    return undefined as T;
  }

  if (returnFormat === "body" && response.status === 201) {
    return (location ?? "") as T;
  }

  if (!returnFormat || returnFormat === "status-data") {
    return { status: response.status, data: transformed, location } as T;
  }

  return transformed as T;
};

const STRUCTURAL_KEYS = new Set([
  "@context",
  "bbox",
  "coordinates",
  "createdAt",
  "datasetId",
  "deletedAt",
  "entity",
  "entityList",
  "features",
  "geometry",
  "id",
  "instanceId",
  "json",
  "languageMap",
  "location",
  "modifiedAt",
  "object",
  "objectList",
  "objectType",
  "observationSpace",
  "observedAt",
  "operationSpace",
  "previousJson",
  "previousLanguageMap",
  "previousObject",
  "previousObjectList",
  "previousValue",
  "previousValueList",
  "previousVocab",
  "scope",
  "type",
  "unitCode",
  "value",
  "valueList",
  "vocab",
]);

const NGSILD_ATTR_TYPES = new Set([
  "GeoProperty",
  "JsonProperty",
  "LanguageProperty",
  "ListProperty",
  "ListRelationship",
  "Property",
  "Relationship",
  "VocabProperty",
]);

const GEOJSON_TYPES = new Set([
  "Feature",
  "FeatureCollection",
  "GeometryCollection",
  "LineString",
  "MultiLineString",
  "MultiPoint",
  "MultiPolygon",
  "Point",
  "Polygon",
]);
