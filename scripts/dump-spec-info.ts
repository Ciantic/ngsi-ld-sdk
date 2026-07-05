import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { parse as parseYaml } from "yaml";

const SPEC_PATH = new URL("./ngsi-ld-api.yaml", import.meta.url).pathname;
const SPEC_URL =
  "https://forge.etsi.org/rep/cim/ngsi-ld-openapi/-/raw/v1.8.1/openapi-3.0.3/ngsi-ld-api.yaml";

export async function getOrDownloadSpec(): Promise<Record<string, unknown>> {
  if (!existsSync(SPEC_PATH)) {
    console.log(`Downloading spec from ${SPEC_URL}...`);
    const response = await fetch(SPEC_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to download spec: ${response.status} ${response.statusText}`,
      );
    }

    const content = await response.text();
    await writeFile(SPEC_PATH, content, "utf-8");
    console.log(`Spec saved to ${SPEC_PATH}`);
  } else {
    console.log(`Spec already exists at ${SPEC_PATH}, using cached copy.`);
  }

  const yamlContent = await readFile(SPEC_PATH, "utf-8");
  return parseYaml(yamlContent) as Record<string, unknown>;
}

interface Operation {
  method: string;
  path: string;
  operationId: string;
}

export function getOperations(spec: Record<string, unknown>): Operation[] {
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

  return operations;
}

async function main(): Promise<void> {
  const spec = await getOrDownloadSpec();

  const operations = getOperations(spec);

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

if (import.meta.main) {
  main();
}
