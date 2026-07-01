# ngsi-ld-sdk

This wrapper hopes to be a Node package for calling NGSI-LD APIs, right now test
cases are ran against Orion-LD and Stellio.

Code is generated from [NGSI-LD OpenAPI
spec](https://forge.etsi.org/rep/cim/ngsi-ld-openapi/-/raw/v1.8.1/openapi-3.0.3/ngsi-ld-api.yaml),
but since it is so lax, the Orval isn't doing particularily good job at it.
There is bunch of hacks in the orval.config.ts to mitigate that.

TypeScript has particular problems with typed parameters intersected with dictionary style values. E.g.

```typescript
{
    type: string
    [k: string]: unknown
}
```

The types generated are almost useless if that is allowed to be in the types. Thus the wrapper does further normalization, given the normalized LD-JSON entry such as:

```json
{
  "@context": [
    "https://smart-data-models.github.io/dataModel.Person/context.jsonld",
    "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context-v1.8.jsonld"
  ],
  "id": "urn:ngsi-ld:Person:John_Lennon",
  "type": "Person",
  "name": { "type": "Property", "value": "John Lennon" },
  "born": { "type": "Property", "value": "1940-10-09" },
  "spouse": {
    "type": "Relationship",
    "object": "urn:ngsi-ld:Person:Cynthia_Lennon"
  }
}
```

This SDK outputs and expects additional properties in its own bag of properties like:

```json
{
  "@context": [
    "https://smart-data-models.github.io/dataModel.Person/context.jsonld",
    "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context-v1.8.jsonld"
  ],
  "id": "urn:ngsi-ld:Person:John_Lennon",
  "type": "Person",
  "properties": {
    "name": { "type": "Property", "value": "John Lennon" },
    "born": { "type": "Property", "value": "1940-10-09" },
    "spouse": {
      "type": "Relationship",
      "object": "urn:ngsi-ld:Person:Cynthia_Lennon"
    }
  }
}
```

This allows the normal properties such as `id`, `type`, `@context` etc to be still typed.
