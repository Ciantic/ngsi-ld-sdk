/**
 * Preprocess the NGSI-LD OpenAPI spec for ld+json-only code generation.
 *
 * 1. Renames every occurrence of `application/json+ld` → `application/ld+json`
 *    (the ETSI spec uses a non-standard MIME type; real brokers use the IANA
 *    standard `application/ld+json`).
 *
 * 2. Strips the `application/json` content type from every operation that
 *    also has an `application/ld+json` variant.  Error responses and
 *    endpoints that only have `application/json` (e.g. string arrays in
 *    batch delete responses) are left alone.
 *
 * 3. GeoJSON variants (`application/geo+json`) are preserved.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { parseDocument, stringify } from "yaml";

const INPUT = "./ngsi-ld-api.yaml";
const OUTPUT = "./ngsi-ld-api.ldonly.yaml";

const contentTypeToRemove = "application/json";
const contentTypeToKeep = "application/ld+json";

/** Replace the non-standard ETSI MIME type with the IANA standard one. */
function fixMime(text: string): string {
  // Match both quoted and unquoted YAML forms:
  //   application/json+ld  (bare key)
  //   "application/json+ld" (quoted, in stringify output)
  return text.replace(/application\/json\+ld/g, "application/ld+json");
}

/** If `obj` has both "application/json" and "application/ld+json" keys,
 *  delete the "application/json" entry. */
function removeJsonVariant(obj: Record<string, unknown>): boolean {
  if (!Object.hasOwn(obj, contentTypeToRemove)) return false;
  if (!Object.hasOwn(obj, contentTypeToKeep)) return false;

  delete obj[contentTypeToRemove];
  return true;
}

/** Recursively walk a JS value. For every object with both MIME-type keys,
 *  remove the plain JSON one. Returns count of removed entries. */
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

// --- Main ---
const raw = fixMime(readFileSync(INPUT, "utf-8"));
const doc = parseDocument(raw);

const data = doc.toJSON() as Record<string, unknown>;
const removed = walk(data);

// `yaml.stringify` may re-introduce the unquoted form — apply fixMime again
let output = stringify(data, { lineWidth: 0 });
output = fixMime(output);

writeFileSync(OUTPUT, output, "utf-8");

console.log(`✓ Preprocessed ${INPUT} → ${OUTPUT}`);
console.log(
  `  Removed ${contentTypeToRemove} from ${removed} content entries`,
);
console.log(
  `  MIME type normalized: application/json+ld → application/ld+json`,
);
