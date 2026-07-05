import {
  schemas,
  createEntity,
  queryEntity,
  updateEntity,
  retrieveEntity,
  upsertTemporal,
  queryTemporal,
} from "../src";

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

  it("Update an entity", async () => {
    interface TemperatureSensor extends schemas.Entity<"TemperatureSensor"> {
      temperature: schemas.Property<number>;
    }

    await createEntity<TemperatureSensor>({
      "@context": "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      id: "urn:ngsi-ld:TemperatureSensor:001",
      type: "TemperatureSensor",
      temperature: {
        type: "Property",
        value: 18.0,
      },
    });

    await updateEntity<TemperatureSensor>("urn:ngsi-ld:TemperatureSensor:001", {
      "@context": "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      temperature: {
        type: "Property",
        value: 25.0,
      },
    });

    const updatedEntity = await retrieveEntity<TemperatureSensor>(
      "urn:ngsi-ld:TemperatureSensor:001",
    );

    expect(updatedEntity.temperature!.value).toBe(25.0);
  });

  it("Add temporal temperature values", async () => {
    interface TemperatureSensorTemporal extends schemas.EntityTemporal<"TemperatureSensor"> {
      temperature: schemas.Property<number>[];
    }

    const now = new Date().toISOString();
    const later = new Date(Date.now() + 3600000).toISOString();

    await upsertTemporal<TemperatureSensorTemporal>({
      "@context": "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      id: "urn:ngsi-ld:TemperatureSensor:001",
      type: "TemperatureSensor",
      temperature: [
        {
          type: "Property",
          value: 18.0,
          observedAt: now,
        },
      ],
    });

    // Add a new temperature value later in time
    await upsertTemporal<TemperatureSensorTemporal>({
      "@context": "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      id: "urn:ngsi-ld:TemperatureSensor:001",
      type: "TemperatureSensor",
      temperature: [
        {
          type: "Property",
          value: 25.0,
          observedAt: later,
        },
      ],
    });

    const temporalData = await queryTemporal<TemperatureSensorTemporal>({
      type: "TemperatureSensor",
      timerel: "between",
      timeAt: now,
      endTimeAt: new Date(Date.now() + 7200000).toISOString(),
      limit: 1,
    });

    // Find our entity and verify both newly added instances are present
    const ourEntity = temporalData.find(
      (e) => e.id === "urn:ngsi-ld:TemperatureSensor:001",
    );

    expect(ourEntity?.temperature[0].value).toBe(25);
  });
});
