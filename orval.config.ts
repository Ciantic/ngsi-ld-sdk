import { defineConfig } from "orval";
import { Project, SourceFile, SyntaxKind } from "ts-morph";

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
 * The ETSI spec uses the non-standard "application/json+ld" MIME type,
 * but real NGSI-LD brokers (Orion-LD, Stellio) expect the standard
 * "application/ld+json". Fix Content-Type headers in generated code.
 */
function fixLdJsonContentType(file: SourceFile): void {
  file.forEachDescendant((node) => {
    if (node.getText().includes("application/json+ld")) {
      node.replaceWithText(
        node.getText().replace(/'application\/json\+ld'/g, "'application/ld+json'"),
      );
    }
  });
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
    input: "./ngsi-ld-api.ldonly.yaml",
    output: {
      target: "./src/generated/api.ts",
      client: "fetch",
      mode: "split",
      clean: true,
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
        fixLdJsonContentType(apiFile);
        renameTwoTypes(schemasFile, apiFile);

        schemasFile.saveSync();
        apiFile.saveSync();
      },
    },
  },
});
