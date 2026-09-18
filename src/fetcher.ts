import { ProblemDetails } from "./api/schemas";
import { NGSILD_STATUS_TO_ERROR, NgsiLdHttpError } from "./errors";

const BASE_URL =
  (typeof process !== "undefined" && process.env.NGSILD_BROKER_URL) ||
  import.meta.env?.NGSILD_BROKER_URL ||
  "http://localhost:1026/ngsi-ld/v1";

/**
 * Construct and throw the appropriate {@link NgsiLdHttpError} subclass
 * for the given HTTP response.
 *
 * If the status code is not explicitly mapped, a plain {@link NgsiLdHttpError}
 * is thrown (generic 4xx/5xx).
 */
function throwHttpError(response: Response, body: ProblemDetails): never {
  const ErrorClass = NGSILD_STATUS_TO_ERROR[response.status];
  if (ErrorClass) {
    throw new ErrorClass(body, response);
  }
  throw new NgsiLdHttpError(response.status, body, response);
}

export const fetcher = async <T>(
  url: string,
  {
    method,
    params,
    headers,
    body,
    returnFormat,
    ...requestInit
  }: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    params?: any;
    headers?: HeadersInit;
    body?: any;
    responseType?: string;
    returnFormat?: "body" | "status-data";
  } & Omit<RequestInit, "method" | "body" | "headers">,
): Promise<T> => {
  let targetUrl = `${BASE_URL}${url}`;
  if (params) {
    targetUrl += "?" + new URLSearchParams(params);
  }

  const wireBody: string | undefined =
    body != null
      ? typeof body === "string"
        ? body
        : JSON.stringify(body)
      : undefined;

  const mergedHeaders = new Headers({
    "Content-Type": "application/ld+json",
    Accept: "application/ld+json",
  });
  new Headers(headers).forEach((value, key) => mergedHeaders.set(key, value));

  const response = await fetch(targetUrl, {
    ...requestInit,
    method,
    ...(typeof wireBody !== "undefined" ? { body: wireBody } : {}),
    headers: mergedHeaders,
  });
  const responseBody = [204, 205, 304].includes(response.status)
    ? undefined
    : await response.text();
  const data = responseBody ? JSON.parse(responseBody) : {};

  // Throw on non-2XX responses
  if (response.status < 200 || response.status >= 300) {
    throwHttpError(response, data);
  }

  const location =
    response.status === 201
      ? (response.headers.get("location") ?? undefined)
      : undefined;

  if (returnFormat === "body" && response.status === 204) {
    return undefined as T;
  }

  if (returnFormat === "body" && response.status === 201) {
    return { location: location ?? "" } as T;
  }

  if (!returnFormat || returnFormat === "status-data") {
    return { status: response.status, data, location } as T;
  }

  return data as T;
};
