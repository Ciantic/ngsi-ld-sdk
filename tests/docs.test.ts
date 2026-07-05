import { schemas, createEntity, queryEntity } from "../src";

import { describe, it, expect, afterAll, beforeEach } from "vitest";
import { cleanUpAll } from "./helpers";

// ---------------------------------------------------------------------------
// Tests that verify the code examples from README.md actually work
// ---------------------------------------------------------------------------
beforeEach(cleanUpAll);

describe("README.md examples", () => {
  it("Create some entities and query data", async () => {
    interface TemperatureSensor extends schemas.Entity<"TemperatureSensor"> {
      temperature: schemas.Property<number>;
    }

    interface HumiditySensor extends schemas.Entity<"HumiditySensor"> {
      humidity: schemas.Property<number>;
    }

    await createEntity<HumiditySensor>({
      "@context": "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      id: "urn:ngsi-ld:HumiditySensor:001",
      type: "HumiditySensor",
      humidity: {
        type: "Property",
        value: 55.0,
      },
    });

    await createEntity<TemperatureSensor>({
      "@context": "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      id: "urn:ngsi-ld:TemperatureSensor:001",
      type: "TemperatureSensor",
      temperature: {
        type: "Property",
        value: 18.0,
      },
    });

    await createEntity<TemperatureSensor>({
      "@context": "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      id: "urn:ngsi-ld:TemperatureSensor:002",
      type: "TemperatureSensor",
      temperature: {
        type: "Property",
        value: 23.5,
      },
    });

    const entities = await queryEntity<TemperatureSensor | HumiditySensor>({
      type: ["TemperatureSensor", "HumiditySensor"],
      attrs: ["temperature", "humidity"],
      q: "temperature>20|humidity>50",
    });

    expect(entities.length).toBe(2);
  });
});
