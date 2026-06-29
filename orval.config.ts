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

const SCHEMAS_FILE = "./src/generated/api.schemas.ts";

export default defineConfig({
  "ngsi-ld": {
    input: "./ngsi-ld-api.yaml",
    output: {
      target: "./src/generated/api.ts",
      client: "fetch",
      mode: "split",
      clean: true,
    },
    hooks: {
      afterAllFilesWrite: () => {
        const project = new Project();
        const sourceFile = project.addSourceFileAtPath(SCHEMAS_FILE);

        fixDuplicateOptions(sourceFile);
        fixUnknowns(sourceFile);

        sourceFile.saveSync();
      },
    },
  },
});
