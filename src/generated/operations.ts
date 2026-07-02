import type {
  AppendAttrsBody,
  AppendAttrsParams,
  AppendAttrsTemporalParams,
  AttributeFragmentBody,
  BadRequestResponse,
  ConflictResponse,
  CreateBatchBodyItem,
  CreateBatchParams,
  CreateCSRBody,
  CreateContextBody,
  CreateEntityBody,
  CreateEntityParams,
  CreateSubscriptionParams,
  DeleteAttrInstanceTemporalParams,
  DeleteAttrsParams,
  DeleteAttrsTemporalParams,
  DeleteBatchParams,
  DeleteContextParams,
  DeleteEntityParams,
  DeleteSubscriptionParams,
  DeleteTemporalParams,
  EntityTemporalBody,
  EntityTemporalFragmentBody,
  Feature,
  FeatureCollection,
  GatewayTimeoutResponse,
  LdContextMetadata,
  ListContextsParams,
  MergeBatchBodyItem,
  MergeBatchParams,
  MergeEntityBody,
  MergeEntityParams,
  MultiStatusBatchOperationResultResponse,
  MultiStatusUpdateResultResponse,
  NotFoundResponse,
  NotImplementedResponse,
  Query,
  QueryBatchParams,
  QueryCSRParams,
  QueryCSRSubscriptionParams,
  QueryEntityParams,
  QuerySubscriptionParams,
  QueryTemporalBody,
  QueryTemporalParams,
  ReplaceAttrsParams,
  ReplaceEntityBody,
  ReplaceEntityParams,
  RetrieveAttrTypeInfo200,
  RetrieveAttrTypeInfoParams,
  RetrieveAttrTypes200,
  RetrieveAttrTypesParams,
  RetrieveCSIdentityInfo200,
  RetrieveCSR200,
  RetrieveCSRParams,
  RetrieveCSRSubscription200,
  RetrieveCSRSubscriptionParams,
  RetrieveContext200,
  RetrieveContextParams,
  RetrieveEntity200,
  RetrieveEntityMap200,
  RetrieveEntityParams,
  RetrieveEntityTypeInfo200,
  RetrieveEntityTypeInfoParams,
  RetrieveEntityTypes200,
  RetrieveEntityTypesParams,
  RetrieveSubscription200,
  RetrieveSubscriptionParams,
  RetrieveTemporal200,
  RetrieveTemporalParams,
  SubscriptionBody,
  SubscriptionFragmentBody,
  TemporalQueryBatchParams,
  UnprocessableResponse,
  UpdateAttrsParams,
  UpdateAttrsTemporalParams,
  UpdateBatchBodyItem,
  UpdateBatchParams,
  UpdateCSRBody,
  UpdateEntityBody,
  UpdateEntityMapBody,
  UpdateEntityParams,
  UpdateSubscriptionParams,
  UpsertBatchBodyItem,
  UpsertBatchParams,
  UpsertTemporalParams,
  Entity,
  CsourceRegistration,
  Subscription,
  EntityTemporal,
  JsonLdContext,
} from "./schemas";

