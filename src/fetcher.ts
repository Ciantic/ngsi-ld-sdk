import { throwHttpError } from "./errors";

const BASE_URL =
  process.env.NGSILD_BROKER_URL || "http://localhost:1026/ngsi-ld/v1";

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

  const wireBody: string | undefined =
    body != null
      ? typeof body === "string"
        ? body
        : JSON.stringify(body)
      : undefined;

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
