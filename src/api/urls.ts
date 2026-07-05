import type {
  AppendAttrsParams,
  AppendAttrsTemporalParams,
  CreateBatchParams,
  CreateSubscriptionParams,
  DeleteAttrInstanceTemporalParams,
  DeleteAttrsParams,
  DeleteAttrsTemporalParams,
  DeleteBatchParams,
  DeleteContextParams,
  DeleteEntityParams,
  DeleteSubscriptionParams,
  DeleteTemporalParams,
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
  RetrieveCSRParams,
  RetrieveCSRSubscriptionParams,
  RetrieveEntityParams,
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
  QueryKindParameter,
} from "./schemas";

export const getCreateEntityUrl = (params?: { local?: boolean }) => {
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

export const getCreateCSRUrl = () => {
  return `/csourceRegistrations`;
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

export const getUpdateCSRUrl = (registrationId: string) => {
  return `/csourceRegistrations/${registrationId}`;
};

export const getDeleteCSRUrl = (registrationId: string) => {
  return `/csourceRegistrations/${registrationId}`;
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

export const getCreateCSRSubscriptionUrl = () => {
  return `/csourceSubscriptions`;
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

export const getUpdateCSRSubscriptionUrl = (subscriptionId: string) => {
  return `/csourceSubscriptions/${subscriptionId}`;
};

export const getDeleteCSRSubscriptionUrl = (subscriptionId: string) => {
  return `/csourceSubscriptions/${subscriptionId}`;
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

export const getRetrieveEntityTypeInfoUrl = (
  type: string,
  params?: { local?: boolean },
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

export const getRetrieveAttrTypesUrl = (params?: {
  details?: boolean;
  local?: boolean;
}) => {
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

export const getRetrieveAttrTypeInfoUrl = (
  attrId: string,
  params?: { local?: boolean },
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

export const getCreateContextUrl = () => {
  return `/jsonldContexts`;
};

export const getListContextsUrl = (params?: {
  details?: boolean;
  kind?: QueryKindParameter;
}) => {
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

export const getRetrieveContextUrl = (
  contextId: string,
  params?: { details?: boolean },
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

export const getRetrieveEntityMapUrl = (entityMapId: string) => {
  return `/entityMap/${entityMapId}`;
};

export const getUpdateEntityMapUrl = (entityMapId: string) => {
  return `/entityMap/${entityMapId}`;
};

export const getDeleteEntityMapUrl = (entityMapId: string) => {
  return `/entityMap/${entityMapId}`;
};

export const getRetrieveCSIdentityInfoUrl = () => {
  return `/info/sourceIdentity`;
};