import {
  AppendAttrsResponse,
  AppendAttrsResponse204,
  AppendAttrsResponse207,
  AppendAttrsResponse400,
  AppendAttrsResponse404,
  AppendAttrsResponseError,
  AppendAttrsResponseSuccess,
  AppendAttrsTemporalResponse,
  AppendAttrsTemporalResponse204,
  AppendAttrsTemporalResponse400,
  AppendAttrsTemporalResponse404,
  AppendAttrsTemporalResponseError,
  AppendAttrsTemporalResponseSuccess,
  CreateBatchResponse,
  CreateBatchResponse201,
  CreateBatchResponse207,
  CreateBatchResponse400,
  CreateBatchResponseError,
  CreateBatchResponseSuccess,
  CreateCSRResponse,
  CreateCSRResponse201,
  CreateCSRResponse400,
  CreateCSRResponse409,
  CreateCSRResponse422,
  CreateCSRResponseError,
  CreateCSRResponseSuccess,
  CreateCSRSubscriptionResponse,
  CreateCSRSubscriptionResponse201,
  CreateCSRSubscriptionResponse400,
  CreateCSRSubscriptionResponse409,
  CreateCSRSubscriptionResponseError,
  CreateCSRSubscriptionResponseSuccess,
  CreateContextResponse,
  CreateContextResponse201,
  CreateContextResponse400,
  CreateContextResponseError,
  CreateContextResponseSuccess,
  CreateEntityResponse,
  CreateEntityResponse201,
  CreateEntityResponse207,
  CreateEntityResponse400,
  CreateEntityResponse409,
  CreateEntityResponse422,
  CreateEntityResponseError,
  CreateEntityResponseSuccess,
  CreateSubscriptionResponse,
  CreateSubscriptionResponse201,
  CreateSubscriptionResponse400,
  CreateSubscriptionResponse409,
  CreateSubscriptionResponseError,
  CreateSubscriptionResponseSuccess,
  DeleteAttrInstanceTemporalResponse,
  DeleteAttrInstanceTemporalResponse204,
  DeleteAttrInstanceTemporalResponse400,
  DeleteAttrInstanceTemporalResponse404,
  DeleteAttrInstanceTemporalResponseError,
  DeleteAttrInstanceTemporalResponseSuccess,
  DeleteAttrsResponse,
  DeleteAttrsResponse204,
  DeleteAttrsResponse207,
  DeleteAttrsResponse400,
  DeleteAttrsResponse404,
  DeleteAttrsResponseError,
  DeleteAttrsResponseSuccess,
  DeleteAttrsTemporalResponse,
  DeleteAttrsTemporalResponse204,
  DeleteAttrsTemporalResponse400,
  DeleteAttrsTemporalResponse404,
  DeleteAttrsTemporalResponseError,
  DeleteAttrsTemporalResponseSuccess,
  DeleteBatchResponse,
  DeleteBatchResponse204,
  DeleteBatchResponse207,
  DeleteBatchResponse400,
  DeleteBatchResponseError,
  DeleteBatchResponseSuccess,
  DeleteCSRResponse,
  DeleteCSRResponse204,
  DeleteCSRResponse400,
  DeleteCSRResponse404,
  DeleteCSRResponseError,
  DeleteCSRResponseSuccess,
  DeleteCSRSubscriptionResponse,
  DeleteCSRSubscriptionResponse204,
  DeleteCSRSubscriptionResponse400,
  DeleteCSRSubscriptionResponse404,
  DeleteCSRSubscriptionResponseError,
  DeleteCSRSubscriptionResponseSuccess,
  DeleteContextResponse,
  DeleteContextResponse204,
  DeleteContextResponse400,
  DeleteContextResponse404,
  DeleteContextResponse504,
  DeleteContextResponseError,
  DeleteContextResponseSuccess,
  DeleteEntityMapResponse,
  DeleteEntityMapResponse204,
  DeleteEntityMapResponse400,
  DeleteEntityMapResponse404,
  DeleteEntityMapResponseError,
  DeleteEntityMapResponseSuccess,
  DeleteEntityResponse,
  DeleteEntityResponse204,
  DeleteEntityResponse207,
  DeleteEntityResponse400,
  DeleteEntityResponse404,
  DeleteEntityResponseError,
  DeleteEntityResponseSuccess,
  DeleteSubscriptionResponse,
  DeleteSubscriptionResponse204,
  DeleteSubscriptionResponse400,
  DeleteSubscriptionResponse404,
  DeleteSubscriptionResponseError,
  DeleteSubscriptionResponseSuccess,
  DeleteTemporalResponse,
  DeleteTemporalResponse204,
  DeleteTemporalResponse400,
  DeleteTemporalResponse404,
  DeleteTemporalResponseError,
  DeleteTemporalResponseSuccess,
  DistributeReadOnlyOverUnions,
  IfEquals,
  ListContextsResponse,
  ListContextsResponse200,
  ListContextsResponse400,
  ListContextsResponseError,
  ListContextsResponseSuccess,
  MergeBatchResponse,
  MergeBatchResponse204,
  MergeBatchResponse207,
  MergeBatchResponse400,
  MergeBatchResponseError,
  MergeBatchResponseSuccess,
  MergeEntityResponse,
  MergeEntityResponse204,
  MergeEntityResponse207,
  MergeEntityResponse400,
  MergeEntityResponse404,
  MergeEntityResponseError,
  MergeEntityResponseSuccess,
  NonReadonly,
  PickRequired,
  QueryBatchResponse,
  QueryBatchResponse200ApplicationGeoJson,
  QueryBatchResponse200ApplicationLdJson,
  QueryBatchResponse400,
  QueryBatchResponseError,
  QueryBatchResponseSuccess,
  QueryCSRResponse,
  QueryCSRResponse200,
  QueryCSRResponse400,
  QueryCSRResponseError,
  QueryCSRResponseSuccess,
  QueryCSRSubscriptionResponse,
  QueryCSRSubscriptionResponse200,
  QueryCSRSubscriptionResponse400,
  QueryCSRSubscriptionResponseError,
  QueryCSRSubscriptionResponseSuccess,
  QueryEntityResponse,
  QueryEntityResponse200ApplicationGeoJson,
  QueryEntityResponse200ApplicationLdJson,
  QueryEntityResponse400,
  QueryEntityResponse501,
  QueryEntityResponseError,
  QueryEntityResponseSuccess,
  QuerySubscriptionResponse,
  QuerySubscriptionResponse200,
  QuerySubscriptionResponse400,
  QuerySubscriptionResponseError,
  QuerySubscriptionResponseSuccess,
  QueryTemporalResponse,
  QueryTemporalResponse200,
  QueryTemporalResponse400,
  QueryTemporalResponseError,
  QueryTemporalResponseSuccess,
  ReplaceAttrsResponse,
  ReplaceAttrsResponse204,
  ReplaceAttrsResponse207,
  ReplaceAttrsResponse400,
  ReplaceAttrsResponse404,
  ReplaceAttrsResponseError,
  ReplaceAttrsResponseSuccess,
  ReplaceEntityResponse,
  ReplaceEntityResponse204,
  ReplaceEntityResponse207,
  ReplaceEntityResponse400,
  ReplaceEntityResponse404,
  ReplaceEntityResponseError,
  ReplaceEntityResponseSuccess,
  RetrieveAttrTypeInfoResponse,
  RetrieveAttrTypeInfoResponse200,
  RetrieveAttrTypeInfoResponse400,
  RetrieveAttrTypeInfoResponse404,
  RetrieveAttrTypeInfoResponseError,
  RetrieveAttrTypeInfoResponseSuccess,
  RetrieveAttrTypesResponse,
  RetrieveAttrTypesResponse200,
  RetrieveAttrTypesResponse400,
  RetrieveAttrTypesResponseError,
  RetrieveAttrTypesResponseSuccess,
  RetrieveCSIdentityInfoResponse,
  RetrieveCSIdentityInfoResponse200,
  RetrieveCSIdentityInfoResponse501,
  RetrieveCSIdentityInfoResponseError,
  RetrieveCSIdentityInfoResponseSuccess,
  RetrieveCSRResponse,
  RetrieveCSRResponse200,
  RetrieveCSRResponse400,
  RetrieveCSRResponse404,
  RetrieveCSRResponseError,
  RetrieveCSRResponseSuccess,
  RetrieveCSRSubscriptionResponse,
  RetrieveCSRSubscriptionResponse200,
  RetrieveCSRSubscriptionResponse400,
  RetrieveCSRSubscriptionResponse404,
  RetrieveCSRSubscriptionResponseError,
  RetrieveCSRSubscriptionResponseSuccess,
  RetrieveContextResponse,
  RetrieveContextResponse200,
  RetrieveContextResponse400,
  RetrieveContextResponse404,
  RetrieveContextResponse422,
  RetrieveContextResponseError,
  RetrieveContextResponseSuccess,
  RetrieveEntityMapResponse,
  RetrieveEntityMapResponse200,
  RetrieveEntityMapResponse400,
  RetrieveEntityMapResponse404,
  RetrieveEntityMapResponseError,
  RetrieveEntityMapResponseSuccess,
  RetrieveEntityResponse,
  RetrieveEntityResponse200ApplicationGeoJson,
  RetrieveEntityResponse200ApplicationLdJson,
  RetrieveEntityResponse400,
  RetrieveEntityResponse404,
  RetrieveEntityResponse501,
  RetrieveEntityResponseError,
  RetrieveEntityResponseSuccess,
  RetrieveEntityTypeInfoResponse,
  RetrieveEntityTypeInfoResponse200,
  RetrieveEntityTypeInfoResponse400,
  RetrieveEntityTypeInfoResponse404,
  RetrieveEntityTypeInfoResponseError,
  RetrieveEntityTypeInfoResponseSuccess,
  RetrieveEntityTypesResponse,
  RetrieveEntityTypesResponse200,
  RetrieveEntityTypesResponse400,
  RetrieveEntityTypesResponseError,
  RetrieveEntityTypesResponseSuccess,
  RetrieveSubscriptionResponse,
  RetrieveSubscriptionResponse200,
  RetrieveSubscriptionResponse400,
  RetrieveSubscriptionResponse404,
  RetrieveSubscriptionResponseError,
  RetrieveSubscriptionResponseSuccess,
  RetrieveTemporalResponse,
  RetrieveTemporalResponse200,
  RetrieveTemporalResponse400,
  RetrieveTemporalResponse404,
  RetrieveTemporalResponseError,
  RetrieveTemporalResponseSuccess,
  TemporalQueryBatchResponse,
  TemporalQueryBatchResponse200,
  TemporalQueryBatchResponse400,
  TemporalQueryBatchResponseError,
  TemporalQueryBatchResponseSuccess,
  UnionToIntersection,
  UpdateAttrsResponse,
  UpdateAttrsResponse204,
  UpdateAttrsResponse207,
  UpdateAttrsResponse400,
  UpdateAttrsResponse404,
  UpdateAttrsResponseError,
  UpdateAttrsResponseSuccess,
  UpdateAttrsTemporalResponse,
  UpdateAttrsTemporalResponse204,
  UpdateAttrsTemporalResponse400,
  UpdateAttrsTemporalResponse404,
  UpdateAttrsTemporalResponseError,
  UpdateAttrsTemporalResponseSuccess,
  UpdateBatchResponse,
  UpdateBatchResponse204,
  UpdateBatchResponse207,
  UpdateBatchResponse400,
  UpdateBatchResponseError,
  UpdateBatchResponseSuccess,
  UpdateCSRResponse,
  UpdateCSRResponse204,
  UpdateCSRResponse400,
  UpdateCSRResponse404,
  UpdateCSRResponseError,
  UpdateCSRResponseSuccess,
  UpdateCSRSubscriptionResponse,
  UpdateCSRSubscriptionResponse204,
  UpdateCSRSubscriptionResponse400,
  UpdateCSRSubscriptionResponse404,
  UpdateCSRSubscriptionResponseError,
  UpdateCSRSubscriptionResponseSuccess,
  UpdateEntityMapResponse,
  UpdateEntityMapResponse204,
  UpdateEntityMapResponse400,
  UpdateEntityMapResponse404,
  UpdateEntityMapResponseError,
  UpdateEntityMapResponseSuccess,
  UpdateEntityResponse,
  UpdateEntityResponse204,
  UpdateEntityResponse207,
  UpdateEntityResponse400,
  UpdateEntityResponse404,
  UpdateEntityResponseError,
  UpdateEntityResponseSuccess,
  UpdateSubscriptionResponse,
  UpdateSubscriptionResponse204,
  UpdateSubscriptionResponse400,
  UpdateSubscriptionResponse404,
  UpdateSubscriptionResponseError,
  UpdateSubscriptionResponseSuccess,
  UpsertBatchResponse,
  UpsertBatchResponse201,
  UpsertBatchResponse204,
  UpsertBatchResponse207,
  UpsertBatchResponse400,
  UpsertBatchResponseError,
  UpsertBatchResponseSuccess,
  UpsertTemporalResponse,
  UpsertTemporalResponse201,
  UpsertTemporalResponse204,
  UpsertTemporalResponse400,
  UpsertTemporalResponse422,
  UpsertTemporalResponseError,
  UpsertTemporalResponseSuccess,
  Writable,
  WritableKeys,
} from "./types.ts";

import { fetcher } from "../fetcher";

export const getCreateEntityUrl = (params?: CreateEntityParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities?${stringifiedParams}`
    : `/entities`;
};

/**
 * 5.6.1 Create Entity
 *
 * This operation allows creating a new NGSI-LD Entity.
 * @summary Entity creation

 */
/**
 * 5.6.1 Create Entity
 *
 * This operation allows creating a new NGSI-LD Entity.
 * @summary Entity creation

 */
export const createEntity = (
  createEntityBody?: PickRequired<
    NonReadonly<CreateEntityBody>,
    "id" | "type" | "@context"
  >,
  params?: CreateEntityParams,
  options?: RequestInit,
) => {
  return fetcher<CreateEntityResponse>(getCreateEntityUrl(params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(createEntityBody),
  });
};

export const getQueryEntityUrl = (params?: QueryEntityParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ["coordinates", "datasetId"];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? "null" : String(v));
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities?${stringifiedParams}`
    : `/entities`;
};

/**
 * 5.7.2 Query Entities (excluding batch entity queries).
 *
 * This operation allows querying an NGSI-LD system.
 * @summary Query entities

 */
/**
 * 5.7.2 Query Entities (excluding batch entity queries).
 *
 * This operation allows querying an NGSI-LD system.
 * @summary Query entities

 */
export const queryEntity = (
  params?: QueryEntityParams,
  options?: RequestInit,
) => {
  return fetcher<QueryEntityResponse>(getQueryEntityUrl(params), {
    ...options,
    method: "GET",
  });
};

