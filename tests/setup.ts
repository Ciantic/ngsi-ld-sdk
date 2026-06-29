import { brokerUrl } from "./helpers";

// The generated SDK uses native `fetch` with relative URLs (e.g. `/entities`).
// In Node.js, `fetch` needs absolute URLs. We monkey-patch global fetch to
// prepend the broker base URL for relative paths, and auto-add Content-Type
// header for JSON bodies (the orval-generated SDK omits it in several functions).
const _originalFetch = globalThis.fetch.bind(globalThis);

globalThis.fetch = async (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> => {
  let url: string;
  if (typeof input === "string") {
    url = input;
  } else if (input instanceof URL) {
    url = input.href;
  } else {
    url = input.url;
  }

  // If the URL is relative (starts with /), prepend the broker URL
  if (url.startsWith("/")) {
    url = brokerUrl.replace(/\/+$/, "") + url;
  }

  // Auto-set Content-Type: application/ld+json for requests with a body
  // that don't already have a Content-Type header set (DELETE operations
  // with a body, e.g. batch delete, need this).
  const hasBody = !!init?.body;
  const existingHeaders = init?.headers
    ? new Headers(init.headers)
    : new Headers();
  if (hasBody && !existingHeaders.has("content-type")) {
    existingHeaders.set("content-type", "application/ld+json");
    init = { ...init, headers: existingHeaders };
  }

  // Create a new request with the resolved URL
  const resolvedInput =
    typeof input === "string" || input instanceof URL
      ? url
      : new Request(url, input);

  return _originalFetch(resolvedInput, init);
};
