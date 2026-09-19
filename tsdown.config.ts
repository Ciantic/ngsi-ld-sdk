import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/client.ts",
    "src/operations.ts",
    "src/schemas.ts",
    "src/errors.ts",
    "src/fetcher.ts",
    "src/urls.ts",
  ],
  dts: true,
  unbundle: true,
  clean: true,
  format: ["esm"],
  outDir: "dist",
});
