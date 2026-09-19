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

export const createEntity = <T extends Entity = Entity>(
  entity: WithContext<NonReadonly<T>>,
  params?: CreateEntityParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<CreateEntityResponse>({
    ...options,
    path: getCreateEntityUrl({ params }),
    method: "POST",
    body: JSON.stringify(entity),
  });
};

export const queryEntity = <T extends Entity = Entity>(
  params?: QueryEntityParams<T["type"] extends string ? T["type"] : string>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<T>[]>({
    ...options,
    path: getQueryEntityUrl<T["type"] extends string ? T["type"] : string>({
      params,
    }),
    method: "GET",
    returnFormat: "body",
  });
};

export const queryGeoEntity = <T extends Entity = Entity>(
  params?: QueryEntityParams<T["type"] extends string ? T["type"] : string>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<FeatureCollection<T>>({
    ...options,
    path: getQueryEntityUrl<T["type"] extends string ? T["type"] : string>({
      params,
    }),
    method: "GET",
    headers: { Accept: "application/geo+json", ...options?.headers },
    returnFormat: "body",
  });
};

export const retrieveEntity = <T extends Entity = Entity>(
  entityId: string,
  params?: RetrieveEntityParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<T>>({
    ...options,
    path: getRetrieveEntityUrl({ entityId, params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveGeoEntity = <T extends Entity = Entity>(
  entityId: string,
  params?: Omit<RetrieveEntityParams, "options">,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<Feature<T>>({
    ...options,
    path: getRetrieveEntityUrl({ entityId, params }),
    method: "GET",
    headers: { Accept: "application/geo+json", ...options?.headers },
    returnFormat: "body",
  });
};

export const deleteEntity = (
  entityId: string,
  params?: DeleteEntityParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<DeleteEntityResponse>({
    ...options,
    path: getDeleteEntityUrl({ entityId, params }),
    method: "DELETE",
  });
};

export const mergeEntity = <T extends Entity = Entity>(
  entityId: string,
  entityFragment: WithContext<NonReadonly<Partial<T>>>,
  params?: MergeEntityParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<MergeEntityResponse>({
    ...options,
    path: getMergeEntityUrl({ entityId, params }),
    method: "PATCH",
    body: JSON.stringify(entityFragment),
  });
};

export const replaceEntity = <T extends Entity = Entity>(
  entityId: string,
  entityFragment: WithContext<NonReadonly<Partial<T>>>,
  params?: ReplaceEntityParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<ReplaceEntityResponse>({
    ...options,
    path: getReplaceEntityUrl({ entityId, params }),
    method: "PUT",
    body: JSON.stringify(entityFragment),
  });
};

export const appendAttrs = <T extends Entity = Entity>(
  entityId: string,
  entityFragment: WithContext<NonReadonly<Partial<T>>>,
  params?: AppendAttrsParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<AppendAttrsResponse>({
    ...options,
    path: getAppendAttrsUrl({ entityId, params }),
    method: "POST",
    body: JSON.stringify(entityFragment),
  });
};

export const updateEntity = <T extends Entity = Entity>(
  entityId: string,
  entityFragment: WithContext<NonReadonly<Partial<T>>>,
  params?: UpdateEntityParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<UpdateEntityResponse>({
    ...options,
    path: getUpdateEntityUrl({ entityId, params }),
    method: "PATCH",
    body: JSON.stringify(entityFragment),
  });
};

export const updateAttrs = (
  entityId: string,
  attrId: string,
  attr: WithContext<NgsildAttribute>,
  params?: UpdateAttrsParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<UpdateAttrsResponse>({
    ...options,
    path: getUpdateAttrsUrl({ entityId, attrId, params }),
    method: "PATCH",
    body: JSON.stringify(attr),
  });
};

export const deleteAttrs = (
  entityId: string,
  attrId: string,
  params?: DeleteAttrsParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<DeleteAttrsResponse>({
    ...options,
    path: getDeleteAttrsUrl({ entityId, attrId, params }),
    method: "DELETE",
  });
};

export const replaceAttrs = (
  entityId: string,
  attrId: string,
  attr: WithContext<NgsildAttribute>,
  params?: ReplaceAttrsParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<ReplaceAttrsResponse>({
    ...options,
    path: getReplaceAttrsUrl({ entityId, attrId, params }),
    method: "PUT",
    body: JSON.stringify(attr),
  });
};

export const createCSR = (
  csr: WithContext<NonReadonly<CsourceRegistration>>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<{ location: string }>({
    ...options,
    path: getCreateCSRUrl(),
    method: "POST",
    body: JSON.stringify(csr),
    returnFormat: "body",
  });
};

export const queryCSR = (
  params?: QueryCSRParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<CsourceRegistration>[]>({
    ...options,
    path: getQueryCSRUrl({ params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveCSR = (
  registrationId: string,
  params?: RetrieveCSRParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<CsourceRegistration>>({
    ...options,
    path: getRetrieveCSRUrl({ registrationId, params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const updateCSR = (
  registrationId: string,
  csrFragment: WithContext<NonReadonly<Partial<CsourceRegistration>>>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getUpdateCSRUrl({ registrationId }),
    method: "PATCH",
    body: JSON.stringify(csrFragment),
    returnFormat: "body",
  });
};

export const deleteCSR = (
  registrationId: string,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getDeleteCSRUrl({ registrationId }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const createSubscription = (
  subscription: WithContext<Subscription>,
  params?: CreateSubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<{ location: string }>({
    ...options,
    path: getCreateSubscriptionUrl({ params }),
    method: "POST",
    body: JSON.stringify(subscription),
    returnFormat: "body",
  });
};

export const querySubscription = (
  params?: QuerySubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<Subscription>[]>({
    ...options,
    path: getQuerySubscriptionUrl({ params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveSubscription = (
  subscriptionId: string,
  params?: RetrieveSubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<Subscription>>({
    ...options,
    path: getRetrieveSubscriptionUrl({ subscriptionId, params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const updateSubscription = (
  subscriptionId: string,
  subscriptionFragment: WithContext<Partial<Subscription>>,
  params?: UpdateSubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getUpdateSubscriptionUrl({ subscriptionId, params }),
    method: "PATCH",
    body: JSON.stringify(subscriptionFragment),
    returnFormat: "body",
  });
};

export const deleteSubscription = (
  subscriptionId: string,
  params?: DeleteSubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getDeleteSubscriptionUrl({ subscriptionId, params }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const createCSRSubscription = (
  csrSubscription: WithContext<Subscription>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<{ location: string }>({
    ...options,
    path: getCreateCSRSubscriptionUrl(),
    method: "POST",
    body: JSON.stringify(csrSubscription),
    returnFormat: "body",
  });
};

export const queryCSRSubscription = (
  params?: QueryCSRSubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<Subscription>[]>({
    ...options,
    path: getQueryCSRSubscriptionUrl({ params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveCSRSubscription = (
  subscriptionId: string,
  params?: RetrieveCSRSubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<Subscription>>({
    ...options,
    path: getRetrieveCSRSubscriptionUrl({ subscriptionId, params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const updateCSRSubscription = (
  csrSubscriptionId: string,
  csrSubscriptionFragment: WithContext<Partial<Subscription>>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getUpdateCSRSubscriptionUrl({ subscriptionId: csrSubscriptionId }),
    method: "PATCH",
    body: JSON.stringify(csrSubscriptionFragment),
    returnFormat: "body",
  });
};

export const deleteCSRSubscription = (
  csrSubscriptionId: string,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getDeleteCSRSubscriptionUrl({ subscriptionId: csrSubscriptionId }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const createBatch = <T extends Entity = Entity>(
  entities: NonReadonly<MaybeContext<T>>[],
  params?: CreateBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<CreateBatchResponse>({
    ...options,
    path: getCreateBatchUrl({ params }),
    method: "POST",
    body: JSON.stringify(entities),
  });
};

export const upsertBatch = <T extends Entity = Entity>(
  entities: NonReadonly<MaybeContext<T>>[],
  params?: UpsertBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<UpsertBatchResponse>({
    ...options,
    path: getUpsertBatchUrl({ params }),
    method: "POST",
    body: JSON.stringify(entities),
  });
};

export const updateBatch = <T extends Entity = Entity>(
  entities: NonReadonly<MaybeContext<T>>[],
  params?: UpdateBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<UpdateBatchResponse>({
    ...options,
    path: getUpdateBatchUrl({ params }),
    method: "POST",
    body: JSON.stringify(entities),
  });
};

export const deleteBatch = (
  entityIds: string[],
  params?: DeleteBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<DeleteBatchResponse>({
    ...options,
    path: getDeleteBatchUrl({ params }),
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(entityIds),
  });
};

export const queryBatch = <T extends Entity = Entity>(
  query: Query,
  params?: QueryBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<T>[]>({
    ...options,
    path: getQueryBatchUrl({ params }),
    method: "POST",
    // https://github.com/stellio-hub/stellio-context-broker/issues/1809
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(query),
    returnFormat: "body",
  });
};

export const queryGeoBatch = <T extends Entity = Entity>(
  query: Query,
  params?: QueryBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<FeatureCollection<T>>({
    ...options,
    path: getQueryBatchUrl({ params }),
    method: "POST",
    headers: {
      // https://github.com/stellio-hub/stellio-context-broker/issues/1809
      "Content-Type": "application/json",
      Accept: "application/geo+json",
      ...options?.headers,
    },
    body: JSON.stringify(query),
    returnFormat: "body",
  });
};

export const mergeBatch = <T extends Entity = Entity>(
  entities: NonReadonly<MaybeContext<T>>[],
  params?: MergeBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<MergeBatchResponse>({
    ...options,
    path: getMergeBatchUrl({ params }),
    method: "POST",
    body: JSON.stringify(entities),
  });
};

export const upsertTemporal = <T extends Entity = Entity>(
  entityTemporal: WithContext<InferEntityTemporal<T>>,
  params?: UpsertTemporalParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<UpsertTemporalResponse>({
    ...options,
    path: getUpsertTemporalUrl({ params }),
    method: "POST",
    body: JSON.stringify(entityTemporal),
  });
};

export const queryTemporal = <T extends Entity = Entity>(
  params?: QueryTemporalParams<T["type"] extends string ? T["type"] : string>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<InferEntityTemporal<T>>[]>({
    ...options,
    path: getQueryTemporalUrl<T["type"] extends string ? T["type"] : string>({
      params,
    }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveTemporal = <T extends Entity = Entity>(
  entityId: string,
  params?: RetrieveTemporalParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<InferEntityTemporal<T>>>({
    ...options,
    path: getRetrieveTemporalUrl({ entityId, params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const deleteTemporal = (
  entityId: string,
  params?: DeleteTemporalParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getDeleteTemporalUrl({ entityId, params }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const appendAttrsTemporal = <T extends Entity = Entity>(
  entityId: string,
  entityTemporalFragment: WithContext<Partial<InferEntityTemporal<T>>>,
  params?: AppendAttrsTemporalParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getAppendAttrsTemporalUrl({ entityId, params }),
    method: "POST",
    body: JSON.stringify(entityTemporalFragment),
    returnFormat: "body",
  });
};

export const deleteAttrsTemporal = (
  entityId: string,
  attrId: string,
  params?: DeleteAttrsTemporalParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getDeleteAttrsTemporalUrl({ entityId, attrId, params }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const updateAttrsTemporal = (
  entityId: string,
  attrId: string,
  instanceId: string,

  // Bare attribute *instance* (Property/Relationship + observedAt), NOT an
  // entity-temporal fragment — despite the yaml spec ref to
  // EntityTemporalFragment for this operation.
  attr: WithContext<RequiredObservedAt<NgsildAttribute>>,
  params?: UpdateAttrsTemporalParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getUpdateAttrsTemporalUrl({ entityId, attrId, instanceId, params }),
    method: "PATCH",
    body: JSON.stringify(attr),
    returnFormat: "body",
  });
};

export const deleteAttrInstanceTemporal = (
  entityId: string,
  attrId: string,
  instanceId: string,
  params?: DeleteAttrInstanceTemporalParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getDeleteAttrInstanceTemporalUrl({
      entityId,
      attrId,
      instanceId,
      params,
    }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const temporalQueryBatch = <T extends Entity = Entity>(
  query: QueryTemporal,
  params?: TemporalQueryBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<InferEntityTemporal<T>>[]>({
    ...options,
    path: getTemporalQueryBatchUrl({ params }),
    method: "POST",
    // https://github.com/stellio-hub/stellio-context-broker/issues/1809
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(query),
    returnFormat: "body",
  });
};

export const retrieveEntityTypes = (
  params?: RetrieveEntityTypesParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<EntityTypeList> | WithContext<EntityType>[]>({
    ...options,
    path: getRetrieveEntityTypesUrl({ params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveEntityTypeInfo = (
  type: string,
  params?: RetrieveEntityTypeInfoParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<EntityTypeInfo>>({
    ...options,
    path: getRetrieveEntityTypeInfoUrl({ type, params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveAttrTypes = (
  params?: RetrieveAttrTypesParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<AttributeList> | WithContext<Attribute>[]>({
    ...options,
    path: getRetrieveAttrTypesUrl({ params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveAttrTypeInfo = (
  attrId: string,
  params?: RetrieveAttrTypeInfoParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<Attribute>>({
    ...options,
    path: getRetrieveAttrTypeInfoUrl({ attrId, params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const createContext = (
  context: { "@context": LdContext },
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<{ location: string }>({
    ...options,
    path: getCreateContextUrl(),
    method: "POST",
    body: JSON.stringify(context),
    returnFormat: "body",
  });
};

export const listContexts = (
  params?: ListContextsParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<string[] | LdContextMetadata[]>({
    ...options,
    path: getListContextsUrl({ params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveContext = (
  contextId: string,
  params?: RetrieveContextParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<{ "@context"?: LdContext } | LdContextMetadata>({
    ...options,
    path: getRetrieveContextUrl({ contextId, params }),
    method: "GET",
    returnFormat: "body",
  });
};

export const deleteContext = (
  contextId: string,
  params?: DeleteContextParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getDeleteContextUrl({ contextId, params }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const retrieveEntityMap = (
  entityMapId: string,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<EntityMap>>({
    ...options,
    path: getRetrieveEntityMapUrl({ entityMapId }),
    method: "GET",
    returnFormat: "body",
  });
};

export const updateEntityMap = (
  entityMapId: string,
  entityMap: WithContext<NonReadonly<EntityMap>>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getUpdateEntityMapUrl({ entityMapId }),
    method: "PATCH",
    body: JSON.stringify(entityMap),
    returnFormat: "body",
  });
};

export const deleteEntityMap = (
  entityMapId: string,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>({
    ...options,
    path: getDeleteEntityMapUrl({ entityMapId }),
    method: "DELETE",
    returnFormat: "body",
  });
};

export const retrieveCSIdentityInfo = (options?: NgsiLdRequestOpts) => {
  return fetcher<WithContext<ContextSourceIdentity>>({
    ...options,
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