export const getRetrieveEntityUrl = (
  entityId: string,
  params?: RetrieveEntityParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ["datasetId"];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? "null" : String(v));
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${entityId}?${stringifiedParams}`
    : `/entities/${entityId}`;
};

/**
 * 5.7.1 Retrieve Entity.
 *
 * This operation allows retrieving an NGSI-LD Entity.
 * @summary Entity retrieval by id

 */
/**
 * 5.7.1 Retrieve Entity.
 *
 * This operation allows retrieving an NGSI-LD Entity.
 * @summary Entity retrieval by id

 */
export const retrieveEntity = (
  entityId: string,
  params?: RetrieveEntityParams,
  options?: RequestInit,
) => {
  return fetcher<RetrieveEntityResponse>(
    getRetrieveEntityUrl(entityId, params),
    {
      ...options,
      method: "GET",
    },
  );
};

export const getDeleteEntityUrl = (
  entityId: string,
  params?: DeleteEntityParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${entityId}?${stringifiedParams}`
    : `/entities/${entityId}`;
};

/**
 * 5.6.6 Delete entity.
 *
 * This operation allows deleting an NGSI-LD Entity.
 * @summary Entity deletion by id

 */
/**
 * 5.6.6 Delete entity.
 *
 * This operation allows deleting an NGSI-LD Entity.
 * @summary Entity deletion by id

 */
export const deleteEntity = (
  entityId: string,
  params?: DeleteEntityParams,
  options?: RequestInit,
) => {
  return fetcher<DeleteEntityResponse>(getDeleteEntityUrl(entityId, params), {
    ...options,
    method: "DELETE",
  });
};

export const getMergeEntityUrl = (
  entityId: string,
  params?: MergeEntityParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${entityId}?${stringifiedParams}`
    : `/entities/${entityId}`;
};

/**
 * 5.6.17 Merge Entity.
 *
 * This operation allows modification of an existing NGSI-LD Entity aligning to the JSON Merge Patch
 * processing rules defined in IETF RFC 7396 by adding new Attributes (Properties or Relationships)
 * or modifying or deleting existing Attributes associated with an existing Entity.
 * @summary Entity merge by id

 */
/**
 * 5.6.17 Merge Entity.
 *
 * This operation allows modification of an existing NGSI-LD Entity aligning to the JSON Merge Patch
 * processing rules defined in IETF RFC 7396 by adding new Attributes (Properties or Relationships)
 * or modifying or deleting existing Attributes associated with an existing Entity.
 * @summary Entity merge by id

 */
export const mergeEntity = (
  entityId: string,
  mergeEntityBody?: PickRequired<NonReadonly<MergeEntityBody>, "@context">,
  params?: MergeEntityParams,
  options?: RequestInit,
) => {
  return fetcher<MergeEntityResponse>(getMergeEntityUrl(entityId, params), {
    ...options,
    method: "PATCH",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(mergeEntityBody),
  });
};

export const getReplaceEntityUrl = (
  entityId: string,
  params?: ReplaceEntityParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${entityId}?${stringifiedParams}`
    : `/entities/${entityId}`;
};

/**
 * 5.6.18 Replace Entity.
 *
 * This operation allows the modification of an existing NGSI-LD Entity
 * by replacing all of the Attributes (Properties or Relationships).
 * @summary Entity replacement by id

 */
/**
 * 5.6.18 Replace Entity.
 *
 * This operation allows the modification of an existing NGSI-LD Entity
 * by replacing all of the Attributes (Properties or Relationships).
 * @summary Entity replacement by id

 */
export const replaceEntity = (
  entityId: string,
  replaceEntityBody?: PickRequired<NonReadonly<ReplaceEntityBody>, "@context">,
  params?: ReplaceEntityParams,
  options?: RequestInit,
) => {
  return fetcher<ReplaceEntityResponse>(getReplaceEntityUrl(entityId, params), {
    ...options,
    method: "PUT",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(replaceEntityBody),
  });
};

export const getAppendAttrsUrl = (
  entityId: string,
  params?: AppendAttrsParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${entityId}/attrs?${stringifiedParams}`
    : `/entities/${entityId}/attrs`;
};

/**
 * 5.6.3 Append Entity Attributes.
 *
 * This operation allows modifying an NGSI-LD Entity by adding
 * new attributes (Properties or Relationships).
 * @summary Append Attributes to Entity

 */
/**
 * 5.6.3 Append Entity Attributes.
 *
 * This operation allows modifying an NGSI-LD Entity by adding
 * new attributes (Properties or Relationships).
 * @summary Append Attributes to Entity

 */
export const appendAttrs = (
  entityId: string,
  appendAttrsBody?: PickRequired<NonReadonly<AppendAttrsBody>, "@context">,
  params?: AppendAttrsParams,
  options?: RequestInit,
) => {
  return fetcher<AppendAttrsResponse>(getAppendAttrsUrl(entityId, params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(appendAttrsBody),
  });
};

export const getUpdateEntityUrl = (
  entityId: string,
  params?: UpdateEntityParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${entityId}/attrs?${stringifiedParams}`
    : `/entities/${entityId}/attrs`;
};

/**
 * 5.6.2 Update Entity Attributes.
 *
 * This operation allows modifying an existing NGSI-LD Entity by updating
 * already existing Attributes (Properties or Relationships).
 * @summary Update Attributes of an Entity

 */
/**
 * 5.6.2 Update Entity Attributes.
 *
 * This operation allows modifying an existing NGSI-LD Entity by updating
 * already existing Attributes (Properties or Relationships).
 * @summary Update Attributes of an Entity

 */
export const updateEntity = (
  entityId: string,
  updateEntityBody?: PickRequired<NonReadonly<UpdateEntityBody>, "@context">,
  params?: UpdateEntityParams,
  options?: RequestInit,
) => {
  return fetcher<UpdateEntityResponse>(getUpdateEntityUrl(entityId, params), {
    ...options,
    method: "PATCH",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(updateEntityBody),
  });
};

export const getUpdateAttrsUrl = (
  entityId: string,
  attrId: string,
  params?: UpdateAttrsParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${entityId}/attrs/${attrId}?${stringifiedParams}`
    : `/entities/${entityId}/attrs/${attrId}`;
};

/**
 * 5.6.4 Partial Attribute Update.
 *
 * This operation allows performing a partial update on an NGSI-LD Entity's Attribute (Property or Relationship).
 * A partial update only changes the elements provided in an Entity Fragment, leaving the rest as they are.
 * This operation supports the deletion of sub-Attributes but not the deletion of the whole Attribute itself.
 * @summary Partial Attribute Update

 */
/**
 * 5.6.4 Partial Attribute Update.
 *
 * This operation allows performing a partial update on an NGSI-LD Entity's Attribute (Property or Relationship).
 * A partial update only changes the elements provided in an Entity Fragment, leaving the rest as they are.
 * This operation supports the deletion of sub-Attributes but not the deletion of the whole Attribute itself.
 * @summary Partial Attribute Update

 */
export const updateAttrs = (
  entityId: string,
  attrId: string,
  attributeFragmentBody?: PickRequired<AttributeFragmentBody, "@context">,
  params?: UpdateAttrsParams,
  options?: RequestInit,
) => {
  return fetcher<UpdateAttrsResponse>(
    getUpdateAttrsUrl(entityId, attrId, params),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/ld+json", ...options?.headers },
      body: JSON.stringify(attributeFragmentBody),
    },
  );
};

export const getDeleteAttrsUrl = (
  entityId: string,
  attrId: string,
  params?: DeleteAttrsParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ["datasetId"];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? "null" : String(v));
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${entityId}/attrs/${attrId}?${stringifiedParams}`
    : `/entities/${entityId}/attrs/${attrId}`;
};

/**
 * 5.6.5 Delete Entity Attribute.
 *
 * This operation allows deleting an NGSI-LD Entity's Attribute (Property or Relationship).
 * The Attribute itself and all its children shall be deleted.
 * @summary Attribute delete

 */
/**
 * 5.6.5 Delete Entity Attribute.
 *
 * This operation allows deleting an NGSI-LD Entity's Attribute (Property or Relationship).
 * The Attribute itself and all its children shall be deleted.
 * @summary Attribute delete

 */
export const deleteAttrs = (
  entityId: string,
  attrId: string,
  params?: DeleteAttrsParams,
  options?: RequestInit,
) => {
  return fetcher<DeleteAttrsResponse>(
    getDeleteAttrsUrl(entityId, attrId, params),
    {
      ...options,
      method: "DELETE",
    },
  );
};

