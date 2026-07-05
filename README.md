# ngsi-ld-sdk

This wrapper hopes to be a Node package for calling NGSI-LD APIs, right now test
cases are ran against Orion-LD and Stellio.

Code was generated with Orval from [NGSI-LD OpenAPI
spec](https://forge.etsi.org/rep/cim/ngsi-ld-openapi/-/raw/v1.8.1/openapi-3.0.3/ngsi-ld-api.yaml),
however generation result was too verbose so I've continued to maintain it without Orval.

## Usage

```typescript
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
```

## Notes

This wrapper intentionally sets the Content-Type and Accept headers to `application/ld+json` for all requests. One exception: `queryBatch` and `temporalQueryBatch` are still using `application/json`, reason being that Stellio didn't support `@context` proeprty in query batch and temporal query batch, but Orion-LD did. Thus the SDK wrapper sets the Content-Type and Accept headers to `application/json` for those two requests.

```

```
