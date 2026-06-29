import { defineConfig } from "orval";
import { Project, SyntaxKind } from "ts-morph";

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
        // Fix: the NGSI-LD OpenAPI spec defines `options` twice
        // (QueryOptionsTemporalParameter & QueryOptionsSysAttrsParameter)
        // in the same param object. Remove the duplicate and union the types.
        const project = new Project();
        const sourceFile = project.addSourceFileAtPath(
          "./src/generated/api.schemas.ts",
        );

        for (const typeAlias of sourceFile.getTypeAliases()) {
          const typeNode = typeAlias.getTypeNode();
          if (!typeNode || !typeNode.isKind(SyntaxKind.TypeLiteral)) continue;

          const members = typeNode.getProperties();
          // Find first `options` with QueryOptionsTemporalParameter
          const firstIdx = members.findIndex(
            (m) =>
              m.getName() === "options" &&
              m.getTypeNode()?.getText() === "QueryOptionsTemporalParameter",
          );
          // Find duplicate `options` with QueryOptionsSysAttrsParameter
          const dupeIdx = members.findIndex(
            (m) =>
              m.getName() === "options" &&
              m.getTypeNode()?.getText() === "QueryOptionsSysAttrsParameter",
          );

          if (firstIdx !== -1 && dupeIdx !== -1 && dupeIdx > firstIdx) {
            // Union the type on the first options
            const firstProp = members[firstIdx]!;
            const firstType = firstProp.getTypeNode()!;
            firstProp.setType(
              `${firstType.getText()} | QueryOptionsSysAttrsParameter`,
            );

            // Remove the JSDoc of the duplicate property
            const dupeProp = members[dupeIdx]!;
            const jsDocs = dupeProp.getJsDocs();
            jsDocs.forEach((doc) => doc.remove());

            // Remove the duplicate property itself
            dupeProp.remove();
          }
        }

        sourceFile.saveSync();
      },
    },
  },
});