export const getReplaceAttrsUrl = (
  entityId: string,
  attrId: string,
  params?: ReplaceAttrsParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${entityId}/attrs/${attrId}?${stringifiedParams}`
    : `/entities/${entityId}/attrs/${attrId}`;
};

/**
 * 5.6.19 Attribute Replace.
 *
 * This operation allows the replacement of a single Attribute (Property or Relationship)
 * within an NGSI-LD Entity.
 * @summary Attribute replace

 */
/**
 * 5.6.19 Attribute Replace.
 *
 * This operation allows the replacement of a single Attribute (Property or Relationship)
 * within an NGSI-LD Entity.
 * @summary Attribute replace

 */
export const replaceAttrs = (
  entityId: string,
  attrId: string,
  attributeFragmentBody?: PickRequired<AttributeFragmentBody, "@context">,
  params?: ReplaceAttrsParams,
  options?: RequestInit,
) => {
  return fetcher<ReplaceAttrsResponse>(
    getReplaceAttrsUrl(entityId, attrId, params),
    {
      ...options,
      method: "PUT",
      headers: { "Content-Type": "application/ld+json", ...options?.headers },
      body: JSON.stringify(attributeFragmentBody),
    },
  );
};

export const getCreateCSRUrl = () => {
  return `/csourceRegistrations`;
};

/**
 * 5.9.2 Register Context Source.
 *
 * This operation allows registering a context source within an NGSI-LD system.
 * @summary Csource registration creation

 */
/**
 * 5.9.2 Register Context Source.
 *
 * This operation allows registering a context source within an NGSI-LD system.
 * @summary Csource registration creation

 */
export const createCSR = (
  createCSRBody?: PickRequired<
    NonReadonly<CreateCSRBody>,
    "type" | "information" | "endpoint" | "@context"
  >,
  options?: RequestInit,
) => {
  return fetcher<CreateCSRResponse>(getCreateCSRUrl(), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(createCSRBody),
  });
};

export const getQueryCSRUrl = (params?: QueryCSRParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ["coordinates"];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? "null" : String(v));
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/csourceRegistrations?${stringifiedParams}`
    : `/csourceRegistrations`;
};

/**
 * 5.10.2 Query Context Source Registrations.
 *
 * This operation allows discovering context source registrations from an NGSI-LD system.
 * The behaviour of the discovery of context source registrations differs significantly from
 * the querying of entities as described in clause 5.7.2. The approach is that the client
 * submits a query for entities as described in clause 5.7.2, but instead of receiving
 * the Entity information, it receives a list of Context Source Registrations describing
 * Context Sources that possibly have some of the requested Entity information. This means
 * that the requested Entities and Attributes are matched against the 'information' property
 * as described in clause 5.12.
 *
 * If no temporal query is present, only Context Source Registrations for Context Sources
 * providing latest information, i.e. without specified time intervals, are considered.
 * If a temporal query is present only Context Source Registrations with matching time intervals,
 * i.e. observationInterval or managementInterval, are considered.
 * @summary Discover Csource registrations

 */
/**
 * 5.10.2 Query Context Source Registrations.
 *
 * This operation allows discovering context source registrations from an NGSI-LD system.
 * The behaviour of the discovery of context source registrations differs significantly from
 * the querying of entities as described in clause 5.7.2. The approach is that the client
 * submits a query for entities as described in clause 5.7.2, but instead of receiving
 * the Entity information, it receives a list of Context Source Registrations describing
 * Context Sources that possibly have some of the requested Entity information. This means
 * that the requested Entities and Attributes are matched against the 'information' property
 * as described in clause 5.12.
 *
 * If no temporal query is present, only Context Source Registrations for Context Sources
 * providing latest information, i.e. without specified time intervals, are considered.
 * If a temporal query is present only Context Source Registrations with matching time intervals,
 * i.e. observationInterval or managementInterval, are considered.
 * @summary Discover Csource registrations

 */
export const queryCSR = (params?: QueryCSRParams, options?: RequestInit) => {
  return fetcher<QueryCSRResponse>(getQueryCSRUrl(params), {
    ...options,
    method: "GET",
  });
};

export const getRetrieveCSRUrl = (
  registrationId: string,
  params?: RetrieveCSRParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/csourceRegistrations/${registrationId}?${stringifiedParams}`
    : `/csourceRegistrations/${registrationId}`;
};

/**
 * 5.10.1 Retrieve Context Source Registration.
 *
 * This operation allows retrieving a specific context source registration from an NGSI-LD system.
 * @summary Csource registration retrieval by id

 */
/**
 * 5.10.1 Retrieve Context Source Registration.
 *
 * This operation allows retrieving a specific context source registration from an NGSI-LD system.
 * @summary Csource registration retrieval by id

 */
export const retrieveCSR = (
  registrationId: string,
  params?: RetrieveCSRParams,
  options?: RequestInit,
) => {
  return fetcher<RetrieveCSRResponse>(
    getRetrieveCSRUrl(registrationId, params),
    {
      ...options,
      method: "GET",
    },
  );
};

export const getUpdateCSRUrl = (registrationId: string) => {
  return `/csourceRegistrations/${registrationId}`;
};

/**
 * 5.9.3 Update Context Source Registration.
 *
 * This operation allows updating a Context Source Registration in an NGSI-LD system.
 * @summary Csource registration update by id

 */
/**
 * 5.9.3 Update Context Source Registration.
 *
 * This operation allows updating a Context Source Registration in an NGSI-LD system.
 * @summary Csource registration update by id

 */
export const updateCSR = (
  registrationId: string,
  updateCSRBody?: PickRequired<NonReadonly<UpdateCSRBody>, "@context">,
  options?: RequestInit,
) => {
  return fetcher<UpdateCSRResponse>(getUpdateCSRUrl(registrationId), {
    ...options,
    method: "PATCH",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(updateCSRBody),
  });
};

export const getDeleteCSRUrl = (registrationId: string) => {
  return `/csourceRegistrations/${registrationId}`;
};

/**
 * 5.9.4 Delete Context Source Registration.
 *
 * This operation allows deleting a Context Source Registration from an NGSI-LD system.
 * @summary Csource registration deletion by id

 */
/**
 * 5.9.4 Delete Context Source Registration.
 *
 * This operation allows deleting a Context Source Registration from an NGSI-LD system.
 * @summary Csource registration deletion by id

 */
export const deleteCSR = (registrationId: string, options?: RequestInit) => {
  return fetcher<DeleteCSRResponse>(getDeleteCSRUrl(registrationId), {
    ...options,
    method: "DELETE",
  });
};

export const getCreateSubscriptionUrl = (params?: CreateSubscriptionParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/subscriptions?${stringifiedParams}`
    : `/subscriptions`;
};

/**
 * 5.8.1 Create subscription.
 *
 * This operation allows creating a new subscription.
 * @summary Create Subscription

 */
/**
 * 5.8.1 Create subscription.
 *
 * This operation allows creating a new subscription.
 * @summary Create Subscription

 */
export const createSubscription = (
  subscriptionBody?: PickRequired<
    SubscriptionBody,
    "type" | "notification" | "@context"
  >,
  params?: CreateSubscriptionParams,
  options?: RequestInit,
) => {
  return fetcher<CreateSubscriptionResponse>(getCreateSubscriptionUrl(params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(subscriptionBody),
  });
};

export const getQuerySubscriptionUrl = (params?: QuerySubscriptionParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/subscriptions?${stringifiedParams}`
    : `/subscriptions`;
};

/**
 * 5.8.4 Query Subscriptions.
 *
 * This operation allows querying existing Subscriptions.
 * @summary Retrieve list of Subscriptions

 */
/**
 * 5.8.4 Query Subscriptions.
 *
 * This operation allows querying existing Subscriptions.
 * @summary Retrieve list of Subscriptions

 */
export const querySubscription = (
  params?: QuerySubscriptionParams,
  options?: RequestInit,
) => {
  return fetcher<QuerySubscriptionResponse>(getQuerySubscriptionUrl(params), {
    ...options,
    method: "GET",
  });
};

export const getRetrieveSubscriptionUrl = (
  subscriptionId: string,
  params?: RetrieveSubscriptionParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/subscriptions/${subscriptionId}?${stringifiedParams}`
    : `/subscriptions/${subscriptionId}`;
};

/**
 * 5.8.3 Retrieve Subscription.
 *
 * This operation allows retrieving an existing subscription.
 * @summary Subscription retrieval by id

 */
/**
 * 5.8.3 Retrieve Subscription.
 *
 * This operation allows retrieving an existing subscription.
 * @summary Subscription retrieval by id

 */
export const retrieveSubscription = (
  subscriptionId: string,
  params?: RetrieveSubscriptionParams,
  options?: RequestInit,
) => {
  return fetcher<RetrieveSubscriptionResponse>(
    getRetrieveSubscriptionUrl(subscriptionId, params),
    {
      ...options,
      method: "GET",
    },
  );
};

export const getUpdateSubscriptionUrl = (
  subscriptionId: string,
  params?: UpdateSubscriptionParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/subscriptions/${subscriptionId}?${stringifiedParams}`
    : `/subscriptions/${subscriptionId}`;
};

/**
 * 5.8.2 Update Subscription.
 *
 * This operation allows updating an existing subscription.
 * @summary Subscription update by id

 */
/**
 * 5.8.2 Update Subscription.
 *
 * This operation allows updating an existing subscription.
 * @summary Subscription update by id

 */
export const updateSubscription = (
  subscriptionId: string,
  subscriptionFragmentBody?: PickRequired<SubscriptionFragmentBody, "@context">,
  params?: UpdateSubscriptionParams,
  options?: RequestInit,
) => {
  return fetcher<UpdateSubscriptionResponse>(
    getUpdateSubscriptionUrl(subscriptionId, params),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/ld+json", ...options?.headers },
      body: JSON.stringify(subscriptionFragmentBody),
    },
  );
};

export const getDeleteSubscriptionUrl = (
  subscriptionId: string,
  params?: DeleteSubscriptionParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/subscriptions/${subscriptionId}?${stringifiedParams}`
    : `/subscriptions/${subscriptionId}`;
};

