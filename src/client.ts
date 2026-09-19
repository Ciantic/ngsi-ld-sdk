import { NgsiLdRequestOpts } from "./fetcher";
import * as operations from "./operations";

const normalizeBaseUrl = (baseUrl: string): string =>
  baseUrl.replace(/\/+$/, "");

export const createNgsiLdClient = (
  opts: NgsiLdRequestOpts,
): typeof operations => {
  const url = normalizeBaseUrl(opts.baseUrl ?? "");

  return Object.fromEntries(
    Object.entries(operations).map(([name, operation]) => [
      name,
      (fnopts: any = {}) =>
        operation({
          ...fnopts,
          options: { ...opts, baseUrl: url, ...fnopts?.options },
        }),
    ]),
  ) as typeof operations;
};

export type NgsiLdClient = ReturnType<typeof createNgsiLdClient>;
