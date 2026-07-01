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
    const filtered = typeNodes.filter((t) => t.getText().trim() !== "unknown");

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
  preprocessedSpec = data;
  return data;
}

// --- End preprocess ---

/** Preprocessed OpenAPI spec, available to hooks after config load. */
let preprocessedSpec: Record<string, unknown> = {};

/**
 * Walk the preprocessed spec and return a map of
 * operationId → required body field names (for "application/ld+json").
 *
 * The NGSI-LD spec layers `required` on top of base schemas via `allOf`:
 *
 * ```
 *    schema:
 *      allOf:
 *        - $ref: '#/components/schemas/Entity'
 *        - required: [id, type, @context]
 * ```
 *
 * Orval ignores standalone `required` in allOf, so we extract it here.
 */
function collectRequiredFromSpec(
  spec: Record<string, unknown>,
): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  const paths = spec.paths as Record<string, unknown> | undefined;
  if (!paths) return result;

  // Helper: resolve a $ref string like "#/components/requestBodies/Subscription"
  function resolveRef(ref: string): Record<string, unknown> | null {
    const parts = ref.replace(/^#\//, "").split("/");
    let node: unknown = spec;
    for (const part of parts) {
      if (typeof node !== "object" || node === null) return null;
      node = (node as Record<string, unknown>)[part];
    }
    return node as Record<string, unknown> | null;
  }

  // Helper: extract required from a schema object
  function extractRequired(
    mediaType: Record<string, unknown>,
  ): string[] | null {
    const schema = mediaType.schema as Record<string, unknown> | undefined;
    if (!schema) return null;

    const allOf = schema.allOf as Record<string, unknown>[] | undefined;
    if (!allOf) return null;

    const last = allOf[allOf.length - 1];
    if (!last || typeof last !== "object") return null;

    const required = last.required as string[] | undefined;
    return required && required.length > 0 ? required : null;
  }

  for (const [, pathItem] of Object.entries(paths)) {
    const operations = pathItem as Record<string, unknown>;
    if (!operations || typeof operations !== "object") continue;

    for (const [method, op] of Object.entries(operations)) {
      if (method !== "post" && method !== "put" && method !== "patch") continue;
      const operation = op as Record<string, unknown>;
      const operationId = operation.operationId as string | undefined;
      if (!operationId) continue;

      let requestBody = operation.requestBody as
        Record<string, unknown> | undefined;
      if (!requestBody) continue;

      // Resolve $ref if present
      if (requestBody.$ref) {
        const resolved = resolveRef(requestBody.$ref as string);
        if (resolved) requestBody = resolved;
      }

      const content = requestBody.content as
        Record<string, unknown> | undefined;
      if (!content) continue;

      // Prefer ld+json, fall back to json
      const mediaType =
        (content["application/ld+json"] as Record<string, unknown>) ??
        (content["application/json"] as Record<string, unknown>);
      if (!mediaType) continue;

      const required = extractRequired(mediaType);
      if (required) result[operationId] = required;
    }
  }

  return result;
}

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
      if (!importDecl.getNamedImports().some((n) => n.getName() === bt)) {
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
        node.getText() === oldName &&
        (node.getParent()?.getKind() === SyntaxKind.TypeReference ||
          node.getKind() === SyntaxKind.Identifier)
      ) {
        node.replaceWithText(newName);
        traversal.skip();
      }
    });
  }
}

/**
 * Convert async API functions into pure descriptor factories using ts-morph.
 *
 *   Before: export const foo = async (...): Promise<XxxResponse> => { ... }
 *   After:  export const foo = (...) => { ... }
 *
 * The return type is inferred from `customInstance<T>(...)` inside the body.
 */
function desyncFunctions(apiFile: SourceFile): void {
  for (const vd of apiFile.getVariableDeclarations()) {
    const init = vd.getInitializer();
    if (!init || init.getKind() !== SyntaxKind.ArrowFunction) continue;
    const arrowFn = init.asKindOrThrow(SyntaxKind.ArrowFunction);
    if (!arrowFn.isAsync()) continue;

    // Remove `async` keyword
    arrowFn.setIsAsync(false);
    // Remove return type, allowing it to be inferred from fetcher
    arrowFn.removeReturnType();
  }
}

/**
 * Some NGSI-LD endpoints require specific fields in the request body
 * (via `allOf` + `required` in the spec), but orval doesn't propagate
 * `required` from `allOf` compositions.  Wrap the relevant body types
 * with a custom `PickRequired` helper so that TypeScript enforces those
 * fields at the call site.
 */
