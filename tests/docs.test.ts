import { schemas, createEntity } from "../src";

import { describe, it, expect, afterAll, beforeEach } from "vitest";
import { cleanUpAll, NGSILD_CORE_CONTEXT } from "./helpers";

// ---------------------------------------------------------------------------
// Tests that verify the code examples from README.md actually work
// ---------------------------------------------------------------------------
beforeEach(cleanUpAll);

describe("README examples", () => {
  it("createEntity example should work", async () => {
    interface TemperatureSensor extends schemas.Entity<"TemperatureSensor"> {
      temperature: schemas.Property;
    }

    await createEntity<TemperatureSensor>({
      "@context": "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      id: "urn:ngsi-ld:TemperatureSensor:001",
      type: "TemperatureSensor",
      temperature: {
        type: "Property",
        value: 23.5,
      },
    });
  });
});
