import type {
  AppendAttrsParams,
  AppendAttrsTemporalParams,
  AttributeFragmentBody,
  CreateBatchParams,
  CreateContextBody,
  CreateEntityParams,
  CreateSubscriptionParams,
  CsourceRegistration,
  DeleteAttrInstanceTemporalParams,
  DeleteAttrsParams,
  DeleteAttrsTemporalParams,
  DeleteBatchParams,
  DeleteContextParams,
  DeleteEntityParams,
  DeleteSubscriptionParams,
  DeleteTemporalParams,
  Entity,
  EntityMap,
  EntityTemporal,
  ListContextsParams,
  MaybeContext,
  MergeBatchParams,
  MergeEntityParams,
  Query,
  QueryBatchParams,
  QueryCSRParams,
  QueryCSRSubscriptionParams,
  QueryEntityParams,
  QuerySubscriptionParams,
  QueryTemporalBody,
  QueryTemporalParams,
  ReplaceAttrsParams,
  ReplaceEntityParams,
  RetrieveAttrTypeInfoParams,
  RetrieveAttrTypesParams,
  RetrieveCSRParams,
  RetrieveCSRSubscriptionParams,
  RetrieveContextParams,
  RetrieveEntityParams,
  RetrieveEntityTypeInfoParams,
  RetrieveEntityTypesParams,
  RetrieveSubscriptionParams,
  RetrieveTemporalParams,
  Subscription,
  TemporalQueryBatchParams,
  UpdateAttrsParams,
  UpdateAttrsTemporalParams,
  UpdateBatchParams,
  UpdateEntityParams,
  UpdateSubscriptionParams,
  UpsertBatchParams,
  UpsertTemporalParams,
  WithContext,
} from "./schemas";

import {
  AppendAttrsResponse,
  AppendAttrsTemporalResponse,
  CreateBatchResponse,
  CreateCSRResponse,
  CreateCSRSubscriptionResponse,
  CreateContextResponse,
  CreateEntityResponse,
  CreateSubscriptionResponse,
  DeleteAttrInstanceTemporalResponse,
  DeleteAttrsResponse,
  DeleteAttrsTemporalResponse,
  DeleteBatchResponse,
  DeleteCSRResponse,
  DeleteCSRSubscriptionResponse,
  DeleteContextResponse,
  DeleteEntityMapResponse,
  DeleteEntityResponse,
  DeleteSubscriptionResponse,
  DeleteTemporalResponse,
  ListContextsResponse,
  MergeBatchResponse,
  MergeEntityResponse,
  NonReadonly,
  PickRequired,
  QueryBatchResponse,
  QueryCSRResponse,
  QueryCSRSubscriptionResponse,
  QueryEntityResponse,
  QuerySubscriptionResponse,
  QueryTemporalResponse,
  ReplaceAttrsResponse,
  ReplaceEntityResponse,
  RetrieveAttrTypeInfoResponse,
  RetrieveAttrTypesResponse,
  RetrieveCSIdentityInfoResponse,
  RetrieveCSRResponse,
  RetrieveCSRSubscriptionResponse,
  RetrieveContextResponse,
  RetrieveEntityMapResponse,
  RetrieveEntityResponse,
  RetrieveEntityTypeInfoResponse,
  RetrieveEntityTypesResponse,
  RetrieveSubscriptionResponse,
  RetrieveTemporalResponse,
  TemporalQueryBatchResponse,
  UpdateAttrsResponse,
  UpdateAttrsTemporalResponse,
  UpdateBatchResponse,
  UpdateCSRResponse,
  UpdateCSRSubscriptionResponse,
  UpdateEntityMapResponse,
  UpdateEntityResponse,
  UpdateSubscriptionResponse,
  UpsertBatchResponse,
  UpsertTemporalResponse,
} from "./types.ts";