const PICK_REQUIRED_TYPE =
  "// Makes the given keys required in a type (useful when the OpenAPI spec\n" +
  "// layers `required` via allOf, which orval doesn't propagate).\n" +
  "type PickRequired<Type, Key extends keyof Type> = Type &\n" +
  "  Required<Pick<Type, Key>>;\n";

/**
 * Orval doesn't propagate `required` from `allOf` compositions in
 * OpenAPI request bodies.  This function walks the NGSI-LD spec to
 * discover which fields are required for each operationId, then
 * wraps the corresponding TypeScript body parameters with
 * `PickRequired` so TypeScript enforces those fields.
 *
 * See https://github.com/orval-labs/orval/issues/3663
 */
function fixPickRequired(apiFile: SourceFile): void {
  const requiredMap = collectRequiredFromSpec(preprocessedSpec);

  // 1. Inject PickRequired after the NonReadonly helper block
  let text = apiFile.getText();
  const nonReadonlyEnd = text.indexOf("type NonReadonly");
  if (nonReadonlyEnd === -1) return;
  const afterBlock = text.indexOf("\nexport type", nonReadonlyEnd);
  if (afterBlock === -1) return;

  text =
    text.slice(0, afterBlock) +
    "\n\n" +
    PICK_REQUIRED_TYPE +
    text.slice(afterBlock);
  apiFile.replaceWithText(text);

  // 2. Apply PickRequired to the body parameter of each function.
  //    Body parameters are named `*Body` or `*BodyItem`.
  for (const vd of apiFile.getVariableDeclarations()) {
    const fnName = vd.getName();
    const required = requiredMap[fnName];
    if (!required || required.length === 0) continue;

    const arrowFn = vd.getInitializerIfKind(SyntaxKind.ArrowFunction);
    if (!arrowFn) continue;

    const bodyParam = arrowFn
      .getParameters()
      .find(
        (p) => p.getName().endsWith("Body") || p.getName().endsWith("BodyItem"),
      );
    if (!bodyParam) continue;

    const typeText = bodyParam.getTypeNode()!.getText();
    const keys = required.map((k) => `"${k}"`).join(" | ");
    bodyParam.setType(`PickRequired<${typeText}, ${keys}>`);
  }
}

/**
 * The NGSI-LD spec defines `additionalProperties` on Entity, EntityTemporal,
 * FeatureProperties, and all attribute types (Property, GeoProperty,
 * LanguageProperty, VocabProperty, JsonProperty, ListProperty, Relationship,
 * ListRelationship) as a oneOf of all NGSI-LD attribute types (each as
 * single or array). Orval can't resolve oneOf inside additionalProperties
 * and emits `[key: string]: unknown` instead.
 *
 * This function defines a `NgsildAttribute` union type and moves dynamic
 * NGSI-LD attributes into a `properties` sub-object so that named
 * properties (like `id?: string`) don't need to be assignable to the
 * index signature type.
 */
function fixIndexSignatures(schemasFile: SourceFile): void {
  const NGSILD_ATTR_TYPES = `
/**
 * NGSI-LD attribute types valid in normalized non-temporal
 * representations (Entity, FeatureProperties, and attribute types).
 * Each dynamic key maps to exactly one attribute instance.
 *
 * Derived from the oneOf in the OpenAPI spec's additionalProperties.
 */
export type NgsildAttribute =
  | Property
  | GeoProperty
  | LanguageProperty
  | VocabProperty
  | JsonProperty
  | ListProperty
  | Relationship
  | ListRelationship;

/**
 * NGSI-LD attribute types valid in normalized temporal representations
 * (EntityTemporal).  Temporal entities have arrays of attribute instances
 * keyed by observedAt.
 */
export type NgsildAttributeTemporal = NgsildAttribute | NgsildAttribute[];`;

  /** Interfaces and which attribute type they use. */
  const INTERFACES_WITH_ATTRIBUTES: Record<string, string> = {
    Entity: "NgsildAttribute",
    EntityTemporal: "NgsildAttributeTemporal",
    FeatureProperties: "NgsildAttribute",
    Property: "NgsildAttribute",
    GeoProperty: "NgsildAttribute",
    LanguageProperty: "NgsildAttribute",
    VocabProperty: "NgsildAttribute",
    JsonProperty: "NgsildAttribute",
    ListProperty: "NgsildAttribute",
    Relationship: "NgsildAttribute",
    ListRelationship: "NgsildAttribute",
  };

  // 1. Append NgsildAttribute + NgsildAttributeTemporal types at the end
  schemasFile.insertText(schemasFile.getEnd(), NGSILD_ATTR_TYPES);

  // 2. Add a `properties` sub-object to interfaces with index signatures.
  //    Dynamic NGSI-LD attributes (temperature, speed, etc.) are moved
  //    into `properties: { [key: string]: NgsildAttribute }` so they don't
  //    pollute the top-level type with an index signature.
  //    The fetcher handles `fromApi` (wire → SDK) and `toApi` (SDK → wire)
  //    transformations.
  for (const iface of schemasFile.getInterfaces()) {
    const attrType = INTERFACES_WITH_ATTRIBUTES[iface.getName()];
    if (!attrType) continue;

    // Remove index signature(s) like [key: string]: unknown
    for (const sig of iface.getIndexSignatures()) {
      sig.remove();
    }

    // Add a `properties` member for dynamic NGSI-LD attributes
    iface.addProperty({
      name: "properties",
      type: `{ [key: string]: ${attrType} }`,
      hasQuestionToken: true,
      docs: [
        {
          description:
            "Dynamic NGSI-LD attributes (Properties, Relationships, etc.).",
        },
      ],
    });
  }
}