/**
 * 5.8.5 Delete Subscription.
 *
 * This operation allows deleting an existing subscription.
 * @summary Subscription deletion by id

 */
/**
 * 5.8.5 Delete Subscription.
 *
 * This operation allows deleting an existing subscription.
 * @summary Subscription deletion by id

 */
export const deleteSubscription = (
  subscriptionId: string,
  params?: DeleteSubscriptionParams,
  options?: RequestInit,
) => {
  return fetcher<DeleteSubscriptionResponse>(
    getDeleteSubscriptionUrl(subscriptionId, params),
    {
      ...options,
      method: "DELETE",
    },
  );
};

export const getCreateCSRSubscriptionUrl = () => {
  return `/csourceSubscriptions`;
};

/**
 * 5.11.2 Create Context Source Registration Subscription.
 *
 * This operation allows creating a new Context Source Registration Subscription.
 * @summary Create subscription to Csource registration

 */
/**
 * 5.11.2 Create Context Source Registration Subscription.
 *
 * This operation allows creating a new Context Source Registration Subscription.
 * @summary Create subscription to Csource registration

 */
export const createCSRSubscription = (
  subscriptionBody?: PickRequired<
    SubscriptionBody,
    "type" | "notification" | "@context"
  >,
  options?: RequestInit,
) => {
  return fetcher<CreateCSRSubscriptionResponse>(getCreateCSRSubscriptionUrl(), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(subscriptionBody),
  });
};

export const getQueryCSRSubscriptionUrl = (
  params?: QueryCSRSubscriptionParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/csourceSubscriptions?${stringifiedParams}`
    : `/csourceSubscriptions`;
};

/**
 * 5.11.5 Query Context Source Registration Subscriptions.
 *
 * This operation allows querying existing Context Source Registration Subscriptions.
 * @summary Retrieval of list of subscriptions to Csource registrations

 */
/**
 * 5.11.5 Query Context Source Registration Subscriptions.
 *
 * This operation allows querying existing Context Source Registration Subscriptions.
 * @summary Retrieval of list of subscriptions to Csource registrations

 */
export const queryCSRSubscription = (
  params?: QueryCSRSubscriptionParams,
  options?: RequestInit,
) => {
  return fetcher<QueryCSRSubscriptionResponse>(
    getQueryCSRSubscriptionUrl(params),
    {
      ...options,
      method: "GET",
    },
  );
};

export const getRetrieveCSRSubscriptionUrl = (
  subscriptionId: string,
  params?: RetrieveCSRSubscriptionParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/csourceSubscriptions/${subscriptionId}?${stringifiedParams}`
    : `/csourceSubscriptions/${subscriptionId}`;
};

/**
 * 5.11.4 Retrieve Context Source Registration Subscription.
 *
 * This operation allows retrieving an existing Context Source Registration Subscription.
 * @summary Csource registration subscription update by id

 */
/**
 * 5.11.4 Retrieve Context Source Registration Subscription.
 *
 * This operation allows retrieving an existing Context Source Registration Subscription.
 * @summary Csource registration subscription update by id

 */
export const retrieveCSRSubscription = (
  subscriptionId: string,
  params?: RetrieveCSRSubscriptionParams,
  options?: RequestInit,
) => {
  return fetcher<RetrieveCSRSubscriptionResponse>(
    getRetrieveCSRSubscriptionUrl(subscriptionId, params),
    {
      ...options,
      method: "GET",
    },
  );
};

export const getUpdateCSRSubscriptionUrl = (subscriptionId: string) => {
  return `/csourceSubscriptions/${subscriptionId}`;
};

/**
 * 5.11.3 Update Context Source Registration Subscription.
 *
 * This operation allows updating an existing Context Source Registration Subscription.
 * @summary Csource registration subscription update by id

 */
/**
 * 5.11.3 Update Context Source Registration Subscription.
 *
 * This operation allows updating an existing Context Source Registration Subscription.
 * @summary Csource registration subscription update by id

 */
export const updateCSRSubscription = (
  subscriptionId: string,
  subscriptionFragmentBody?: PickRequired<SubscriptionFragmentBody, "@context">,
  options?: RequestInit,
) => {
  return fetcher<UpdateCSRSubscriptionResponse>(
    getUpdateCSRSubscriptionUrl(subscriptionId),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/ld+json", ...options?.headers },
      body: JSON.stringify(subscriptionFragmentBody),
    },
  );
};

export const getDeleteCSRSubscriptionUrl = (subscriptionId: string) => {
  return `/csourceSubscriptions/${subscriptionId}`;
};

/**
 * 5.11.6 Delete Context Source Registration Subscription.
 *
 * This operation allows deleting an existing Context Source Registration Subscription.
 * @summary Csource registration subscription deletion by id

 */
/**
 * 5.11.6 Delete Context Source Registration Subscription.
 *
 * This operation allows deleting an existing Context Source Registration Subscription.
 * @summary Csource registration subscription deletion by id

 */
export const deleteCSRSubscription = (
  subscriptionId: string,
  options?: RequestInit,
) => {
  return fetcher<DeleteCSRSubscriptionResponse>(
    getDeleteCSRSubscriptionUrl(subscriptionId),
    {
      ...options,
      method: "DELETE",
    },
  );
};

export const getCreateBatchUrl = (params?: CreateBatchParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entityOperations/create?${stringifiedParams}`
    : `/entityOperations/create`;
};

/**
 * 5.6.7 Batch Entity Creation.
 *
 * This operation allows creating a batch of NGSI-LD Entities.
 * @summary Batch Entity Creation

 */
/**
 * 5.6.7 Batch Entity Creation.
 *
 * This operation allows creating a batch of NGSI-LD Entities.
 * @summary Batch Entity Creation

 */
export const createBatch = (
  createBatchBodyItem?: NonReadonly<CreateBatchBodyItem[]>,
  params?: CreateBatchParams,
  options?: RequestInit,
) => {
  return fetcher<CreateBatchResponse>(getCreateBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(createBatchBodyItem),
  });
};

export const getUpsertBatchUrl = (params?: UpsertBatchParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entityOperations/upsert?${stringifiedParams}`
    : `/entityOperations/upsert`;
};

/**
 * 5.6.8 Batch Entity Upsert.
 *
 * This operation allows creating a batch of NGSI-LD Entities, updating each of them if they already existed.
 * In some database jargon this kind of operation is known as "upsert".
 * @summary Batch Entity Creation or Update (Upsert)

 */
/**
 * 5.6.8 Batch Entity Upsert.
 *
 * This operation allows creating a batch of NGSI-LD Entities, updating each of them if they already existed.
 * In some database jargon this kind of operation is known as "upsert".
 * @summary Batch Entity Creation or Update (Upsert)

 */
export const upsertBatch = (
  upsertBatchBodyItem?: NonReadonly<UpsertBatchBodyItem[]>,
  params?: UpsertBatchParams,
  options?: RequestInit,
) => {
  return fetcher<UpsertBatchResponse>(getUpsertBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(upsertBatchBodyItem),
  });
};

export const getUpdateBatchUrl = (params?: UpdateBatchParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entityOperations/update?${stringifiedParams}`
    : `/entityOperations/update`;
};

/**
 * 5.6.9 Batch Entity Update.
 *
 * This operation allows updating a batch of NGSI-LD Entities.
 * @summary Batch Entity Update

 */
/**
 * 5.6.9 Batch Entity Update.
 *
 * This operation allows updating a batch of NGSI-LD Entities.
 * @summary Batch Entity Update

 */
export const updateBatch = (
  updateBatchBodyItem?: NonReadonly<UpdateBatchBodyItem[]>,
  params?: UpdateBatchParams,
  options?: RequestInit,
) => {
  return fetcher<UpdateBatchResponse>(getUpdateBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(updateBatchBodyItem),
  });
};

export const getDeleteBatchUrl = (params?: DeleteBatchParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entityOperations/delete?${stringifiedParams}`
    : `/entityOperations/delete`;
};

/**
 * 5.6.10 Batch Entity Delete.
 *
 * This operation allows deleting a batch of NGSI-LD Entities.
 * @summary Batch Entity Delete

 */
/**
 * 5.6.10 Batch Entity Delete.
 *
 * This operation allows deleting a batch of NGSI-LD Entities.
 * @summary Batch Entity Delete

 */
export const deleteBatch = (
  deleteBatchBody?: string[],
  params?: DeleteBatchParams,
  options?: RequestInit,
) => {
  return fetcher<DeleteBatchResponse>(getDeleteBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(deleteBatchBody),
  });
};

