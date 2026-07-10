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
import { cleanUpAll, gateBroker } from "./helpers";

// ---------------------------------------------------------------------------
// Tests that verify the code examples from README.md actually work
// ---------------------------------------------------------------------------
beforeEach(cleanUpAll);

describe("README.md examples", () => {
  it("Create some entities and query data", async () => {
    interface TemperatureSensor extends schemas.Entity {
      type: "TemperatureSensor";
      temperature: schemas.Property<number>;
    }

    interface HumiditySensor extends schemas.Entity {
      type: "HumiditySensor";
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
    interface TemperatureSensor extends schemas.Entity {
      type: "TemperatureSensor";
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
    interface TemperatureSensor extends schemas.Entity {
      type: "TemperatureSensor";
      temperature: schemas.Property<number>;
    }

    const now = new Date().toISOString();
    const later = new Date(Date.now() + 3600000).toISOString();
    const evenlater = new Date(Date.now() + 7200000).toISOString();

    await upsertTemporal<TemperatureSensor>({
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
    await upsertTemporal<TemperatureSensor>({
      "@context": "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      id: "urn:ngsi-ld:TemperatureSensor:001",
      type: "TemperatureSensor",
      temperature: [
        {
          type: "Property",
          value: 24.0,
          observedAt: later,
        },
        {
          type: "Property",
          value: 25.0,
          observedAt: evenlater,
        },
      ],
    });

    const tempEntities = await queryTemporal<TemperatureSensor>({
      type: "TemperatureSensor",
      timerel: "between",
      timeAt: now,
      endTimeAt: new Date(Date.now() + 7200000).toISOString(),
      lastN: 1, // Number of temporal values to retrieve
      limit: 1, // Number of entities
    });

    expect(tempEntities.length).toBe(1);
    expect(tempEntities[0].id).toBe("urn:ngsi-ld:TemperatureSensor:001");
    expect(tempEntities[0].temperature!.length).toBe(1);
    expect(tempEntities[0].temperature![0].value).toBe(25.0);
  });

  it("Datasetted entity properties", async () => {
    // I think this is overcomplicating things. But spec defines datasets so it
    // is implemented here. I would prefer to simply have two properties with
    // different names, like temperatureA and temperatureB.
    interface TemperatureSensor extends schemas.Entity {
      type: "TemperatureSensor";
      temperature: schemas.Datasetted<
        [
          schemas.WithDatasetId<
            schemas.Property<number>,
            "urn:ngsi-ld:Dataset:SensorA"
          >,
          schemas.WithDatasetId<
            schemas.Property<number>,
            "urn:ngsi-ld:Dataset:SensorB"
          >,
        ]
      >;
    }

    const now = new Date().toISOString();
    const later = new Date(Date.now() + 3600000).toISOString();

    await upsertTemporal<TemperatureSensor>({
      "@context": "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
      id: "urn:ngsi-ld:TemperatureSensor:002",
      type: "TemperatureSensor",
      temperature: [
        {
          type: "Property",
          value: 18.0,
          observedAt: now,
          datasetId: "urn:ngsi-ld:Dataset:SensorA",
        },
        {
          type: "Property",
          value: 20.0,
          observedAt: later,
          datasetId: "urn:ngsi-ld:Dataset:SensorB",
        },
      ],
    });

    const tempEntities = await queryTemporal<TemperatureSensor>({
      id: ["urn:ngsi-ld:TemperatureSensor:002"],
      type: "TemperatureSensor",
      timerel: "between",
      timeAt: now,
      endTimeAt: new Date(Date.now() + 7200000).toISOString(),
      lastN: 1, // Number of temporal values to retrieve (per dataset)
      limit: 1, // Number of entities
    });

    expect(tempEntities.length).toBe(1);
    expect(tempEntities[0].id).toBe("urn:ngsi-ld:TemperatureSensor:002");

    if (gateBroker("scorpio", "lastN per dataset returns different count")) {
      expect(tempEntities[0].temperature!.length).toBe(1);
      return;
    }

    expect(tempEntities[0].temperature!.length).toBe(2);
  });
});
