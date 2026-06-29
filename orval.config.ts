import { defineConfig } from "orval";
import { Project, SourceFile, SyntaxKind } from "ts-morph";
import { existsSync, readFileSync } from "node:fs";
import { parseDocument } from "yaml";
import { execSync } from "node:child_process";

const SPEC_FILE = "./ngsi-ld-api.yaml";
const SPEC_URL =
  "https://forge.etsi.org/rep/cim/ngsi-ld-openapi/-/raw/v1.8.1/openapi-3.0.3/ngsi-ld-api.yaml";

/**
 * Download the NGSI-LD spec if it doesn't exist locally.
 * Called synchronously at config load time.
 */
function ensureSpec(): void {
  if (!existsSync(SPEC_FILE)) {
    console.log(`Downloading ${SPEC_URL} → ${SPEC_FILE}`);
    execSync(`curl -sL ${SPEC_URL} -o ${SPEC_FILE}`);
  }
}

/**
 * The NGSI-LD OpenAPI spec defines the `options` query parameter twice in
 * the same param object (QueryOptionsTemporalParameter and
 * QueryOptionsSysAttrsParameter). Merge them into a single union type.
 */
function fixDuplicateOptions(sourceFile: SourceFile): void {
  for (const typeAlias of sourceFile.getTypeAliases()) {
    const typeNode = typeAlias.getTypeNode();
    if (!typeNode || !typeNode.isKind(SyntaxKind.TypeLiteral)) continue;

    const members = typeNode.getProperties();
    const firstIdx = members.findIndex(
      (m) =>
        m.getName() === "options" &&
        m.getTypeNode()?.getText() === "QueryOptionsTemporalParameter",
    );
    const dupeIdx = members.findIndex(
      (m) =>
        m.getName() === "options" &&
        m.getTypeNode()?.getText() === "QueryOptionsSysAttrsParameter",
    );

    if (firstIdx !== -1 && dupeIdx !== -1 && dupeIdx > firstIdx) {
      const firstProp = members[firstIdx]!;
      const firstType = firstProp.getTypeNode()!;
      firstProp.setType(
        `${firstType.getText()} | QueryOptionsSysAttrsParameter`,
      );

      const dupeProp = members[dupeIdx]!;
      dupeProp.getJsDocs().forEach((doc) => doc.remove());
      dupeProp.remove();
    }
  }
}

/**
 * Orval inserts `& unknown` into intersection types to work around
 * potential index signature conflicts from schemas that have
 * `additionalProperties`. Since all index signatures in this spec
 * resolve to `[key: string]: unknown`, the extra `& unknown` is
 * redundant and can be safely stripped.
 */
function fixUnknowns(sourceFile: SourceFile): void {
  sourceFile.forEachDescendant((node) => {
    if (!node.isKind(SyntaxKind.IntersectionType)) return;

    const typeNodes = node.getTypeNodes();
    const filtered = typeNodes.filter(
      (t) => t.getText().trim() !== "unknown",
    );

    if (filtered.length > 0 && filtered.length < typeNodes.length) {
      const newText = filtered
        .map((t) => {
          const txt = t.getText();
          // Re-wrap union types to preserve precedence
          return t.isKind(SyntaxKind.UnionType) ? `(${txt})` : txt;
        })
        .join(" & ");
      node.replaceWithText(newText);
    }
  });
}

/**
 * Orval derives response type names from the operationId (e.g.
 * `deleteEntity` → `deleteEntityResponse204`). Uppercase the first
 * character so they follow PascalCase convention.
 */
