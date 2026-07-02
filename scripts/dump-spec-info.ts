import { readFileSync } from "node:fs";
import { parse as parseYaml } from "yaml";

const SPEC_PATH = new URL("../ngsi-ld-api.yaml", import.meta.url).pathname;

interface Operation {
  method: string;
  path: string;
  operationId: string;
}

function main(): void {
  const yamlContent = readFileSync(SPEC_PATH, "utf-8");
  const spec = parseYaml(yamlContent) as Record<string, unknown>;

  const paths = spec.paths as Record<string, unknown> | undefined;
  if (!paths) {
    console.error("No paths found in spec");
    process.exit(1);
  }

  const operations: Operation[] = [];

  for (const [path, pathItem] of Object.entries(paths)) {
    if (typeof pathItem !== "object" || pathItem == null) continue;
    for (const [method, operation] of Object.entries(
      pathItem as Record<string, unknown>,
    )) {
      const op = operation as Record<string, unknown> | undefined;
      const operationId = op?.operationId;
      if (typeof operationId === "string") {
        operations.push({ method: method.toUpperCase(), path, operationId });
      }
    }
  }

  console.log(`Found ${operations.length} operations:\n`);

  // Determine column widths for aligned output
  const maxMethod = Math.max(...operations.map((o) => o.method.length), 6);
  const maxPath = Math.max(...operations.map((o) => o.path.length), 4);

  for (const { method, path, operationId } of operations) {
    console.log(
      `  ${method.padEnd(maxMethod)}  ${path.padEnd(maxPath)}  ${operationId}`,
    );
  }
}

main();