export const getQueryBatchUrl = (params?: QueryBatchParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entityOperations/query?${stringifiedParams}`
    : `/entityOperations/query`;
};

/**
 * 5.7.2 Query Entity (batch entity queries only).
 *
 * This operation allows querying an NGSI-LD system.
 * @summary Query entities based on POST

 */
/**
 * 5.7.2 Query Entity (batch entity queries only).
 *
 * This operation allows querying an NGSI-LD system.
 * @summary Query entities based on POST

 */
export const queryBatch = (
  query?: Query,
  params?: QueryBatchParams,
  options?: RequestInit,
) => {
  return fetcher<QueryBatchResponse>(getQueryBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(query),
  });
};

export const getMergeBatchUrl = (params?: MergeBatchParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entityOperations/merge?${stringifiedParams}`
    : `/entityOperations/merge`;
};

/**
 * 5.6.20 Batch Entity Merge.
 *
 * This operation allows modification of a batch of NGSI-LD Entities according to the JSON Merge Patch
 * processing rules defined in IETF RFC 7396 by adding new attributes (Properties or Relationships)
 * or modifying or deleting existing attributes associated with an existing Entity.
 * @summary Batch Entity Merge

 */
/**
 * 5.6.20 Batch Entity Merge.
 *
 * This operation allows modification of a batch of NGSI-LD Entities according to the JSON Merge Patch
 * processing rules defined in IETF RFC 7396 by adding new attributes (Properties or Relationships)
 * or modifying or deleting existing attributes associated with an existing Entity.
 * @summary Batch Entity Merge

 */
export const mergeBatch = (
  mergeBatchBodyItem?: NonReadonly<MergeBatchBodyItem[]>,
  params?: MergeBatchParams,
  options?: RequestInit,
) => {
  return fetcher<MergeBatchResponse>(getMergeBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(mergeBatchBodyItem),
  });
};

export const getUpsertTemporalUrl = (params?: UpsertTemporalParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities?${stringifiedParams}`
    : `/temporal/entities`;
};

/**
 * 5.6.11 Create or Update Temporal Representation of an Entity.
 *
 * This operation allows creating or updating (by adding new Attribute instances)
 * a Temporal Representation of an Entity.
 * @summary Temporal Representation of Entity creation

 */
/**
 * 5.6.11 Create or Update Temporal Representation of an Entity.
 *
 * This operation allows creating or updating (by adding new Attribute instances)
 * a Temporal Representation of an Entity.
 * @summary Temporal Representation of Entity creation

 */
export const upsertTemporal = (
  entityTemporalBody?: PickRequired<
    EntityTemporalBody,
    "id" | "type" | "@context"
  >,
  params?: UpsertTemporalParams,
  options?: RequestInit,
) => {
  return fetcher<UpsertTemporalResponse>(getUpsertTemporalUrl(params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(entityTemporalBody),
  });
};

export const getQueryTemporalUrl = (params?: QueryTemporalParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ["coordinates", "datasetId"];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? "null" : String(v));
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities?${stringifiedParams}`
    : `/temporal/entities`;
};

/**
 * 5.7.4 Query Temporal Evolution of Entities.
 *
 * This operation allows querying the temporal evolution of Entities present in an NGSI-LD system.
 * It is similar to the operation defined by clause 5.7.2 (Query Entities) with the addition of a temporal query.
 *
 * *The query parameters timerel and timeAt are required.
 * @summary Query temporal evolution of Entities

 */
/**
 * 5.7.4 Query Temporal Evolution of Entities.
 *
 * This operation allows querying the temporal evolution of Entities present in an NGSI-LD system.
 * It is similar to the operation defined by clause 5.7.2 (Query Entities) with the addition of a temporal query.
 *
 * *The query parameters timerel and timeAt are required.
 * @summary Query temporal evolution of Entities

 */
export const queryTemporal = (
  params?: QueryTemporalParams,
  options?: RequestInit,
) => {
  return fetcher<QueryTemporalResponse>(getQueryTemporalUrl(params), {
    ...options,
    method: "GET",
  });
};

export const getRetrieveTemporalUrl = (
  entityId: string,
  params?: RetrieveTemporalParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ["datasetId"];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? "null" : String(v));
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities/${entityId}?${stringifiedParams}`
    : `/temporal/entities/${entityId}`;
};

/**
 * 5.7.3 Retrieve Temporal Evolution of an Entity.
 *
 * This operation allows retrieving the temporal evolution of an NGSI-LD Entity.
 * @summary Temporal Representation of Entity retrieval by id

 */
/**
 * 5.7.3 Retrieve Temporal Evolution of an Entity.
 *
 * This operation allows retrieving the temporal evolution of an NGSI-LD Entity.
 * @summary Temporal Representation of Entity retrieval by id

 */
export const retrieveTemporal = (
  entityId: string,
  params?: RetrieveTemporalParams,
  options?: RequestInit,
) => {
  return fetcher<RetrieveTemporalResponse>(
    getRetrieveTemporalUrl(entityId, params),
    {
      ...options,
      method: "GET",
    },
  );
};

export const getDeleteTemporalUrl = (
  entityId: string,
  params?: DeleteTemporalParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities/${entityId}?${stringifiedParams}`
    : `/temporal/entities/${entityId}`;
};

/**
 * 5.6.16 Delete Temporal Representation of an Entity.
 *
 * This operation allows deleting the Temporal Representation of an Entity.
 * @summary Temporal Representation of Entity deletion by id

 */
/**
 * 5.6.16 Delete Temporal Representation of an Entity.
 *
 * This operation allows deleting the Temporal Representation of an Entity.
 * @summary Temporal Representation of Entity deletion by id

 */
export const deleteTemporal = (
  entityId: string,
  params?: DeleteTemporalParams,
  options?: RequestInit,
) => {
  return fetcher<DeleteTemporalResponse>(
    getDeleteTemporalUrl(entityId, params),
    {
      ...options,
      method: "DELETE",
    },
  );
};

export const getAppendAttrsTemporalUrl = (
  entityId: string,
  params?: AppendAttrsTemporalParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities/${entityId}/attrs?${stringifiedParams}`
    : `/temporal/entities/${entityId}/attrs`;
};

/**
 * 5.6.12 Add Attributes to Temporal Representation of an Entity.
 *
 * This operation allows modifying a Temporal Representation of an Entity by adding new Attribute instances.
 * @summary Temporal Representation of Entity Attribute instance addition

 */
/**
 * 5.6.12 Add Attributes to Temporal Representation of an Entity.
 *
 * This operation allows modifying a Temporal Representation of an Entity by adding new Attribute instances.
 * @summary Temporal Representation of Entity Attribute instance addition

 */
export const appendAttrsTemporal = (
  entityId: string,
  entityTemporalFragmentBody?: PickRequired<
    EntityTemporalFragmentBody,
    "@context"
  >,
  params?: AppendAttrsTemporalParams,
  options?: RequestInit,
) => {
  return fetcher<AppendAttrsTemporalResponse>(
    getAppendAttrsTemporalUrl(entityId, params),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/ld+json", ...options?.headers },
      body: JSON.stringify(entityTemporalFragmentBody),
    },
  );
};

export const getDeleteAttrsTemporalUrl = (
  entityId: string,
  attrId: string,
  params?: DeleteAttrsTemporalParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ["datasetId"];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? "null" : String(v));
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities/${entityId}/attrs/${attrId}?${stringifiedParams}`
    : `/temporal/entities/${entityId}/attrs/${attrId}`;
};

/**
 * 5.6.13 Delete Attributes from Temporal Representation of an Entity.
 *
 * This operation allows deleting an Attribute (Property or Relationship) of the Temporal Representation of an Entity.
 * The Attribute itself and all its children shall be deleted.
 * @summary Attribute from Temporal Representation of Entity deletion

 */
/**
 * 5.6.13 Delete Attributes from Temporal Representation of an Entity.
 *
 * This operation allows deleting an Attribute (Property or Relationship) of the Temporal Representation of an Entity.
 * The Attribute itself and all its children shall be deleted.
 * @summary Attribute from Temporal Representation of Entity deletion

 */
export const deleteAttrsTemporal = (
  entityId: string,
  attrId: string,
  params?: DeleteAttrsTemporalParams,
  options?: RequestInit,
) => {
  return fetcher<DeleteAttrsTemporalResponse>(
    getDeleteAttrsTemporalUrl(entityId, attrId, params),
    {
      ...options,
      method: "DELETE",
    },
  );
};

export const getUpdateAttrsTemporalUrl = (
  entityId: string,
  attrId: string,
  instanceId: string,
  params?: UpdateAttrsTemporalParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities/${entityId}/attrs/${attrId}/${instanceId}?${stringifiedParams}`
    : `/temporal/entities/${entityId}/attrs/${attrId}/${instanceId}`;
};

/**
 * 5.6.14 Partial Update Attribute instance in Temporal Representation of an Entity.
 *
 * This operation allows modifying a specific Attribute (Property or Relationship) instance,
 * identified by its instanceId, of a Temporal Representation of an Entity.
 *
 * This operation enables the correction of wrong information that could have been previously added
 * to the Temporal Representation of an Entity.
 * @summary Attribute Instance update

 */
/**
 * 5.6.14 Partial Update Attribute instance in Temporal Representation of an Entity.
 *
 * This operation allows modifying a specific Attribute (Property or Relationship) instance,
 * identified by its instanceId, of a Temporal Representation of an Entity.
 *
 * This operation enables the correction of wrong information that could have been previously added
 * to the Temporal Representation of an Entity.
 * @summary Attribute Instance update

 */
export const updateAttrsTemporal = (
  entityId: string,
  attrId: string,
  instanceId: string,
  entityTemporalFragmentBody?: PickRequired<
    EntityTemporalFragmentBody,
    "@context"
  >,
  params?: UpdateAttrsTemporalParams,
  options?: RequestInit,
) => {
  return fetcher<UpdateAttrsTemporalResponse>(
    getUpdateAttrsTemporalUrl(entityId, attrId, instanceId, params),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/ld+json", ...options?.headers },
      body: JSON.stringify(entityTemporalFragmentBody),
    },
  );
};

export const getDeleteAttrInstanceTemporalUrl = (
  entityId: string,
  attrId: string,
  instanceId: string,
  params?: DeleteAttrInstanceTemporalParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities/${entityId}/attrs/${attrId}/${instanceId}?${stringifiedParams}`
    : `/temporal/entities/${entityId}/attrs/${attrId}/${instanceId}`;
};

