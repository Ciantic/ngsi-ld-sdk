import type {
  Attribute,
  CsourceRegistration,
  Entity,
  EntityMap,
  EntityTypeInfo,
  EntityType,
  EntityTypeList,
  Feature,
  FeatureCollection,
  MaybeContext,
  Query,
  QueryTemporal,
  Subscription,
  WithContext,
  AttributeList,
  ContextSourceIdentity,
  LdContext,
  LdContextMetadata,
  BatchOperationResult,
  UpdateResult,
  NgsildAttribute,
  RequiredObservedAt,
  InferEntityTemporal,
} from "./schemas";

import type {
  AppendAttrsParams,
  AppendAttrsTemporalParams,
  CreateBatchParams,
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
  ListContextsParams,
  MergeBatchParams,
  MergeEntityParams,
  QueryBatchParams,
  QueryCSRParams,
  QueryCSRSubscriptionParams,
  QueryEntityParams,
  QuerySubscriptionParams,
  QueryTemporalParams,
  ReplaceAttrsParams,
  ReplaceEntityParams,
  RetrieveAttrTypeInfoParams,
  RetrieveAttrTypesParams,
  RetrieveContextParams,
  RetrieveCSRParams,
  RetrieveCSRSubscriptionParams,
  RetrieveEntityParams,
  RetrieveEntityTypeInfoParams,
  RetrieveEntityTypesParams,
  RetrieveSubscriptionParams,
  RetrieveTemporalParams,
  TemporalQueryBatchParams,
  UpdateAttrsParams,
  UpdateAttrsTemporalParams,
  UpdateBatchParams,
  UpdateEntityParams,
  UpdateSubscriptionParams,
  UpsertBatchParams,
  UpsertTemporalParams,
} from "./urls";

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

import { fetcher, type NgsiLdRequestOpts } from "../fetcher";

