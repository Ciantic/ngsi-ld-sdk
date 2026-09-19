import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createNgsiLdClient } from "../src";

describe("createNgsiLdClient", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should call operations against the configured base URL", async () => {
    fetchMock.mockResolvedValue({
      status: 200,
      headers: new Headers(),
      text: async () => "[]",
    });

    const client = createNgsiLdClient({
      baseUrl: "https://example.com/",
      headers: {
        Authorization: "Bearer token FOO!",
      },
    });
    await client.queryEntity();

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://example.com/entities");
    expect((init.headers as Headers).get("Authorization")).toBe(
      "Bearer token FOO!",
    );
  });
});