function fixResponseTypeCasing(apiFile: SourceFile): void {
  const replacements = new Map<string, string>();
  for (const typeAlias of [...apiFile.getTypeAliases()]) {
    const name = typeAlias.getName();
    // Only touch types that are lowercase-first and contain "Response"
    if (name[0] !== name[0]?.toLowerCase()) continue;
    if (!name.includes("Response")) continue;

    const pascal = name[0]!.toUpperCase() + name.slice(1);
    replacements.set(name, pascal);

    // This would be nice, but it is very slow operation in ts-morph:
    //
    // typeAlias.rename(pascal); 
    //
    // Instead we use a Map to track renames and replace all references in the
    // file at once.
  }

  // Replace all references in the file
  let asText = apiFile.getText();
  for (const [oldName, newName] of replacements) {
    const regex = new RegExp(`\\b${oldName}\\b`, "g");
    asText = asText.replace(regex, newName);
  }
  apiFile.replaceWithText(asText);
}

// --- Preprocess the OpenAPI spec in-memory ---

const contentTypeToRemove = "application/json";
const contentTypeToKeep = "application/ld+json";

/** Replace the non-standard ETSI MIME type with the IANA standard one. */
function fixMime(text: string): string {
  return text.replace(/application\/json\+ld/g, "application/ld+json");
}

/**
 * If `obj` has both "application/json" and "application/ld+json" keys,
 * delete the "application/json" entry.
 */
function removeJsonVariant(obj: Record<string, unknown>): boolean {
  if (!Object.hasOwn(obj, contentTypeToRemove)) return false;
  if (!Object.hasOwn(obj, contentTypeToKeep)) return false;
  delete obj[contentTypeToRemove];
  return true;
}

/**
 * Recursively walk a JS value. For every object with both MIME-type
 * keys, remove the plain JSON one.
 */
function walk(obj: unknown): number {
  let removed = 0;
  if (typeof obj !== "object" || obj === null) return 0;

  if (!Array.isArray(obj)) {
    const record = obj as Record<string, unknown>;
    if (removeJsonVariant(record)) removed++;
    for (const value of Object.values(record)) removed += walk(value);
  } else {
    for (const item of obj) removed += walk(item);
  }

  return removed;
}

/**
 * Read the original NGSI-LD OpenAPI spec, normalize MIME types and
 * strip plain-json variants, then return the parsed document object.
 */
function loadAndPreprocessSpec(): Record<string, unknown> {
  ensureSpec();
  const raw = fixMime(readFileSync(SPEC_FILE, "utf-8"));
  const doc = parseDocument(raw);
  const data = doc.toJSON() as Record<string, unknown>;
  walk(data);
  return data;
}

// --- End preprocess ---

/**
 * Inline *200Item types (e.g. QueryEntity200Item) into their base type
 * intersected with JsonLdContext. Deletes the thin wrapper types from
 * the schemas file and replaces all usages in the API file.
 */
function fix200ItemTypes(schemasFile: SourceFile, apiFile: SourceFile): void {
  // Map from *200Item name → base type name (e.g. QueryEntity200Item → Entity)
  const itemToBase: Map<string, string> = new Map();

  // 1. Collect mappings and delete *200Item type aliases from schemas
  for (const typeAlias of [...schemasFile.getTypeAliases()]) {
    const name = typeAlias.getName();
    if (!name.endsWith("200Item")) continue;

    const typeNode = typeAlias.getTypeNode();
    if (typeNode?.isKind(SyntaxKind.IntersectionType)) {
      const firstType = typeNode.getTypeNodes()[0];
      if (firstType) itemToBase.set(name, firstType.getText());
    }
    typeAlias.remove();
  }

  // 2. Add JsonLdContext helper type after LdContext
  const ldContext = schemasFile.getTypeAlias("LdContext");
  if (ldContext) {
    schemasFile.insertText(
      ldContext.getEnd(),
      `\n\n/**\n * Helper: wraps any type with an optional JSON-LD @context.\n */\nexport type JsonLdContext = {\n  '@context'?: LdContext;\n};`,
    );
  }

  // 3. Fix imports in api.ts: remove *200Item, add base types + JsonLdContext
  const importDecl = apiFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "./api.schemas",
  );
  if (importDecl) {
    const baseTypes = new Set(itemToBase.values());
    baseTypes.add("JsonLdContext");

    // Remove *200Item named imports
    for (const itemName of itemToBase.keys()) {
      const ni = importDecl
        .getNamedImports()
        .find((n) => n.getName() === itemName);
      ni?.remove();
    }

    // Add missing base type + JsonLdContext imports
    for (const bt of baseTypes) {
      if (
        !importDecl
          .getNamedImports()
          .some((n) => n.getName() === bt)
      ) {
        importDecl.addNamedImport(bt);
      }
    }
  }

  // 4. Replace all *200Item type references with inline intersections
  for (const [itemName, baseName] of itemToBase) {
    apiFile.forEachDescendant((node, traversal) => {
      if (
        node.getKind() === SyntaxKind.TypeReference &&
        node.getText() === itemName
      ) {
        node.replaceWithText(`(${baseName} & JsonLdContext)`);
        traversal.skip();
      }
    });
  }
}


