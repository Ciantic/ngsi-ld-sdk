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

import { fetcher, NgsiLdRequestOpts } from "../fetcher";

export const createEntity = <T extends Entity = Entity>(
  entity: WithContext<NonReadonly<T>>,
  params?: CreateEntityParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<CreateEntityResponse>(getCreateEntityUrl({ params }), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(entity),
  });
};

export const queryEntity = <T extends Entity = Entity>(
  params?: QueryEntityParams<T["type"] extends string ? T["type"] : string>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<T>[]>(
    getQueryEntityUrl<T["type"] extends string ? T["type"] : string>({
      params,
    }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const queryGeoEntity = <T extends Entity = Entity>(
  params?: QueryEntityParams<T["type"] extends string ? T["type"] : string>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<FeatureCollection<T>>(
    getQueryEntityUrl<T["type"] extends string ? T["type"] : string>({
      params,
    }),
    {
      ...options,
      method: "GET",
      headers: { Accept: "application/geo+json", ...options?.headers },
      returnFormat: "body",
    },
  );
};

export const retrieveEntity = <T extends Entity = Entity>(
  entityId: string,
  params?: RetrieveEntityParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<T>>(getRetrieveEntityUrl({ entityId, params }), {
    ...options,
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveGeoEntity = <T extends Entity = Entity>(
  entityId: string,
  params?: Omit<RetrieveEntityParams, "options">,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<Feature<T>>(getRetrieveEntityUrl({ entityId, params }), {
    ...options,
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
  return fetcher<DeleteEntityResponse>(
    getDeleteEntityUrl({ entityId, params }),
    {
      ...options,
      method: "DELETE",
    },
  );
};

export const mergeEntity = <T extends Entity = Entity>(
  entityId: string,
  entityFragment: WithContext<NonReadonly<Partial<T>>>,
  params?: MergeEntityParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<MergeEntityResponse>(getMergeEntityUrl({ entityId, params }), {
    ...options,
    method: "PATCH",
    headers: { ...options?.headers },
    body: JSON.stringify(entityFragment),
  });
};

export const replaceEntity = <T extends Entity = Entity>(
  entityId: string,
  entityFragment: WithContext<NonReadonly<Partial<T>>>,
  params?: ReplaceEntityParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<ReplaceEntityResponse>(
    getReplaceEntityUrl({ entityId, params }),
    {
      ...options,
      method: "PUT",
      headers: { ...options?.headers },
      body: JSON.stringify(entityFragment),
    },
  );
};

export const appendAttrs = <T extends Entity = Entity>(
  entityId: string,
  entityFragment: WithContext<NonReadonly<Partial<T>>>,
  params?: AppendAttrsParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<AppendAttrsResponse>(getAppendAttrsUrl({ entityId, params }), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(entityFragment),
  });
};

export const updateEntity = <T extends Entity = Entity>(
  entityId: string,
  entityFragment: WithContext<NonReadonly<Partial<T>>>,
  params?: UpdateEntityParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<UpdateEntityResponse>(
    getUpdateEntityUrl({ entityId, params }),
    {
      ...options,
      method: "PATCH",
      headers: { ...options?.headers },
      body: JSON.stringify(entityFragment),
    },
  );
};

export const updateAttrs = (
  entityId: string,
  attrId: string,
  attr: WithContext<NgsildAttribute>,
  params?: UpdateAttrsParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<UpdateAttrsResponse>(
    getUpdateAttrsUrl({ entityId, attrId, params }),
    {
      ...options,
      method: "PATCH",
      headers: { ...options?.headers },
      body: JSON.stringify(attr),
    },
  );
};

export const deleteAttrs = (
  entityId: string,
  attrId: string,
  params?: DeleteAttrsParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<DeleteAttrsResponse>(
    getDeleteAttrsUrl({ entityId, attrId, params }),
    {
      ...options,
      method: "DELETE",
    },
  );
};

export const replaceAttrs = (
  entityId: string,
  attrId: string,
  attr: WithContext<NgsildAttribute>,
  params?: ReplaceAttrsParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<ReplaceAttrsResponse>(
    getReplaceAttrsUrl({ entityId, attrId, params }),
    {
      ...options,
      method: "PUT",
      headers: { ...options?.headers },
      body: JSON.stringify(attr),
    },
  );
};

export const createCSR = (
  csr: WithContext<NonReadonly<CsourceRegistration>>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<{ location: string }>(getCreateCSRUrl(), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(csr),
    returnFormat: "body",
  });
};

export const queryCSR = (
  params?: QueryCSRParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<CsourceRegistration>[]>(
    getQueryCSRUrl({ params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveCSR = (
  registrationId: string,
  params?: RetrieveCSRParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<CsourceRegistration>>(
    getRetrieveCSRUrl({ registrationId, params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const updateCSR = (
  registrationId: string,
  csrFragment: WithContext<NonReadonly<Partial<CsourceRegistration>>>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>(getUpdateCSRUrl({ registrationId }), {
    ...options,
    method: "PATCH",
    headers: { ...options?.headers },
    body: JSON.stringify(csrFragment),
    returnFormat: "body",
  });
};

export const deleteCSR = (
  registrationId: string,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>(getDeleteCSRUrl({ registrationId }), {
    ...options,
    method: "DELETE",
    returnFormat: "body",
  });
};

export const createSubscription = (
  subscription: WithContext<Subscription>,
  params?: CreateSubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<{ location: string }>(getCreateSubscriptionUrl({ params }), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(subscription),
    returnFormat: "body",
  });
};

export const querySubscription = (
  params?: QuerySubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<Subscription>[]>(
    getQuerySubscriptionUrl({ params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveSubscription = (
  subscriptionId: string,
  params?: RetrieveSubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<Subscription>>(
    getRetrieveSubscriptionUrl({ subscriptionId, params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const updateSubscription = (
  subscriptionId: string,
  subscriptionFragment: WithContext<Partial<Subscription>>,
  params?: UpdateSubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>(getUpdateSubscriptionUrl({ subscriptionId, params }), {
    ...options,
    method: "PATCH",
    headers: { ...options?.headers },
    body: JSON.stringify(subscriptionFragment),
    returnFormat: "body",
  });
};

export const deleteSubscription = (
  subscriptionId: string,
  params?: DeleteSubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>(getDeleteSubscriptionUrl({ subscriptionId, params }), {
    ...options,
    method: "DELETE",
    returnFormat: "body",
  });
};

export const createCSRSubscription = (
  csrSubscription: WithContext<Subscription>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<{ location: string }>(getCreateCSRSubscriptionUrl(), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(csrSubscription),
    returnFormat: "body",
  });
};

export const queryCSRSubscription = (
  params?: QueryCSRSubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<Subscription>[]>(
    getQueryCSRSubscriptionUrl({ params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveCSRSubscription = (
  subscriptionId: string,
  params?: RetrieveCSRSubscriptionParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<Subscription>>(
    getRetrieveCSRSubscriptionUrl({ subscriptionId, params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const updateCSRSubscription = (
  csrSubscriptionId: string,
  csrSubscriptionFragment: WithContext<Partial<Subscription>>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>(
    getUpdateCSRSubscriptionUrl({ subscriptionId: csrSubscriptionId }),
    {
      ...options,
      method: "PATCH",
      headers: { ...options?.headers },
      body: JSON.stringify(csrSubscriptionFragment),
      returnFormat: "body",
    },
  );
};

export const deleteCSRSubscription = (
  csrSubscriptionId: string,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>(
    getDeleteCSRSubscriptionUrl({ subscriptionId: csrSubscriptionId }),
    {
      ...options,
      method: "DELETE",
      returnFormat: "body",
    },
  );
};

export const createBatch = <T extends Entity = Entity>(
  entities: NonReadonly<MaybeContext<T>>[],
  params?: CreateBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<CreateBatchResponse>(getCreateBatchUrl({ params }), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(entities),
  });
};

export const upsertBatch = <T extends Entity = Entity>(
  entities: NonReadonly<MaybeContext<T>>[],
  params?: UpsertBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<UpsertBatchResponse>(getUpsertBatchUrl({ params }), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(entities),
  });
};

export const updateBatch = <T extends Entity = Entity>(
  entities: NonReadonly<MaybeContext<T>>[],
  params?: UpdateBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<UpdateBatchResponse>(getUpdateBatchUrl({ params }), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(entities),
  });
};

export const deleteBatch = (
  entityIds: string[],
  params?: DeleteBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<DeleteBatchResponse>(getDeleteBatchUrl({ params }), {
    ...options,
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
  return fetcher<WithContext<T>[]>(getQueryBatchUrl({ params }), {
    ...options,
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
  return fetcher<FeatureCollection<T>>(getQueryBatchUrl({ params }), {
    ...options,
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
  return fetcher<MergeBatchResponse>(getMergeBatchUrl({ params }), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(entities),
  });
};

export const upsertTemporal = <T extends Entity = Entity>(
  entityTemporal: WithContext<InferEntityTemporal<T>>,
  params?: UpsertTemporalParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<UpsertTemporalResponse>(getUpsertTemporalUrl({ params }), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(entityTemporal),
  });
};

export const queryTemporal = <T extends Entity = Entity>(
  params?: QueryTemporalParams<T["type"] extends string ? T["type"] : string>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<InferEntityTemporal<T>>[]>(
    getQueryTemporalUrl<T["type"] extends string ? T["type"] : string>({
      params,
    }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveTemporal = <T extends Entity = Entity>(
  entityId: string,
  params?: RetrieveTemporalParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<InferEntityTemporal<T>>>(
    getRetrieveTemporalUrl({ entityId, params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const deleteTemporal = (
  entityId: string,
  params?: DeleteTemporalParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>(getDeleteTemporalUrl({ entityId, params }), {
    ...options,
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
  return fetcher<void>(getAppendAttrsTemporalUrl({ entityId, params }), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
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
  return fetcher<void>(
    getDeleteAttrsTemporalUrl({ entityId, attrId, params }),
    {
      ...options,
      method: "DELETE",
      returnFormat: "body",
    },
  );
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
  return fetcher<void>(
    getUpdateAttrsTemporalUrl({ entityId, attrId, instanceId, params }),
    {
      ...options,
      method: "PATCH",
      headers: { ...options?.headers },
      body: JSON.stringify(attr),
      returnFormat: "body",
    },
  );
};

export const deleteAttrInstanceTemporal = (
  entityId: string,
  attrId: string,
  instanceId: string,
  params?: DeleteAttrInstanceTemporalParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>(
    getDeleteAttrInstanceTemporalUrl({ entityId, attrId, instanceId, params }),
    {
      ...options,
      method: "DELETE",
      returnFormat: "body",
    },
  );
};

export const temporalQueryBatch = <T extends Entity = Entity>(
  query: QueryTemporal,
  params?: TemporalQueryBatchParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<InferEntityTemporal<T>>[]>(
    getTemporalQueryBatchUrl({ params }),
    {
      ...options,
      method: "POST",
      // https://github.com/stellio-hub/stellio-context-broker/issues/1809
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(query),
      returnFormat: "body",
    },
  );
};

export const retrieveEntityTypes = (
  params?: RetrieveEntityTypesParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<EntityTypeList> | WithContext<EntityType>[]>(
    getRetrieveEntityTypesUrl({ params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveEntityTypeInfo = (
  type: string,
  params?: RetrieveEntityTypeInfoParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<EntityTypeInfo>>(
    getRetrieveEntityTypeInfoUrl({ type, params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveAttrTypes = (
  params?: RetrieveAttrTypesParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<AttributeList> | WithContext<Attribute>[]>(
    getRetrieveAttrTypesUrl({ params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveAttrTypeInfo = (
  attrId: string,
  params?: RetrieveAttrTypeInfoParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<Attribute>>(
    getRetrieveAttrTypeInfoUrl({ attrId, params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const createContext = (
  context: { "@context": LdContext },
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<{ location: string }>(getCreateContextUrl(), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(context),
    returnFormat: "body",
  });
};

export const listContexts = (
  params?: ListContextsParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<string[] | LdContextMetadata[]>(
    getListContextsUrl({ params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveContext = (
  contextId: string,
  params?: RetrieveContextParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<{ "@context"?: LdContext } | LdContextMetadata>(
    getRetrieveContextUrl({ contextId, params }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const deleteContext = (
  contextId: string,
  params?: DeleteContextParams,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>(getDeleteContextUrl({ contextId, params }), {
    ...options,
    method: "DELETE",
    returnFormat: "body",
  });
};

export const retrieveEntityMap = (
  entityMapId: string,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<WithContext<EntityMap>>(
    getRetrieveEntityMapUrl({ entityMapId }),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const updateEntityMap = (
  entityMapId: string,
  entityMap: WithContext<NonReadonly<EntityMap>>,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>(getUpdateEntityMapUrl({ entityMapId }), {
    ...options,
    method: "PATCH",
    headers: { ...options?.headers },
    body: JSON.stringify(entityMap),
    returnFormat: "body",
  });
};

export const deleteEntityMap = (
  entityMapId: string,
  options?: NgsiLdRequestOpts,
) => {
  return fetcher<void>(getDeleteEntityMapUrl({ entityMapId }), {
    ...options,
    method: "DELETE",
    returnFormat: "body",
  });
};

export const retrieveCSIdentityInfo = (options?: NgsiLdRequestOpts) => {
  return fetcher<WithContext<ContextSourceIdentity>>(
    getRetrieveCSIdentityInfoUrl(),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
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