import {
  getAppendAttrsTemporalUrl,
  getAppendAttrsUrl,
  getCreateBatchUrl,
  getCreateCSRSubscriptionUrl,
  getCreateCSRUrl,
  getCreateContextUrl,
  getCreateEntityUrl,
  getCreateSubscriptionUrl,
  getDeleteAttrInstanceTemporalUrl,
  getDeleteAttrsTemporalUrl,
  getDeleteAttrsUrl,
  getDeleteBatchUrl,
  getDeleteCSRSubscriptionUrl,
  getDeleteCSRUrl,
  getDeleteContextUrl,
  getDeleteEntityMapUrl,
  getDeleteEntityUrl,
  getDeleteSubscriptionUrl,
  getDeleteTemporalUrl,
  getListContextsUrl,
  getMergeBatchUrl,
  getMergeEntityUrl,
  getQueryBatchUrl,
  getQueryCSRSubscriptionUrl,
  getQueryCSRUrl,
  getQueryEntityUrl,
  getQuerySubscriptionUrl,
  getQueryTemporalUrl,
  getReplaceAttrsUrl,
  getReplaceEntityUrl,
  getRetrieveAttrTypeInfoUrl,
  getRetrieveAttrTypesUrl,
  getRetrieveCSIdentityInfoUrl,
  getRetrieveCSRSubscriptionUrl,
  getRetrieveCSRUrl,
  getRetrieveContextUrl,
  getRetrieveEntityMapUrl,
  getRetrieveEntityTypeInfoUrl,
  getRetrieveEntityTypesUrl,
  getRetrieveEntityUrl,
  getRetrieveSubscriptionUrl,
  getRetrieveTemporalUrl,
  getTemporalQueryBatchUrl,
  getUpdateAttrsTemporalUrl,
  getUpdateAttrsUrl,
  getUpdateBatchUrl,
  getUpdateCSRSubscriptionUrl,
  getUpdateCSRUrl,
  getUpdateEntityMapUrl,
  getUpdateEntityUrl,
  getUpdateSubscriptionUrl,
  getUpsertBatchUrl,
  getUpsertTemporalUrl,
} from "./urls";

import { fetcher } from "../fetcher";
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
  createEntityBody?: WithContext<NonReadonly<Entity>>,
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
  mergeEntityBody?: WithContext<NonReadonly<Partial<Entity>>>,
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
  replaceEntityBody?: WithContext<NonReadonly<Partial<Entity>>>,
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
  appendAttrsBody?: WithContext<NonReadonly<Partial<Entity>>>,
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
  updateEntityBody?: WithContext<NonReadonly<Partial<Entity>>>,
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
  attributeFragmentBody?: WithContext<AttributeFragmentBody>,
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
  attributeFragmentBody?: WithContext<AttributeFragmentBody>,
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
  createCSRBody?: WithContext<
    PickRequired<
      NonReadonly<CsourceRegistration>,
      "type" | "information" | "endpoint"
    >
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
  updateCSRBody?: WithContext<NonReadonly<CsourceRegistration>>,
  options?: RequestInit,
) => {
  return fetcher<UpdateCSRResponse>(getUpdateCSRUrl(registrationId), {
    ...options,
    method: "PATCH",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(updateCSRBody),
  });
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
  subscriptionBody?: WithContext<
    PickRequired<Subscription, "type" | "notification">
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
  subscriptionFragmentBody?: WithContext<Subscription>,
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
  subscriptionBody?: WithContext<
    PickRequired<Subscription, "type" | "notification">
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
  subscriptionFragmentBody?: WithContext<Subscription>,
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
  createBatchBodyItem?: NonReadonly<MaybeContext<Entity>>[],
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
  upsertBatchBodyItem?: NonReadonly<MaybeContext<Entity>>[],
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
  updateBatchBodyItem?: NonReadonly<MaybeContext<Entity>>[],
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
  mergeBatchBodyItem?: NonReadonly<MaybeContext<Entity>>[],
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
  entityTemporalBody?: WithContext<PickRequired<EntityTemporal, "id" | "type">>,
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
  entityTemporalFragmentBody?: WithContext<EntityTemporal>,
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
  entityTemporalFragmentBody?: WithContext<EntityTemporal>,
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
  updateEntityMapBody?: WithContext<NonReadonly<EntityMap>>,
  options?: RequestInit,
) => {
  return fetcher<UpdateEntityMapResponse>(getUpdateEntityMapUrl(entityMapId), {
    ...options,
    method: "PATCH",
    headers: { "Content-Type": "application/ld+json", ...options?.headers },
    body: JSON.stringify(updateEntityMapBody),
  });
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
