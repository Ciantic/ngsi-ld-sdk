import { describe, expectTypeOf, it } from "vitest";
import type { schemas } from "../src";

describe("schemas", () => {
  it("should infer temporal entity type correctly", () => {
    interface TemperatureSensor extends schemas.Entity<"TemperatureSensor"> {
      temperature: schemas.Property<number>;
      zoo: "Yes";
    }
    interface Humidity extends TemperatureSensor {
      humidity?: schemas.Property<number>;
      foo: undefined;
    }
    type TemporalTemperatureSensor = schemas.InferEntityTemporal<Humidity>;

    expectTypeOf<TemporalTemperatureSensor>().toEqualTypeOf<{
      id: string;
      type: "TemperatureSensor";
      scope?: schemas.Scope;
      readonly createdAt?: string;
      readonly modifiedAt?: string;
      readonly deletedAt?: string;
      humidity?: schemas.RequiredObservedAt<schemas.Property<number>>[];
      location?: schemas.RequiredObservedAt<schemas.GeoProperty>[];
      observationSpace?: schemas.RequiredObservedAt<schemas.GeoProperty>[];
      operationSpace?: schemas.RequiredObservedAt<schemas.GeoProperty>[];
      temperature: schemas.RequiredObservedAt<schemas.Property<number>>[];
    }>();
  });

  it("should infer data setted temporal entity type correctly", () => {
    interface TemperatureSensor extends schemas.Entity<"TemperatureSensor"> {
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
    type TemporalTemperatureSensor =
      schemas.InferEntityTemporal<TemperatureSensor>;

    expectTypeOf<TemporalTemperatureSensor>().toEqualTypeOf<{
      id: string;
      type: "TemperatureSensor";
      scope?: schemas.Scope;
      readonly createdAt?: string;
      readonly modifiedAt?: string;
      readonly deletedAt?: string;
      location?: schemas.RequiredObservedAt<schemas.GeoProperty>[];
      observationSpace?: schemas.RequiredObservedAt<schemas.GeoProperty>[];
      operationSpace?: schemas.RequiredObservedAt<schemas.GeoProperty>[];
      temperature: schemas.RequiredObservedAt<
        | schemas.WithDatasetId<
            schemas.Property<number>,
            "urn:ngsi-ld:Dataset:SensorA"
          >
        | schemas.WithDatasetId<
            schemas.Property<number>,
            "urn:ngsi-ld:Dataset:SensorB"
          >
      >[];
    }>();
  });
});