export const createEntity = <T extends Entity = Entity>(opts: {
  entity: WithContext<NonReadonly<T>>;
  params?: CreateEntityParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<CreateEntityResponse>({
    ...opts.options,
    path: getCreateEntityUrl({ params: opts.params }),
    method: "POST",
    body: JSON.stringify(opts.entity),
  });
};

export const queryEntity = <T extends Entity = Entity>(opts?: {
  params?: QueryEntityParams<T["type"] extends string ? T["type"] : string>;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<T>[]>({
    ...opts?.options,
    path: getQueryEntityUrl<T["type"] extends string ? T["type"] : string>({
      params: opts?.params,
    }),
    method: "GET",
    returnFormat: "body",
  });
};

export const queryGeoEntity = <T extends Entity = Entity>(opts?: {
  params?: QueryEntityParams<T["type"] extends string ? T["type"] : string>;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<FeatureCollection<T>>({
    ...opts?.options,
    path: getQueryEntityUrl<T["type"] extends string ? T["type"] : string>({
      params: opts?.params,
    }),
    method: "GET",
    headers: { Accept: "application/geo+json", ...opts?.options?.headers },
    returnFormat: "body",
  });
};

export const retrieveEntity = <T extends Entity = Entity>(opts: {
  entityId: string;
  params?: RetrieveEntityParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<T>>({
    ...opts.options,
    path: getRetrieveEntityUrl({
      entityId: opts.entityId,
      params: opts.params,
    }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveGeoEntity = <T extends Entity = Entity>(opts: {
  entityId: string;
  params?: Omit<RetrieveEntityParams, "options">;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<Feature<T>>({
    ...opts.options,
    path: getRetrieveEntityUrl({
      entityId: opts.entityId,
      params: opts.params,
    }),
    method: "GET",
    headers: { Accept: "application/geo+json", ...opts.options?.headers },
    returnFormat: "body",
  });
};

export const deleteEntity = (opts: {
  entityId: string;
  params?: DeleteEntityParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<DeleteEntityResponse>({
    ...opts.options,
    path: getDeleteEntityUrl({ entityId: opts.entityId, params: opts.params }),
    method: "DELETE",
  });
};

export const mergeEntity = <T extends Entity = Entity>(opts: {
  entityId: string;
  entityFragment: WithContext<NonReadonly<Partial<T>>>;
  params?: MergeEntityParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<MergeEntityResponse>({
    ...opts.options,
    path: getMergeEntityUrl({ entityId: opts.entityId, params: opts.params }),
    method: "PATCH",
    body: JSON.stringify(opts.entityFragment),
  });
};

export const replaceEntity = <T extends Entity = Entity>(opts: {
  entityId: string;
  entityFragment: WithContext<NonReadonly<Partial<T>>>;
  params?: ReplaceEntityParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<ReplaceEntityResponse>({
    ...opts.options,
    path: getReplaceEntityUrl({ entityId: opts.entityId, params: opts.params }),
    method: "PUT",
    body: JSON.stringify(opts.entityFragment),
  });
};

export const appendAttrs = <T extends Entity = Entity>(opts: {
  entityId: string;
  entityFragment: WithContext<NonReadonly<Partial<T>>>;
  params?: AppendAttrsParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<AppendAttrsResponse>({
    ...opts.options,
    path: getAppendAttrsUrl({ entityId: opts.entityId, params: opts.params }),
    method: "POST",
    body: JSON.stringify(opts.entityFragment),
  });
};

export const updateEntity = <T extends Entity = Entity>(opts: {
  entityId: string;
  entityFragment: WithContext<NonReadonly<Partial<T>>>;
  params?: UpdateEntityParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<UpdateEntityResponse>({
    ...opts.options,
    path: getUpdateEntityUrl({ entityId: opts.entityId, params: opts.params }),
    method: "PATCH",
    body: JSON.stringify(opts.entityFragment),
  });
};

export const updateAttrs = (opts: {
  entityId: string;
  attrId: string;
  attr: WithContext<NgsildAttribute>;
  params?: UpdateAttrsParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<UpdateAttrsResponse>({
    ...opts.options,
    path: getUpdateAttrsUrl({
      entityId: opts.entityId,
      attrId: opts.attrId,
      params: opts.params,
    }),
    method: "PATCH",
    body: JSON.stringify(opts.attr),
  });
};

export const deleteAttrs = (opts: {
  entityId: string;
  attrId: string;
  params?: DeleteAttrsParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<DeleteAttrsResponse>({
    ...opts.options,
    path: getDeleteAttrsUrl({
      entityId: opts.entityId,
      attrId: opts.attrId,
      params: opts.params,
    }),
    method: "DELETE",
  });
};

export const replaceAttrs = (opts: {
  entityId: string;
  attrId: string;
  attr: WithContext<NgsildAttribute>;
  params?: ReplaceAttrsParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<ReplaceAttrsResponse>({
    ...opts.options,
    path: getReplaceAttrsUrl({
      entityId: opts.entityId,
      attrId: opts.attrId,
      params: opts.params,
    }),
    method: "PUT",
    body: JSON.stringify(opts.attr),
  });
};

export const createCSR = (opts: {
  csr: WithContext<NonReadonly<CsourceRegistration>>;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<{ location: string }>({
    ...opts.options,
    path: getCreateCSRUrl(),
    method: "POST",
    body: JSON.stringify(opts.csr),
    returnFormat: "body",
  });
};

export const queryCSR = (opts?: {
  params?: QueryCSRParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<CsourceRegistration>[]>({
    ...opts?.options,
    path: getQueryCSRUrl({ params: opts?.params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveCSR = (opts: {
  registrationId: string;
  params?: RetrieveCSRParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<CsourceRegistration>>({
    ...opts.options,
    path: getRetrieveCSRUrl({
      registrationId: opts.registrationId,
      params: opts.params,
    }),
    method: "GET",
    returnFormat: "body",
  });
};

export const updateCSR = (opts: {
  registrationId: string;
  csrFragment: WithContext<NonReadonly<Partial<CsourceRegistration>>>;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getUpdateCSRUrl({ registrationId: opts.registrationId }),
    method: "PATCH",
    body: JSON.stringify(opts.csrFragment),
    returnFormat: "body",
  });
};

export const deleteCSR = (opts: {
  registrationId: string;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getDeleteCSRUrl({ registrationId: opts.registrationId }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const createSubscription = (opts: {
  subscription: WithContext<Subscription>;
  params?: CreateSubscriptionParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<{ location: string }>({
    ...opts.options,
    path: getCreateSubscriptionUrl({ params: opts.params }),
    method: "POST",
    body: JSON.stringify(opts.subscription),
    returnFormat: "body",
  });
};

export const querySubscription = (opts?: {
  params?: QuerySubscriptionParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<Subscription>[]>({
    ...opts?.options,
    path: getQuerySubscriptionUrl({ params: opts?.params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveSubscription = (opts: {
  subscriptionId: string;
  params?: RetrieveSubscriptionParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<Subscription>>({
    ...opts.options,
    path: getRetrieveSubscriptionUrl({
      subscriptionId: opts.subscriptionId,
      params: opts.params,
    }),
    method: "GET",
    returnFormat: "body",
  });
};

export const updateSubscription = (opts: {
  subscriptionId: string;
  subscriptionFragment: WithContext<Partial<Subscription>>;
  params?: UpdateSubscriptionParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getUpdateSubscriptionUrl({
      subscriptionId: opts.subscriptionId,
      params: opts.params,
    }),
    method: "PATCH",
    body: JSON.stringify(opts.subscriptionFragment),
    returnFormat: "body",
  });
};

export const deleteSubscription = (opts: {
  subscriptionId: string;
  params?: DeleteSubscriptionParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getDeleteSubscriptionUrl({
      subscriptionId: opts.subscriptionId,
      params: opts.params,
    }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const createCSRSubscription = (opts: {
  csrSubscription: WithContext<Subscription>;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<{ location: string }>({
    ...opts.options,
    path: getCreateCSRSubscriptionUrl(),
    method: "POST",
    body: JSON.stringify(opts.csrSubscription),
    returnFormat: "body",
  });
};

export const queryCSRSubscription = (opts?: {
  params?: QueryCSRSubscriptionParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<Subscription>[]>({
    ...opts?.options,
    path: getQueryCSRSubscriptionUrl({ params: opts?.params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveCSRSubscription = (opts: {
  subscriptionId: string;
  params?: RetrieveCSRSubscriptionParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<Subscription>>({
    ...opts.options,
    path: getRetrieveCSRSubscriptionUrl({
      subscriptionId: opts.subscriptionId,
      params: opts.params,
    }),
    method: "GET",
    returnFormat: "body",
  });
};

export const updateCSRSubscription = (opts: {
  csrSubscriptionId: string;
  csrSubscriptionFragment: WithContext<Partial<Subscription>>;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getUpdateCSRSubscriptionUrl({
      subscriptionId: opts.csrSubscriptionId,
    }),
    method: "PATCH",
    body: JSON.stringify(opts.csrSubscriptionFragment),
    returnFormat: "body",
  });
};

export const deleteCSRSubscription = (opts: {
  csrSubscriptionId: string;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getDeleteCSRSubscriptionUrl({
      subscriptionId: opts.csrSubscriptionId,
    }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const createBatch = <T extends Entity = Entity>(opts: {
  entities: NonReadonly<MaybeContext<T>>[];
  params?: CreateBatchParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<CreateBatchResponse>({
    ...opts.options,
    path: getCreateBatchUrl({ params: opts.params }),
    method: "POST",
    body: JSON.stringify(opts.entities),
  });
};

export const upsertBatch = <T extends Entity = Entity>(opts: {
  entities: NonReadonly<MaybeContext<T>>[];
  params?: UpsertBatchParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<UpsertBatchResponse>({
    ...opts.options,
    path: getUpsertBatchUrl({ params: opts.params }),
    method: "POST",
    body: JSON.stringify(opts.entities),
  });
};

export const updateBatch = <T extends Entity = Entity>(opts: {
  entities: NonReadonly<MaybeContext<T>>[];
  params?: UpdateBatchParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<UpdateBatchResponse>({
    ...opts.options,
    path: getUpdateBatchUrl({ params: opts.params }),
    method: "POST",
    body: JSON.stringify(opts.entities),
  });
};

export const deleteBatch = (opts: {
  entityIds: string[];
  params?: DeleteBatchParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<DeleteBatchResponse>({
    ...opts.options,
    path: getDeleteBatchUrl({ params: opts.params }),
    method: "POST",
    headers: { "Content-Type": "application/json", ...opts.options?.headers },
    body: JSON.stringify(opts.entityIds),
  });
};

export const queryBatch = <T extends Entity = Entity>(opts: {
  query: Query;
  params?: QueryBatchParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<T>[]>({
    ...opts.options,
    path: getQueryBatchUrl({ params: opts.params }),
    method: "POST",
    // https://github.com/stellio-hub/stellio-context-broker/issues/1809
    headers: { "Content-Type": "application/json", ...opts.options?.headers },
    body: JSON.stringify(opts.query),
    returnFormat: "body",
  });
};

export const queryGeoBatch = <T extends Entity = Entity>(opts: {
  query: Query;
  params?: QueryBatchParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<FeatureCollection<T>>({
    ...opts.options,
    path: getQueryBatchUrl({ params: opts.params }),
    method: "POST",
    headers: {
      // https://github.com/stellio-hub/stellio-context-broker/issues/1809
      "Content-Type": "application/json",
      Accept: "application/geo+json",
      ...opts.options?.headers,
    },
    body: JSON.stringify(opts.query),
    returnFormat: "body",
  });
};

export const mergeBatch = <T extends Entity = Entity>(opts: {
  entities: NonReadonly<MaybeContext<T>>[];
  params?: MergeBatchParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<MergeBatchResponse>({
    ...opts.options,
    path: getMergeBatchUrl({ params: opts.params }),
    method: "POST",
    body: JSON.stringify(opts.entities),
  });
};

export const upsertTemporal = <T extends Entity = Entity>(opts: {
  entityTemporal: WithContext<InferEntityTemporal<T>>;
  params?: UpsertTemporalParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<UpsertTemporalResponse>({
    ...opts.options,
    path: getUpsertTemporalUrl({ params: opts.params }),
    method: "POST",
    body: JSON.stringify(opts.entityTemporal),
  });
};

export const queryTemporal = <T extends Entity = Entity>(opts?: {
  params?: QueryTemporalParams<T["type"] extends string ? T["type"] : string>;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<InferEntityTemporal<T>>[]>({
    ...opts?.options,
    path: getQueryTemporalUrl<T["type"] extends string ? T["type"] : string>({
      params: opts?.params,
    }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveTemporal = <T extends Entity = Entity>(opts: {
  entityId: string;
  params?: RetrieveTemporalParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<InferEntityTemporal<T>>>({
    ...opts.options,
    path: getRetrieveTemporalUrl({
      entityId: opts.entityId,
      params: opts.params,
    }),
    method: "GET",
    returnFormat: "body",
  });
};

export const deleteTemporal = (opts: {
  entityId: string;
  params?: DeleteTemporalParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getDeleteTemporalUrl({
      entityId: opts.entityId,
      params: opts.params,
    }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const appendAttrsTemporal = <T extends Entity = Entity>(opts: {
  entityId: string;
  entityTemporalFragment: WithContext<Partial<InferEntityTemporal<T>>>;
  params?: AppendAttrsTemporalParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getAppendAttrsTemporalUrl({
      entityId: opts.entityId,
      params: opts.params,
    }),
    method: "POST",
    body: JSON.stringify(opts.entityTemporalFragment),
    returnFormat: "body",
  });
};

export const deleteAttrsTemporal = (opts: {
  entityId: string;
  attrId: string;
  params?: DeleteAttrsTemporalParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getDeleteAttrsTemporalUrl({
      entityId: opts.entityId,
      attrId: opts.attrId,
      params: opts.params,
    }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const updateAttrsTemporal = (opts: {
  entityId: string;
  attrId: string;
  instanceId: string;

  // Bare attribute *instance* (Property/Relationship + observedAt), NOT an
  // entity-temporal fragment — despite the yaml spec ref to
  // EntityTemporalFragment for this operation.
  attr: WithContext<RequiredObservedAt<NgsildAttribute>>;
  params?: UpdateAttrsTemporalParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getUpdateAttrsTemporalUrl({
      entityId: opts.entityId,
      attrId: opts.attrId,
      instanceId: opts.instanceId,
      params: opts.params,
    }),
    method: "PATCH",
    body: JSON.stringify(opts.attr),
    returnFormat: "body",
  });
};

export const deleteAttrInstanceTemporal = (opts: {
  entityId: string;
  attrId: string;
  instanceId: string;
  params?: DeleteAttrInstanceTemporalParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getDeleteAttrInstanceTemporalUrl({
      entityId: opts.entityId,
      attrId: opts.attrId,
      instanceId: opts.instanceId,
      params: opts.params,
    }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const temporalQueryBatch = <T extends Entity = Entity>(opts: {
  query: QueryTemporal;
  params?: TemporalQueryBatchParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<InferEntityTemporal<T>>[]>({
    ...opts.options,
    path: getTemporalQueryBatchUrl({ params: opts.params }),
    method: "POST",
    // https://github.com/stellio-hub/stellio-context-broker/issues/1809
    headers: { "Content-Type": "application/json", ...opts.options?.headers },
    body: JSON.stringify(opts.query),
    returnFormat: "body",
  });
};

export const retrieveEntityTypes = (opts?: {
  params?: RetrieveEntityTypesParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<EntityTypeList> | WithContext<EntityType>[]>({
    ...opts?.options,
    path: getRetrieveEntityTypesUrl({ params: opts?.params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveEntityTypeInfo = (opts: {
  type: string;
  params?: RetrieveEntityTypeInfoParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<EntityTypeInfo>>({
    ...opts.options,
    path: getRetrieveEntityTypeInfoUrl({
      type: opts.type,
      params: opts.params,
    }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveAttrTypes = (opts?: {
  params?: RetrieveAttrTypesParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<AttributeList> | WithContext<Attribute>[]>({
    ...opts?.options,
    path: getRetrieveAttrTypesUrl({ params: opts?.params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveAttrTypeInfo = (opts: {
  attrId: string;
  params?: RetrieveAttrTypeInfoParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<Attribute>>({
    ...opts.options,
    path: getRetrieveAttrTypeInfoUrl({
      attrId: opts.attrId,
      params: opts.params,
    }),
    method: "GET",
    returnFormat: "body",
  });
};

export const createContext = (opts: {
  context: { "@context": LdContext };
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<{ location: string }>({
    ...opts.options,
    path: getCreateContextUrl(),
    method: "POST",
    body: JSON.stringify(opts.context),
    returnFormat: "body",
  });
};

export const listContexts = (opts?: {
  params?: ListContextsParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<string[] | LdContextMetadata[]>({
    ...opts?.options,
    path: getListContextsUrl({ params: opts?.params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveContext = (opts: {
  contextId: string;
  params?: RetrieveContextParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<{ "@context"?: LdContext } | LdContextMetadata>({
    ...opts.options,
    path: getRetrieveContextUrl({
      contextId: opts.contextId,
      params: opts.params,
    }),
    method: "GET",
    returnFormat: "body",
  });
};

export const deleteContext = (opts: {
  contextId: string;
  params?: DeleteContextParams;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getDeleteContextUrl({
      contextId: opts.contextId,
      params: opts.params,
    }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const retrieveEntityMap = (opts: {
  entityMapId: string;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<EntityMap>>({
    ...opts.options,
    path: getRetrieveEntityMapUrl({ entityMapId: opts.entityMapId }),
    method: "GET",
    returnFormat: "body",
  });
};

export const updateEntityMap = (opts: {
  entityMapId: string;
  entityMap: WithContext<NonReadonly<EntityMap>>;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getUpdateEntityMapUrl({ entityMapId: opts.entityMapId }),
    method: "PATCH",
    body: JSON.stringify(opts.entityMap),
    returnFormat: "body",
  });
};

export const deleteEntityMap = (opts: {
  entityMapId: string;
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<void>({
    ...opts.options,
    path: getDeleteEntityMapUrl({ entityMapId: opts.entityMapId }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const retrieveCSIdentityInfo = (opts?: {
  options?: NgsiLdRequestOpts;
}) => {
  return fetcher<WithContext<ContextSourceIdentity>>({
    ...opts?.options,
    path: getRetrieveCSIdentityInfoUrl(),
    method: "GET",
    returnFormat: "body",
  });
};

type NonReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};

type CreateEntityResponse =
  | {
      status: 201;
      location: string;
    }
  | {
      data: BatchOperationResult;
      status: 207;
    };

type DeleteEntityResponse =
  | {
      status: 204;
    }
  | {
      data: BatchOperationResult;
      status: 207;
    };

type MergeEntityResponse =
  | {
      status: 204;
    }
  | {
      data: BatchOperationResult;
      status: 207;
    };

type ReplaceEntityResponse =
  | {
      status: 204;
    }
  | {
      data: BatchOperationResult;
      status: 207;
    };

type AppendAttrsResponse =
  | {
      status: 204;
    }
  | {
      data: UpdateResult;
      status: 207;
    };

type UpdateEntityResponse =
  | {
      status: 204;
    }
  | {
      data: UpdateResult;
      status: 207;
    };

type UpdateAttrsResponse =
  | {
      status: 204;
    }
  | {
      data: UpdateResult;
      status: 207;
    };

type DeleteAttrsResponse =
  | {
      status: 204;
    }
  | {
      data: UpdateResult;
      status: 207;
    };

type ReplaceAttrsResponse =
  | {
      status: 204;
    }
  | {
      data: UpdateResult;
      status: 207;
    };

type CreateBatchResponse =
  | {
      data: string[];
      status: 201;
    }
  | {
      data: BatchOperationResult;
      status: 207;
    };

type UpsertBatchResponse =
  | {
      status: 201;
      location: string;
    }
  | {
      status: 204;
    }
  | {
      status: 207;
      data: BatchOperationResult;
    };

type UpdateBatchResponse =
  | {
      status: 204;
    }
  | {
      data: BatchOperationResult;
      status: 207;
    };

type DeleteBatchResponse =
  | {
      status: 204;
    }
  | {
      data: BatchOperationResult;
      status: 207;
    };

type MergeBatchResponse =
  | {
      status: 204;
    }
  | {
      data: BatchOperationResult;
      status: 207;
    };

type UpsertTemporalResponse =
  | {
      status: 201;
      location: string;
    }
  | {
      status: 204;
    };