const SCHEMAS_FILE = "./src/generated/api.schemas.ts";

/**
 * After stripping application/json variants, the remaining types ending
 * in "One", "OneItem", "Two" or "TwoItem" are the only response types.
 * Drop the ordinal so:
 *   QueryEntity200OneItem  → QueryEntity200Item
 *   RetrieveCSR200         → (stays as-is, "Two" already renamed)
 */
function renameTwoTypes(schemasFile: SourceFile, apiFile: SourceFile): void {
  const renames: Map<string, string> = new Map();

  // Collect renames from schemas file (type definitions)
  for (const typeAlias of schemasFile.getTypeAliases()) {
    const name = typeAlias.getName();
    if (name.endsWith("OneItem")) {
      renames.set(name, name.replace(/OneItem$/, "Item"));
    } else if (name.endsWith("TwoItem")) {
      renames.set(name, name.replace(/TwoItem$/, "Item"));
    } else if (name.endsWith("One") && !name.endsWith("OneItem")) {
      renames.set(name, name.replace(/One$/, ""));
    } else if (name.endsWith("Two") && !name.endsWith("TwoItem")) {
      renames.set(name, name.replace(/Two$/, ""));
    }
  }

  // Apply renames in schemas
  for (const [oldName, newName] of renames) {
    const typeAlias = schemasFile.getTypeAlias(oldName);
    if (typeAlias) typeAlias.rename(newName);
  }

  // Apply renames in api file (all references)
  for (const [oldName, newName] of renames) {
    // Replace in type reference strings and export statements
    apiFile.forEachDescendant((node, traversal) => {
      // Replace identifier references
      if (
        node.getText() === oldName
        && (node.getParent()?.getKind() === SyntaxKind.TypeReference
            || node.getKind() === SyntaxKind.Identifier)
      ) {
        node.replaceWithText(newName);
        traversal.skip();
      }
    });
  }
}

export default defineConfig({
  "ngsi-ld": {
    input: {
      target: loadAndPreprocessSpec(),
    },
    output: {
      target: "./src/generated/api.ts",
      client: "fetch",
      mode: "split",
      clean: true,
      formatter: "prettier",
      baseUrl: {
        runtime: "process.env.NGSILD_BROKER_URL",
      },
    },
    hooks: {
      afterAllFilesWrite: () => {
        const project = new Project();
        const schemasFile = project.addSourceFileAtPath(SCHEMAS_FILE);
        const apiFile = project.addSourceFileAtPath(
          "./src/generated/api.ts",
        );

        fixDuplicateOptions(schemasFile);
        fixUnknowns(schemasFile);
        renameTwoTypes(schemasFile, apiFile);
        fix200ItemTypes(schemasFile, apiFile);
        fixResponseTypeCasing(apiFile);

        // Inject a declare shim so the generated code can reference
        // process.env.NGSILD_BROKER_URL without requiring @types/node.
        apiFile.insertText(0, `
/* This files is generated by orval. Do not edit manually. */

declare var process: {
  env: Record<string, string | undefined>;
};
`);

        schemasFile.saveSync();
        apiFile.saveSync();
      },
    },
  },
});
