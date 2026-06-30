
const BASE_URL = process.env.NGSILD_BROKER_URL || "http://localhost:1026/ngsi-ld/v1";

export const fetcher = async <T extends { status: number; data: any }>(
  url: string,
  {
    method,
    params,
    headers,
    body,
  }: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    params?: any;
    headers?: [string, string][] | Record<string, string> | Headers;
    body?: any;
    responseType?: string;
  },
): Promise<T> => {
  let targetUrl = `${BASE_URL}${url}`;
  if (params) {
    targetUrl += "?" + new URLSearchParams(params);
  }
  const response = await fetch(targetUrl, {
    method,
    body,
    headers,
  });
  const responseBody = [204, 205, 304].includes(response.status)
    ? undefined
    : await response.text();
  const data = responseBody ? JSON.parse(responseBody) : {};

  return { status: response.status, data } as T;
};
