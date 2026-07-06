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

export const createEntity = <T extends Entity = Entity>(
  createEntityBody?: WithContext<NonReadonly<T>>,
  params?: Parameters<typeof getCreateEntityUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<CreateEntityResponse>(getCreateEntityUrl(params), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(createEntityBody),
  });
};

export const queryEntity = <T extends Entity = Entity>(
  params?: Parameters<
    typeof getQueryEntityUrl<T["type"] extends string ? T["type"] : string>
  >[0],
  options?: RequestInit,
) => {
  return fetcher<WithContext<T>[]>(
    getQueryEntityUrl<T["type"] extends string ? T["type"] : string>(params),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const queryGeoEntity = <T extends Entity = Entity>(
  params?: Parameters<
    typeof getQueryEntityUrl<T["type"] extends string ? T["type"] : string>
  >[0],
  options?: RequestInit,
) => {
  return fetcher<FeatureCollection<T>>(
    getQueryEntityUrl<T["type"] extends string ? T["type"] : string>(params),
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
  params?: Parameters<typeof getRetrieveEntityUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<WithContext<T>>(getRetrieveEntityUrl(entityId, params), {
    ...options,
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveGeoEntity = <T extends Entity = Entity>(
  entityId: string,
  params?: Omit<Parameters<typeof getRetrieveEntityUrl>[1], "options">,
  options?: RequestInit,
) => {
  return fetcher<Feature<T>>(getRetrieveEntityUrl(entityId, params), {
    ...options,
    method: "GET",
    headers: { Accept: "application/geo+json", ...options?.headers },
    returnFormat: "body",
  });
};

export const deleteEntity = (
  entityId: string,
  params?: Parameters<typeof getDeleteEntityUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<DeleteEntityResponse>(getDeleteEntityUrl(entityId, params), {
    ...options,
    method: "DELETE",
  });
};

export const mergeEntity = <T extends Entity = Entity>(
  entityId: string,

  // TODO: How to ensure there is no extra parameters in mergeEntityBody?
  mergeEntityBody?: WithContext<NonReadonly<Partial<T>>>,
  params?: Parameters<typeof getMergeEntityUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<MergeEntityResponse>(getMergeEntityUrl(entityId, params), {
    ...options,
    method: "PATCH",
    headers: { ...options?.headers },
    body: JSON.stringify(mergeEntityBody),
  });
};

export const replaceEntity = <T extends Entity = Entity>(
  entityId: string,
  replaceEntityBody?: WithContext<NonReadonly<Partial<T>>>,
  params?: Parameters<typeof getReplaceEntityUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<ReplaceEntityResponse>(getReplaceEntityUrl(entityId, params), {
    ...options,
    method: "PUT",
    headers: { ...options?.headers },
    body: JSON.stringify(replaceEntityBody),
  });
};

export const appendAttrs = <T extends Entity = Entity>(
  entityId: string,
  appendAttrsBody?: WithContext<NonReadonly<Partial<T>>>,
  params?: Parameters<typeof getAppendAttrsUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<AppendAttrsResponse>(getAppendAttrsUrl(entityId, params), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(appendAttrsBody),
  });
};

export const updateEntity = <T extends Entity = Entity>(
  entityId: string,
  updateEntityBody?: WithContext<NonReadonly<Partial<T>>>,
  params?: Parameters<typeof getUpdateEntityUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<UpdateEntityResponse>(getUpdateEntityUrl(entityId, params), {
    ...options,
    method: "PATCH",
    headers: { ...options?.headers },
    body: JSON.stringify(updateEntityBody),
  });
};

export const updateAttrs = (
  entityId: string,
  attrId: string,
  attributeFragmentBody?: WithContext<NgsildAttribute>,
  params?: Parameters<typeof getUpdateAttrsUrl>[2],
  options?: RequestInit,
) => {
  return fetcher<UpdateAttrsResponse>(
    getUpdateAttrsUrl(entityId, attrId, params),
    {
      ...options,
      method: "PATCH",
      headers: { ...options?.headers },
      body: JSON.stringify(attributeFragmentBody),
    },
  );
};

export const deleteAttrs = (
  entityId: string,
  attrId: string,
  params?: Parameters<typeof getDeleteAttrsUrl>[2],
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

export const replaceAttrs = (
  entityId: string,
  attrId: string,
  attributeFragmentBody?: WithContext<NgsildAttribute>,
  params?: Parameters<typeof getReplaceAttrsUrl>[2],
  options?: RequestInit,
) => {
  return fetcher<ReplaceAttrsResponse>(
    getReplaceAttrsUrl(entityId, attrId, params),
    {
      ...options,
      method: "PUT",
      headers: { ...options?.headers },
      body: JSON.stringify(attributeFragmentBody),
    },
  );
};

export const createCSR = (
  createCSRBody?: WithContext<NonReadonly<CsourceRegistration>>,
  options?: RequestInit,
) => {
  return fetcher<{ location: string }>(getCreateCSRUrl(), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(createCSRBody),
    returnFormat: "body",
  });
};

export const queryCSR = (
  params?: Parameters<typeof getQueryCSRUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<WithContext<CsourceRegistration>[]>(getQueryCSRUrl(params), {
    ...options,
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveCSR = (
  registrationId: string,
  params?: Parameters<typeof getRetrieveCSRUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<WithContext<CsourceRegistration>>(
    getRetrieveCSRUrl(registrationId, params),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const updateCSR = (
  registrationId: string,
  updateCSRBody?: WithContext<NonReadonly<Partial<CsourceRegistration>>>,
  options?: RequestInit,
) => {
  return fetcher<void>(getUpdateCSRUrl(registrationId), {
    ...options,
    method: "PATCH",
    headers: { ...options?.headers },
    body: JSON.stringify(updateCSRBody),
    returnFormat: "body",
  });
};

export const deleteCSR = (registrationId: string, options?: RequestInit) => {
  return fetcher<void>(getDeleteCSRUrl(registrationId), {
    ...options,
    method: "DELETE",
    returnFormat: "body",
  });
};

export const createSubscription = (
  subscriptionBody?: WithContext<Subscription>,
  params?: Parameters<typeof getCreateSubscriptionUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<{ location: string }>(getCreateSubscriptionUrl(params), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(subscriptionBody),
    returnFormat: "body",
  });
};

export const querySubscription = (
  params?: Parameters<typeof getQuerySubscriptionUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<WithContext<Subscription>[]>(getQuerySubscriptionUrl(params), {
    ...options,
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveSubscription = (
  subscriptionId: string,
  params?: Parameters<typeof getRetrieveSubscriptionUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<WithContext<Subscription>>(
    getRetrieveSubscriptionUrl(subscriptionId, params),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const updateSubscription = (
  subscriptionId: string,
  subscriptionFragmentBody?: WithContext<Partial<Subscription>>,
  params?: Parameters<typeof getUpdateSubscriptionUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<void>(getUpdateSubscriptionUrl(subscriptionId, params), {
    ...options,
    method: "PATCH",
    headers: { ...options?.headers },
    body: JSON.stringify(subscriptionFragmentBody),
    returnFormat: "body",
  });
};

export const deleteSubscription = (
  subscriptionId: string,
  params?: Parameters<typeof getDeleteSubscriptionUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<void>(getDeleteSubscriptionUrl(subscriptionId, params), {
    ...options,
    method: "DELETE",
    returnFormat: "body",
  });
};

export const createCSRSubscription = (
  subscriptionBody?: WithContext<Subscription>,
  options?: RequestInit,
) => {
  return fetcher<{ location: string }>(getCreateCSRSubscriptionUrl(), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(subscriptionBody),
    returnFormat: "body",
  });
};

export const queryCSRSubscription = (
  params?: Parameters<typeof getQueryCSRSubscriptionUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<WithContext<Subscription>[]>(
    getQueryCSRSubscriptionUrl(params),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveCSRSubscription = (
  subscriptionId: string,
  params?: Parameters<typeof getRetrieveCSRSubscriptionUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<WithContext<Subscription>>(
    getRetrieveCSRSubscriptionUrl(subscriptionId, params),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const updateCSRSubscription = (
  subscriptionId: string,
  subscriptionFragmentBody?: WithContext<Partial<Subscription>>,
  options?: RequestInit,
) => {
  return fetcher<void>(getUpdateCSRSubscriptionUrl(subscriptionId), {
    ...options,
    method: "PATCH",
    headers: { ...options?.headers },
    body: JSON.stringify(subscriptionFragmentBody),
    returnFormat: "body",
  });
};

export const deleteCSRSubscription = (
  subscriptionId: string,
  options?: RequestInit,
) => {
  return fetcher<void>(getDeleteCSRSubscriptionUrl(subscriptionId), {
    ...options,
    method: "DELETE",
    returnFormat: "body",
  });
};

export const createBatch = <T extends Entity = Entity>(
  createBatchBodyItem?: NonReadonly<MaybeContext<T>>[],
  params?: Parameters<typeof getCreateBatchUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<CreateBatchResponse>(getCreateBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(createBatchBodyItem),
  });
};

export const upsertBatch = <T extends Entity = Entity>(
  upsertBatchBodyItem?: NonReadonly<MaybeContext<T>>[],
  params?: Parameters<typeof getUpsertBatchUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<UpsertBatchResponse>(getUpsertBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(upsertBatchBodyItem),
  });
};

export const updateBatch = <T extends Entity = Entity>(
  updateBatchBodyItem?: NonReadonly<MaybeContext<T>>[],
  params?: Parameters<typeof getUpdateBatchUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<UpdateBatchResponse>(getUpdateBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(updateBatchBodyItem),
  });
};

export const deleteBatch = (
  deleteBatchBody?: string[],
  params?: Parameters<typeof getDeleteBatchUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<DeleteBatchResponse>(getDeleteBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(deleteBatchBody),
  });
};

export const queryBatch = <T extends Entity = Entity>(
  query?: Query,
  params?: Parameters<typeof getQueryBatchUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<WithContext<T>[]>(getQueryBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(query),
    returnFormat: "body",
  });
};

export const queryGeoBatch = <T extends Entity = Entity>(
  query?: Query,
  params?: Parameters<typeof getQueryBatchUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<FeatureCollection<T>>(getQueryBatchUrl(params), {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/geo+json",
      ...options?.headers,
    },
    body: JSON.stringify(query),
    returnFormat: "body",
  });
};

export const mergeBatch = <T extends Entity = Entity>(
  mergeBatchBodyItem?: NonReadonly<MaybeContext<T>>[],
  params?: Parameters<typeof getMergeBatchUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<MergeBatchResponse>(getMergeBatchUrl(params), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(mergeBatchBodyItem),
  });
};

export const upsertTemporal = <T extends Entity = Entity>(
  entityTemporalBody?: WithContext<InferEntityTemporal<T>>,
  params?: Parameters<typeof getUpsertTemporalUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<UpsertTemporalResponse>(getUpsertTemporalUrl(params), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(entityTemporalBody),
  });
};

export const queryTemporal = <T extends Entity = Entity>(
  params?: Parameters<
    typeof getQueryTemporalUrl<T["type"] extends string ? T["type"] : string>
  >[0],
  options?: RequestInit,
) => {
  return fetcher<WithContext<InferEntityTemporal<T>>[]>(
    getQueryTemporalUrl<T["type"] extends string ? T["type"] : string>(params),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveTemporal = <T extends Entity = Entity>(
  entityId: string,
  params?: Parameters<typeof getRetrieveTemporalUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<WithContext<InferEntityTemporal<T>>>(
    getRetrieveTemporalUrl(entityId, params),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const deleteTemporal = (
  entityId: string,
  params?: Parameters<typeof getDeleteTemporalUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<void>(getDeleteTemporalUrl(entityId, params), {
    ...options,
    method: "DELETE",
    returnFormat: "body",
  });
};

export const appendAttrsTemporal = <T extends Entity = Entity>(
  entityId: string,
  entityTemporalFragmentBody?: WithContext<Partial<InferEntityTemporal<T>>>,
  params?: Parameters<typeof getAppendAttrsTemporalUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<void>(getAppendAttrsTemporalUrl(entityId, params), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(entityTemporalFragmentBody),
    returnFormat: "body",
  });
};

export const deleteAttrsTemporal = (
  entityId: string,
  attrId: string,
  params?: Parameters<typeof getDeleteAttrsTemporalUrl>[2],
  options?: RequestInit,
) => {
  return fetcher<void>(getDeleteAttrsTemporalUrl(entityId, attrId, params), {
    ...options,
    method: "DELETE",
    returnFormat: "body",
  });
};

export const updateAttrsTemporal = (
  entityId: string,
  attrId: string,
  instanceId: string,
  temporalAttrFragmentBody?: WithContext<RequiredObservedAt<NgsildAttribute>>,
  params?: Parameters<typeof getUpdateAttrsTemporalUrl>[3],
  options?: RequestInit,
) => {
  return fetcher<void>(
    getUpdateAttrsTemporalUrl(entityId, attrId, instanceId, params),
    {
      ...options,
      method: "PATCH",
      headers: { ...options?.headers },
      body: temporalAttrFragmentBody
        ? JSON.stringify(temporalAttrFragmentBody)
        : undefined,
      returnFormat: "body",
    },
  );
};

export const deleteAttrInstanceTemporal = (
  entityId: string,
  attrId: string,
  instanceId: string,
  params?: Parameters<typeof getDeleteAttrInstanceTemporalUrl>[3],
  options?: RequestInit,
) => {
  return fetcher<void>(
    getDeleteAttrInstanceTemporalUrl(entityId, attrId, instanceId, params),
    {
      ...options,
      method: "DELETE",
      returnFormat: "body",
    },
  );
};

export const temporalQueryBatch = <T extends Entity = Entity>(
  queryTemporalBody: QueryTemporal,
  params?: Parameters<typeof getTemporalQueryBatchUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<WithContext<InferEntityTemporal<T>>[]>(
    getTemporalQueryBatchUrl(params),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(queryTemporalBody),
      returnFormat: "body",
    },
  );
};

export const retrieveEntityTypes = (
  params?: Parameters<typeof getRetrieveEntityTypesUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<WithContext<EntityTypeList> | WithContext<EntityType>[]>(
    getRetrieveEntityTypesUrl(params),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveEntityTypeInfo = (
  type: string,
  params?: Parameters<typeof getRetrieveEntityTypeInfoUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<WithContext<EntityTypeInfo>>(
    getRetrieveEntityTypeInfoUrl(type, params),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveAttrTypes = (
  params?: Parameters<typeof getRetrieveAttrTypesUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<WithContext<AttributeList> | WithContext<Attribute>[]>(
    getRetrieveAttrTypesUrl(params),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const retrieveAttrTypeInfo = (
  attrId: string,
  params?: Parameters<typeof getRetrieveAttrTypeInfoUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<WithContext<Attribute>>(
    getRetrieveAttrTypeInfoUrl(attrId, params),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const createContext = (
  createContextBody?: { "@context": LdContext },
  options?: RequestInit,
) => {
  return fetcher<{ location: string }>(getCreateContextUrl(), {
    ...options,
    method: "POST",
    headers: { ...options?.headers },
    body: JSON.stringify(createContextBody),
    returnFormat: "body",
  });
};

export const listContexts = (
  params?: Parameters<typeof getListContextsUrl>[0],
  options?: RequestInit,
) => {
  return fetcher<string[] | LdContextMetadata[]>(getListContextsUrl(params), {
    ...options,
    method: "GET",
    returnFormat: "body",
  });
};

export const retrieveContext = (
  contextId: string,
  params?: Parameters<typeof getRetrieveContextUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<{ "@context"?: LdContext } | LdContextMetadata>(
    getRetrieveContextUrl(contextId, params),
    {
      ...options,
      method: "GET",
      returnFormat: "body",
    },
  );
};

export const deleteContext = (
  contextId: string,
  params?: Parameters<typeof getDeleteContextUrl>[1],
  options?: RequestInit,
) => {
  return fetcher<void>(getDeleteContextUrl(contextId, params), {
    ...options,
    method: "DELETE",
    returnFormat: "body",
  });
};

export const retrieveEntityMap = (
  entityMapId: string,
  options?: RequestInit,
) => {
  return fetcher<WithContext<EntityMap>>(getRetrieveEntityMapUrl(entityMapId), {
    ...options,
    method: "GET",
    returnFormat: "body",
  });
};

export const updateEntityMap = (
  entityMapId: string,
  updateEntityMapBody?: WithContext<NonReadonly<EntityMap>>,
  options?: RequestInit,
) => {
  return fetcher<void>(getUpdateEntityMapUrl(entityMapId), {
    ...options,
    method: "PATCH",
    headers: { ...options?.headers },
    body: JSON.stringify(updateEntityMapBody),
    returnFormat: "body",
  });
};

export const deleteEntityMap = (entityMapId: string, options?: RequestInit) => {
  return fetcher<void>(getDeleteEntityMapUrl(entityMapId), {
    ...options,
    method: "DELETE",
    returnFormat: "body",
  });
};

export const retrieveCSIdentityInfo = (options?: RequestInit) => {
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
