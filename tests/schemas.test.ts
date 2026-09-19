import { describe, expectTypeOf, it } from "vitest";
import type * as schemas from "../src/schemas";

describe("schemas", () => {
  it("should infer temporal entity type correctly", () => {
    interface TemperatureSensor extends schemas.Entity {
      type: "TemperatureSensor";
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

  it("should default a Relationship to a generic Entity target", () => {
    expectTypeOf<schemas.Relationship>().toEqualTypeOf<
      schemas.Relationship<schemas.Entity>
    >();
  });

  it("should narrow a generic Relationship target fields", () => {
    interface Building extends schemas.Entity {
      type: "Building";
      name: schemas.Property<string>;
    }

    type LocatedAt = schemas.Relationship<Building>;

    // object is an IRI — branding entity ids would make this checkable, but
    // today it resolves to string.
    expectTypeOf<LocatedAt["object"]>().toEqualTypeOf<
      string | string[] | undefined
    >();
    expectTypeOf<LocatedAt["objectType"]>().toEqualTypeOf<
      "Building" | "Building"[] | undefined
    >();
    expectTypeOf<LocatedAt["entity"]>().toEqualTypeOf<
      Building | Building[] | undefined
    >();
  });

  it("should preserve a generic Relationship through temporal inference", () => {
    interface Building extends schemas.Entity {
      type: "Building";
    }
    interface TemperatureSensor extends schemas.Entity {
      type: "TemperatureSensor";
      locatedAt: schemas.Relationship<Building>;
    }
    type TemporalTemperatureSensor =
      schemas.InferEntityTemporal<TemperatureSensor>;

    expectTypeOf<TemporalTemperatureSensor["locatedAt"]>().toEqualTypeOf<
      schemas.RequiredObservedAt<schemas.Relationship<Building>>[]
    >();
  });
});