/**
 * The NGSI-LD spec marks `type` as optional on attribute type aliases
 * (Property, GeoProperty, Relationship, etc.) because it is defined
 * in a base schema with `additionalProperties`.  Make it required so
 * TypeScript enforces that every NGSI-LD attribute carries a `type`
 * discriminator.
 */
function fixProperties(schemasFile: SourceFile): void {
  const targetTypeAliases = new Set([
    "GeoProperty",
    "LanguageProperty",
    "Property",
    "Relationship",
    "VocabProperty",
    "ListProperty",
    "ListRelationship",
    "JsonProperty",
  ]);

  let fixCount = 0;
  for (const typeAlias of schemasFile.getTypeAliases()) {
    if (!targetTypeAliases.has(typeAlias.getName())) continue;

    const typeNode = typeAlias.getTypeNode();
    if (!typeNode) continue;
    if (!typeNode.isKind(SyntaxKind.TypeLiteral)) continue;

    const typeLiteral = typeNode.asKindOrThrow(SyntaxKind.TypeLiteral);
    const typeProp = typeLiteral.getProperty("type");

    if (typeProp?.hasQuestionToken()) {
      typeProp.setHasQuestionToken(false);
      fixCount++;
    }
  }
}

/**
 * Orval emits `AnyValue` as an empty interface (`export interface AnyValue {}`)
 * which is effectively `{}` — too loose. Replace it with a proper recursive
 * `JsonValue` type matching IETF RFC 8259.
 */
function fixAnyValue(schemasFile: SourceFile): void {
  const anyValue = schemasFile.getInterface("AnyValue");
  if (!anyValue) return;

  anyValue.replaceWithText(
    "/**\n" +
      " * Any JSON value as defined by IETF RFC 8259.\n" +
      " */\n" +
      "export type JsonValue =\n" +
      "  | string\n" +
      "  | number\n" +
      "  | boolean\n" +
      "  | null\n" +
      "  | JsonValue[]\n" +
      "  | { [key: string]: JsonValue };",
  );

  // Replace remaining AnyValue references with JsonValue
  schemasFile.forEachDescendant((node, traversal) => {
    if (
      node.getKind() === SyntaxKind.TypeReference &&
      node.getText() === "AnyValue"
    ) {
      node.replaceWithText("JsonValue");
      traversal.skip();
    }
  });
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
      override: {
        mutator: {
          path: "./src/fetcher.ts",
          name: "fetcher",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: () => {
        const project = new Project();
        const schemasFile = project.addSourceFileAtPath(SCHEMAS_FILE);
        const apiFile = project.addSourceFileAtPath("./src/generated/api.ts");

        fixDuplicateOptions(schemasFile);
        fixUnknowns(schemasFile);
        fixAnyValue(schemasFile);
        fixIndexSignatures(schemasFile);
        fixProperties(schemasFile);
        renameTwoTypes(schemasFile, apiFile);
        fix200ItemTypes(schemasFile, apiFile);
        fixResponseTypeCasing(apiFile);
        desyncFunctions(apiFile);
        fixPickRequired(apiFile);

        // Inject a declare shim so the generated code can reference
        // process.env.NGSILD_BROKER_URL without requiring @types/node.
        apiFile.insertText(
          0,
          `/* This files is generated by orval. Do not edit manually. */\n\n`,
        );

        schemasFile.saveSync();
        apiFile.saveSync();
      },
    },
  },
});