/**
 * 5.6.15 Delete Attribute Instance from Temporal Representation of an Entity.
 *
 * This operation allows deleting one Attribute instance (Property or Relationship),
 * identified by its instanceId, of a Temporal Representation of an Entity.
 * The Attribute itself and all its child elements shall be deleted. This operation enables
 * the removal of individual Attribute instances that could have been previously added
 * to the Temporal Representation of an Entity.
 * @summary Attribute Instance deletion by instance id

 */
/**
 * 5.6.15 Delete Attribute Instance from Temporal Representation of an Entity.
 *
 * This operation allows deleting one Attribute instance (Property or Relationship),
 * identified by its instanceId, of a Temporal Representation of an Entity.
 * The Attribute itself and all its child elements shall be deleted. This operation enables
 * the removal of individual Attribute instances that could have been previously added
 * to the Temporal Representation of an Entity.
 * @summary Attribute Instance deletion by instance id

 */
export const deleteAttrInstanceTemporal = (
  entityId: string,
  attrId: string,
  instanceId: string,
  params?: DeleteAttrInstanceTemporalParams,
  options?: RequestInit,
) => {
  return fetcher<DeleteAttrInstanceTemporalResponse>(
    getDeleteAttrInstanceTemporalUrl(entityId, attrId, instanceId, params),
    {
      ...options,
      method: "DELETE",
    },
  );
};

export const getTemporalQueryBatchUrl = (params?: TemporalQueryBatchParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entityOperations/query?${stringifiedParams}`
    : `/temporal/entityOperations/query`;
};

/**
 * 5.7.4 Query Temporal Evolution of Entities.
 *
 * This operation allows querying the temporal evolution of Entities present in an NGSI-LD system.
 * It is similar to the operation defined by clause 5.7.2 (Query Entities) with the addition of a temporal query.
 * @summary Temporal Representation of Entity Query based on POST

 */
/**
 * 5.7.4 Query Temporal Evolution of Entities.
 *
 * This operation allows querying the temporal evolution of Entities present in an NGSI-LD system.
 * It is similar to the operation defined by clause 5.7.2 (Query Entities) with the addition of a temporal query.
 * @summary Temporal Representation of Entity Query based on POST

 */
export const temporalQueryBatch = (
  queryTemporalBody?: QueryTemporalBody,
  params?: TemporalQueryBatchParams,
  options?: RequestInit,
) => {
  return fetcher<TemporalQueryBatchResponse>(getTemporalQueryBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(queryTemporalBody),
  });
};

export const getRetrieveEntityTypesUrl = (
  params?: RetrieveEntityTypesParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/types?${stringifiedParams}`
    : `/types`;
};

/**
 * 5.7.5 Retrieve Available Entity Types.
 *
 * This operation allows retrieving a list of NGSI-LD entity types for which
 * entity instances exist within the NGSI-LD system.
 *
 * 5.7.6  Retrieve Details of Available Entity Types.
 *
 * This operation allows retrieving a list with a detailed representation of
 * NGSI-LD entity types for which entity instances exist within the NGSI-LD system.
 * @summary Retrieve available entity types

 */
/**
 * 5.7.5 Retrieve Available Entity Types.
 *
 * This operation allows retrieving a list of NGSI-LD entity types for which
 * entity instances exist within the NGSI-LD system.
 *
 * 5.7.6  Retrieve Details of Available Entity Types.
 *
 * This operation allows retrieving a list with a detailed representation of
 * NGSI-LD entity types for which entity instances exist within the NGSI-LD system.
 * @summary Retrieve available entity types

 */
export const retrieveEntityTypes = (
  params?: RetrieveEntityTypesParams,
  options?: RequestInit,
) => {
  return fetcher<RetrieveEntityTypesResponse>(
    getRetrieveEntityTypesUrl(params),
    {
      ...options,
      method: "GET",
    },
  );
};

export const getRetrieveEntityTypeInfoUrl = (
  type: string,
  params?: RetrieveEntityTypeInfoParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/types/${type}?${stringifiedParams}`
    : `/types/${type}`;
};

/**
 * 5.7.7 Retrieve Available Entity Type information.
 *
 * This operation allows retrieving detailed entity type information about a specified NGSI-LD entity
 * type for which entity instances exist within the NGSI-LD system. The detailed representation includes
 * the type name (as short name if available in the provided @context), the count of available entity
 * instances and details about attributes that existing instances of this entity type have, including
 * their name (as short name if available in the provided @context) and a list of types the attribute
 * can have (e.g. Property, Relationship or GeoProperty).
 * @summary Details about available entity type

 */
/**
 * 5.7.7 Retrieve Available Entity Type information.
 *
 * This operation allows retrieving detailed entity type information about a specified NGSI-LD entity
 * type for which entity instances exist within the NGSI-LD system. The detailed representation includes
 * the type name (as short name if available in the provided @context), the count of available entity
 * instances and details about attributes that existing instances of this entity type have, including
 * their name (as short name if available in the provided @context) and a list of types the attribute
 * can have (e.g. Property, Relationship or GeoProperty).
 * @summary Details about available entity type

 */
export const retrieveEntityTypeInfo = (
  type: string,
  params?: RetrieveEntityTypeInfoParams,
  options?: RequestInit,
) => {
  return fetcher<RetrieveEntityTypeInfoResponse>(
    getRetrieveEntityTypeInfoUrl(type, params),
    {
      ...options,
      method: "GET",
    },
  );
};

export const getRetrieveAttrTypesUrl = (params?: RetrieveAttrTypesParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/attributes?${stringifiedParams}`
    : `/attributes`;
};

/**
 * 5.7.8 Retrieve Available Attributes.
 *
 * This operation allows retrieving a list of NGSI-LD attributes that belong to
 * entity instances existing within the NGSI- LD system.
 *
 * 5.7.9 Retrieve Details of Available Attributes.
 *
 * This operation allows retrieving a list with a detailed representation of NGSI-LD
 * attributes that belong to entity instances existing within the NGSI-LD system.
 * @summary Available attributes

 */
/**
 * 5.7.8 Retrieve Available Attributes.
 *
 * This operation allows retrieving a list of NGSI-LD attributes that belong to
 * entity instances existing within the NGSI- LD system.
 *
 * 5.7.9 Retrieve Details of Available Attributes.
 *
 * This operation allows retrieving a list with a detailed representation of NGSI-LD
 * attributes that belong to entity instances existing within the NGSI-LD system.
 * @summary Available attributes

 */
export const retrieveAttrTypes = (
  params?: RetrieveAttrTypesParams,
  options?: RequestInit,
) => {
  return fetcher<RetrieveAttrTypesResponse>(getRetrieveAttrTypesUrl(params), {
    ...options,
    method: "GET",
  });
};

export const getRetrieveAttrTypeInfoUrl = (
  attrId: string,
  params?: RetrieveAttrTypeInfoParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/attributes/${attrId}?${stringifiedParams}`
    : `/attributes/${attrId}`;
};

/**
 * 5.7.10 Retrieve Available Attribute Information.
 *
 * This operation allows retrieving detailed attribute information about a specified NGSI-LD attribute
 * that belongs to entity instances existing within the NGSI-LD system. The detailed representation includes
 * the attribute name (as short name if available in the provided @context) and the type names
 * for which entity instances exist that have the respective attribute, a count of available
 * attribute instances and a list of types the attribute can have (e.g. Property, Relationship or GeoProperty).
 * @summary Details about available attribute

 */
/**
 * 5.7.10 Retrieve Available Attribute Information.
 *
 * This operation allows retrieving detailed attribute information about a specified NGSI-LD attribute
 * that belongs to entity instances existing within the NGSI-LD system. The detailed representation includes
 * the attribute name (as short name if available in the provided @context) and the type names
 * for which entity instances exist that have the respective attribute, a count of available
 * attribute instances and a list of types the attribute can have (e.g. Property, Relationship or GeoProperty).
 * @summary Details about available attribute

 */
export const retrieveAttrTypeInfo = (
  attrId: string,
  params?: RetrieveAttrTypeInfoParams,
  options?: RequestInit,
) => {
  return fetcher<RetrieveAttrTypeInfoResponse>(
    getRetrieveAttrTypeInfoUrl(attrId, params),
    {
      ...options,
      method: "GET",
    },
  );
};

export const getCreateContextUrl = () => {
  return `/jsonldContexts`;
};

/**
 * 5.13.2 Add @context.
 *
 * With this operation, a client can ask the Broker to store the full content
 * of a specific @context, by giving it to the Broker.
 * @summary Add a user @context to the internal cache

 */
/**
 * 5.13.2 Add @context.
 *
 * With this operation, a client can ask the Broker to store the full content
 * of a specific @context, by giving it to the Broker.
 * @summary Add a user @context to the internal cache

 */
export const createContext = (
  createContextBody?: CreateContextBody,
  options?: RequestInit,
) => {
  return fetcher<CreateContextResponse>(getCreateContextUrl(), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(createContextBody),
  });
};

export const getListContextsUrl = (params?: ListContextsParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/jsonldContexts?${stringifiedParams}`
    : `/jsonldContexts`;
};

