import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    maxConcurrency: 1,
    maxWorkers: 1,
    setupFiles: ["./tests/setup.ts"],
    typecheck: {
      enabled: true,
    },
  },
});