/**
 * 5.13.3 List @contexts.
 *
 * With this operation a client can obtain a list of URLs that represent all of the @contexts
 * stored in the local context store of the Broker. Each URL can be used to download the
 * corresponding @context, and, in case the @context's kind is "Cached", it shall be
 * the original URL the Broker downloaded the @context from.
 *
 * In case a "details" flag is set to true, the client obtains a list of JSON objects,
 * each representing information (metadata) about an @context currently stored by the Broker.
 * Each JSON object contains information about the @context's original URL (if any), its
 * local identifier in the Broker's storage, its kind ("Cached", "Hosted" and "ImplicitlyCreated"),
 * its creation timestamp, its expiry date (if "Cached"), and additional optional information.
 * @summary List all cached @contexts

 */
/**
 * 5.13.3 List @contexts.
 *
 * With this operation a client can obtain a list of URLs that represent all of the @contexts
 * stored in the local context store of the Broker. Each URL can be used to download the
 * corresponding @context, and, in case the @context's kind is "Cached", it shall be
 * the original URL the Broker downloaded the @context from.
 *
 * In case a "details" flag is set to true, the client obtains a list of JSON objects,
 * each representing information (metadata) about an @context currently stored by the Broker.
 * Each JSON object contains information about the @context's original URL (if any), its
 * local identifier in the Broker's storage, its kind ("Cached", "Hosted" and "ImplicitlyCreated"),
 * its creation timestamp, its expiry date (if "Cached"), and additional optional information.
 * @summary List all cached @contexts

 */
export const listContexts = (
  params?: ListContextsParams,
  options?: RequestInit,
) => {
  return fetcher<ListContextsResponse>(getListContextsUrl(params), {
    ...options,
    method: "GET",
  });
};

export const getRetrieveContextUrl = (
  contextId: string,
  params?: RetrieveContextParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/jsonldContexts/${contextId}?${stringifiedParams}`
    : `/jsonldContexts/${contextId}`;
};

/**
 * 5.13.4 Serve @context.
 *
 * With this operation a client can obtain the full content of a specific @context
 * (only for @contexts of kind "Hosted" or "ImplicitlyCreated"), which is currently
 * stored in the Broker's internal storage, or its metadata (for all kinds of stored @contexts).
 * @summary Serve one specific user @context

 */
/**
 * 5.13.4 Serve @context.
 *
 * With this operation a client can obtain the full content of a specific @context
 * (only for @contexts of kind "Hosted" or "ImplicitlyCreated"), which is currently
 * stored in the Broker's internal storage, or its metadata (for all kinds of stored @contexts).
 * @summary Serve one specific user @context

 */
export const retrieveContext = (
  contextId: string,
  params?: RetrieveContextParams,
  options?: RequestInit,
) => {
  return fetcher<RetrieveContextResponse>(
    getRetrieveContextUrl(contextId, params),
    {
      ...options,
      method: "GET",
    },
  );
};

export const getDeleteContextUrl = (
  contextId: string,
  params?: DeleteContextParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/jsonldContexts/${contextId}?${stringifiedParams}`
    : `/jsonldContexts/${contextId}`;
};

/**
 * 5.13.5 Delete and Reload @context
 *
 * With this operation, a client supplies a local identifier to the Broker, indicating
 * a stored @context, that the Broker shall remove from its storage. For @contexts of
 * kind "Cached" this can also be the original URL the Broker downloaded the @context from.
 * If the entry in the local storage that corresponds to the identifier is itself
 * an array of @contexts, this operation will not delete the children,
 * i.e. the @contexts in the array, but just the entry.
 * @summary Delete one specific @context from internal cache, possibly re-inserting a freshly downloaded copy of it

 */
/**
 * 5.13.5 Delete and Reload @context
 *
 * With this operation, a client supplies a local identifier to the Broker, indicating
 * a stored @context, that the Broker shall remove from its storage. For @contexts of
 * kind "Cached" this can also be the original URL the Broker downloaded the @context from.
 * If the entry in the local storage that corresponds to the identifier is itself
 * an array of @contexts, this operation will not delete the children,
 * i.e. the @contexts in the array, but just the entry.
 * @summary Delete one specific @context from internal cache, possibly re-inserting a freshly downloaded copy of it

 */
export const deleteContext = (
  contextId: string,
  params?: DeleteContextParams,
  options?: RequestInit,
) => {
  return fetcher<DeleteContextResponse>(
    getDeleteContextUrl(contextId, params),
    {
      ...options,
      method: "DELETE",
    },
  );
};

export const getRetrieveEntityMapUrl = (entityMapId: string) => {
  return `/entityMap/${entityMapId}`;
};

/**
 * 5.14.1 Retrieve EntityMap.
 *
 * With this operation a client can obtain a cached EntityMap which is currently stored in the broker's internal storage, or memory.
 * @summary EntityMap Retrieval by id

 */
/**
 * 5.14.1 Retrieve EntityMap.
 *
 * With this operation a client can obtain a cached EntityMap which is currently stored in the broker's internal storage, or memory.
 * @summary EntityMap Retrieval by id

 */
export const retrieveEntityMap = (
  entityMapId: string,
  options?: RequestInit,
) => {
  return fetcher<RetrieveEntityMapResponse>(
    getRetrieveEntityMapUrl(entityMapId),
    {
      ...options,
      method: "GET",
    },
  );
};

export const getUpdateEntityMapUrl = (entityMapId: string) => {
  return `/entityMap/${entityMapId}`;
};

/**
 * 5.14.2 Update EntityMap.
 *
 * This operation allows performing a partial update on an NGSI-LD EntityMap. A partial update only changes the
 * elements provided in the EntityMap, leaving the rest as they are.
 * @summary EntityMap Update by id

 */
/**
 * 5.14.2 Update EntityMap.
 *
 * This operation allows performing a partial update on an NGSI-LD EntityMap. A partial update only changes the
 * elements provided in the EntityMap, leaving the rest as they are.
 * @summary EntityMap Update by id

 */
export const updateEntityMap = (
  entityMapId: string,
  updateEntityMapBody?: PickRequired<
    NonReadonly<UpdateEntityMapBody>,
    "@context"
  >,
  options?: RequestInit,
) => {
  return fetcher<UpdateEntityMapResponse>(getUpdateEntityMapUrl(entityMapId), {
    ...options,
    method: "PATCH",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(updateEntityMapBody),
  });
};

export const getDeleteEntityMapUrl = (entityMapId: string) => {
  return `/entityMap/${entityMapId}`;
};

/**
 * 5.14.3 Delete EntityMap.
 *
 * This operation allows deleting an NGSI-LD EntityMap.
 * @summary EntityMap Deletion by id

 */
/**
 * 5.14.3 Delete EntityMap.
 *
 * This operation allows deleting an NGSI-LD EntityMap.
 * @summary EntityMap Deletion by id

 */
export const deleteEntityMap = (entityMapId: string, options?: RequestInit) => {
  return fetcher<DeleteEntityMapResponse>(getDeleteEntityMapUrl(entityMapId), {
    ...options,
    method: "DELETE",
  });
};

export const getRetrieveCSIdentityInfoUrl = () => {
  return `/info/sourceIdentity`;
};

/**
 * 5.15.1 Retrieve Context Source Identity Information.
 *
 * With this operation, a client can obtain Context Source identity information which uniquely defines the Context Source itself.
 * In the multi-tenancy use case (see clause 4.14), a client can obtain identify information about a specific Tenant within a Context Source.
 * @summary Context Source Identity Retrieval

 */
/**
 * 5.15.1 Retrieve Context Source Identity Information.
 *
 * With this operation, a client can obtain Context Source identity information which uniquely defines the Context Source itself.
 * In the multi-tenancy use case (see clause 4.14), a client can obtain identify information about a specific Tenant within a Context Source.
 * @summary Context Source Identity Retrieval

 */
export const retrieveCSIdentityInfo = (options?: RequestInit) => {
  return fetcher<RetrieveCSIdentityInfoResponse>(
    getRetrieveCSIdentityInfoUrl(),
    {
      ...options,
      method: "GET",
    },
  );
};
