import type {
  FormatRepresentation,
  FormatTemporal,
  GeometryLinearRing,
  GeometryLineStringCoordinates,
  GeometryPolygonCoordinates,
  GeometryPosition,
  GeometryPositionArray,
} from "./schemas";

type OptionsNoOverwrite = "noOverwrite";

type OptionsRepresentation =
  "concise" | "keyValues" | "normalized" | "simplified";

type OptionsSysAttrs = "sysAttrs";

type OptionsTemporal = "temporalValues" | "aggregatedValues";

type OptionsUpsert = "replace" | "update";

type QueryAggrMethodsParameter =
  | "totalCount"
  | "distinctCount"
  | "sum"
  | "avg"
  | "min"
  | "max"
  | "stddev"
  | "sumsq";

type QueryCoordinatesParameter =
  | GeometryPosition
  | GeometryPositionArray
  | GeometryLineStringCoordinates
  | GeometryLinearRing
  | GeometryPolygonCoordinates;

type QueryGeometryParameter =
  | "LineString"
  | "MultiLineString"
  | "MultiPoint"
  | "MultiPolygon"
  | "Point"
  | "Polygon";

type QueryGeopropertyParameter =
  "location" | "observationSpace" | "operationSpace";

type QueryGeorelParameter =
  | "equals"
  | "disjoint"
  | "intersects"
  | "within"
  | "contains"
  | "overlaps"
  | string;

type QueryKindParameter = "Cached" | "Hosted" | "ImplicitlyCreated";

type QueryTimepropertyParameter =
  "createdAt" | "deletedAt" | "modifiedAt" | "observedAt";

type QueryTimerelParameter = "after" | "before" | "between";

export type QueryEntityParams<T extends string = string> = {
  id?: string[];
  type?: T | T[];
  idPattern?: string;
  attrs?: string[];
  pick?: string[];
  omit?: string[];
  q?: string;
  csf?: string;
  geometry?: QueryGeometryParameter;
  georel?: QueryGeorelParameter;
  coordinates?: QueryCoordinatesParameter;
  geoproperty?: QueryGeopropertyParameter;
  geometryProperty?: string;
  lang?: string;
  scopeQ?: string;
  containedBy?: string[];
  join?: string;
  joinLevel?: number;
  datasetId?: string | string[];
  details?: boolean;
  limit?: number;
  count?: boolean;
  options?: (OptionsRepresentation | OptionsSysAttrs)[];
  format?: FormatRepresentation;
  local?: boolean;
};

export type RetrieveEntityParams = {
  type?: string;
  attrs?: string[];
  pick?: string[];
  omit?: string[];
  geometryProperty?: string;
  lang?: string;
  containedBy?: string[];
  join?: string;
  joinLevel?: number;
  datasetId?: string | string[];
  details?: boolean;
  options?: (OptionsRepresentation | OptionsSysAttrs)[];
  format?: FormatRepresentation;
  local?: boolean;
};

export type DeleteEntityParams = {
  type?: string;
  local?: boolean;
};

export type MergeEntityParams = {
  options?: OptionsRepresentation[];
  format?: FormatRepresentation;
  type?: string;
  observedAt?: string;
  lang?: string;
  local?: boolean;
};

export type ReplaceEntityParams = {
  type?: string;
  local?: boolean;
};

export type AppendAttrsParams = {
  type?: string;
  options?: OptionsNoOverwrite[];
  local?: boolean;
};

export type UpdateEntityParams = {
  local?: boolean;
  type?: string;
};

export type UpdateAttrsParams = {
  local?: boolean;
  type?: string;
};

export type DeleteAttrsParams = {
  deleteAll?: boolean;
  datasetId?: string | string[];
  type?: string;
  local?: boolean;
};

export type ReplaceAttrsParams = {
  local?: boolean;
  type?: string;
};

export type QueryCSRParams = {
  id?: string[];
  type?: string;
  idPattern?: string;
  attrs?: string[];
  q?: string;
  csf?: string;
  geometry?: QueryGeometryParameter;
  georel?: QueryGeorelParameter;
  coordinates?: QueryCoordinatesParameter;
  geoproperty?: QueryGeopropertyParameter;
  timeproperty?: QueryTimepropertyParameter;
  timerel?: QueryTimerelParameter;
  timeAt?: string;
  endTimeAt?: string;
  geometryProperty?: string;
  lang?: string;
  scopeQ?: string;
  options?: OptionsSysAttrs[];
  limit?: number;
  count?: boolean;
};

export type RetrieveCSRParams = {
  options?: OptionsSysAttrs[];
};

export type CreateSubscriptionParams = {
  local?: boolean;
};

export type QuerySubscriptionParams = {
  options?: OptionsSysAttrs[];
  limit?: number;
  count?: boolean;
  local?: boolean;
};

export type RetrieveSubscriptionParams = {
  options?: OptionsSysAttrs[];
  local?: boolean;
};

export type UpdateSubscriptionParams = {
  local?: boolean;
};

export type DeleteSubscriptionParams = {
  local?: boolean;
};

export type QueryCSRSubscriptionParams = {
  options?: OptionsSysAttrs[];
  limit?: number;
  count?: boolean;
};

export type RetrieveCSRSubscriptionParams = {
  options?: OptionsSysAttrs[];
};

export type CreateBatchParams = {
  local?: boolean;
};

export type UpsertBatchParams = {
  options?: OptionsUpsert[];
  local?: boolean;
};

export type UpdateBatchParams = {
  options?: OptionsNoOverwrite[];
  local?: boolean;
};

export type DeleteBatchParams = {
  local?: boolean;
};

export type QueryBatchParams = {
  count?: boolean;
  limit?: number;
  local?: boolean;
  options?: (OptionsRepresentation | OptionsSysAttrs)[];
};

export type MergeBatchParams = {
  local?: boolean;
};

export type UpsertTemporalParams = {
  local?: boolean;
};

export type QueryTemporalParams<T extends string = string> = {
  id?: string[];
  type?: T | T[];
  idPattern?: string;
  attrs?: string[];
  pick?: string[];
  omit?: string[];
  q?: string;
  csf?: string;
  geometry?: QueryGeometryParameter;
  georel?: QueryGeorelParameter;
  coordinates?: QueryCoordinatesParameter;
  geoproperty?: QueryGeopropertyParameter;
  timeproperty?: QueryTimepropertyParameter;
  timerel?: QueryTimerelParameter;
  timeAt?: string;
  endTimeAt?: string;
  lastN?: number;
  lang?: string;
  aggrMethods?: QueryAggrMethodsParameter;
  aggrPeriodDuration?: string;
  scopeQ?: string;
  datasetId?: string | string[];
  limit?: number;
  count?: boolean;
  options?: OptionsTemporal[] | OptionsSysAttrs[];
  format?: FormatTemporal;
  local?: boolean;
};

export type RetrieveTemporalParams = {
  attrs?: string[];
  pick?: string[];
  omit?: string[];
  timeproperty?: QueryTimepropertyParameter;
  timerel?: QueryTimerelParameter;
  timeAt?: string;
  endTimeAt?: string;
  lastN?: number;
  lang?: string;
  aggrMethods?: QueryAggrMethodsParameter;
  aggrPeriodDuration?: string;
  datasetId?: string | string[];
  options?: OptionsTemporal[] | OptionsSysAttrs[];
  format?: FormatTemporal;
  local?: boolean;
};

export type DeleteTemporalParams = {
  local?: boolean;
};

export type AppendAttrsTemporalParams = {
  local?: boolean;
};

export type DeleteAttrsTemporalParams = {
  deleteAll?: boolean;
  datasetId?: string | string[];
  local?: boolean;
};

export type UpdateAttrsTemporalParams = {
  local?: boolean;
};

export type DeleteAttrInstanceTemporalParams = {
  local?: boolean;
};

export type TemporalQueryBatchParams = {
  local?: boolean;
};

export type RetrieveEntityTypesParams = {
  details?: boolean;
  local?: boolean;
};

export type DeleteContextParams = {
  reload?: boolean;
};

export type CreateEntityParams = {
  local?: boolean;
};

export type RetrieveEntityTypeInfoParams = {
  local?: boolean;
};

export type RetrieveAttrTypesParams = {
  details?: boolean;
  local?: boolean;
};

export type RetrieveAttrTypeInfoParams = {
  local?: boolean;
};

export type ListContextsParams = {
  details?: boolean;
  kind?: QueryKindParameter;
};

export type RetrieveContextParams = {
  details?: boolean;
};

export const getCreateEntityUrl = (opts: {
  params?: CreateEntityParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities?${stringifiedParams}`
    : `/entities`;
};

export const getQueryEntityUrl = <T extends string = string>(opts: {
  params?: QueryEntityParams<T> | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
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

export const getRetrieveEntityUrl = (opts: {
  entityId: string;
  params?: RetrieveEntityParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
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
    ? `/entities/${opts.entityId}?${stringifiedParams}`
    : `/entities/${opts.entityId}`;
};

export const getDeleteEntityUrl = (opts: {
  entityId: string;
  params?: DeleteEntityParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${opts.entityId}?${stringifiedParams}`
    : `/entities/${opts.entityId}`;
};

export const getMergeEntityUrl = (opts: {
  entityId: string;
  params?: MergeEntityParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${opts.entityId}?${stringifiedParams}`
    : `/entities/${opts.entityId}`;
};

export const getReplaceEntityUrl = (opts: {
  entityId: string;
  params?: ReplaceEntityParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${opts.entityId}?${stringifiedParams}`
    : `/entities/${opts.entityId}`;
};

export const getAppendAttrsUrl = (opts: {
  entityId: string;
  params?: AppendAttrsParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${opts.entityId}/attrs?${stringifiedParams}`
    : `/entities/${opts.entityId}/attrs`;
};

export const getUpdateEntityUrl = (opts: {
  entityId: string;
  params?: UpdateEntityParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${opts.entityId}/attrs?${stringifiedParams}`
    : `/entities/${opts.entityId}/attrs`;
};

export const getUpdateAttrsUrl = (opts: {
  entityId: string;
  attrId: string;
  params?: UpdateAttrsParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${opts.entityId}/attrs/${opts.attrId}?${stringifiedParams}`
    : `/entities/${opts.entityId}/attrs/${opts.attrId}`;
};

export const getDeleteAttrsUrl = (opts: {
  entityId: string;
  attrId: string;
  params?: DeleteAttrsParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
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
    ? `/entities/${opts.entityId}/attrs/${opts.attrId}?${stringifiedParams}`
    : `/entities/${opts.entityId}/attrs/${opts.attrId}`;
};

export const getReplaceAttrsUrl = (opts: {
  entityId: string;
  attrId: string;
  params?: ReplaceAttrsParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entities/${opts.entityId}/attrs/${opts.attrId}?${stringifiedParams}`
    : `/entities/${opts.entityId}/attrs/${opts.attrId}`;
};

export const getCreateCSRUrl = () => {
  return `/csourceRegistrations`;
};

export const getQueryCSRUrl = (opts: {
  params?: QueryCSRParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
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

export const getRetrieveCSRUrl = (opts: {
  registrationId: string;
  params?: RetrieveCSRParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/csourceRegistrations/${opts.registrationId}?${stringifiedParams}`
    : `/csourceRegistrations/${opts.registrationId}`;
};

export const getUpdateCSRUrl = (opts: { registrationId: string }) => {
  return `/csourceRegistrations/${opts.registrationId}`;
};

export const getDeleteCSRUrl = (opts: { registrationId: string }) => {
  return `/csourceRegistrations/${opts.registrationId}`;
};

export const getCreateSubscriptionUrl = (opts: {
  params?: CreateSubscriptionParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/subscriptions?${stringifiedParams}`
    : `/subscriptions`;
};

export const getQuerySubscriptionUrl = (opts: {
  params?: QuerySubscriptionParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/subscriptions?${stringifiedParams}`
    : `/subscriptions`;
};

export const getRetrieveSubscriptionUrl = (opts: {
  subscriptionId: string;
  params?: RetrieveSubscriptionParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/subscriptions/${opts.subscriptionId}?${stringifiedParams}`
    : `/subscriptions/${opts.subscriptionId}`;
};

export const getUpdateSubscriptionUrl = (opts: {
  subscriptionId: string;
  params?: UpdateSubscriptionParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/subscriptions/${opts.subscriptionId}?${stringifiedParams}`
    : `/subscriptions/${opts.subscriptionId}`;
};

export const getDeleteSubscriptionUrl = (opts: {
  subscriptionId: string;
  params?: DeleteSubscriptionParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/subscriptions/${opts.subscriptionId}?${stringifiedParams}`
    : `/subscriptions/${opts.subscriptionId}`;
};

export const getCreateCSRSubscriptionUrl = () => {
  return `/csourceSubscriptions`;
};

export const getQueryCSRSubscriptionUrl = (opts: {
  params?: QueryCSRSubscriptionParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/csourceSubscriptions?${stringifiedParams}`
    : `/csourceSubscriptions`;
};

export const getRetrieveCSRSubscriptionUrl = (opts: {
  subscriptionId: string;
  params?: RetrieveCSRSubscriptionParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/csourceSubscriptions/${opts.subscriptionId}?${stringifiedParams}`
    : `/csourceSubscriptions/${opts.subscriptionId}`;
};

export const getUpdateCSRSubscriptionUrl = (opts: {
  subscriptionId: string;
}) => {
  return `/csourceSubscriptions/${opts.subscriptionId}`;
};

export const getDeleteCSRSubscriptionUrl = (opts: {
  subscriptionId: string;
}) => {
  return `/csourceSubscriptions/${opts.subscriptionId}`;
};

export const getCreateBatchUrl = (opts: {
  params?: CreateBatchParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entityOperations/create?${stringifiedParams}`
    : `/entityOperations/create`;
};

export const getUpsertBatchUrl = (opts: {
  params?: UpsertBatchParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entityOperations/upsert?${stringifiedParams}`
    : `/entityOperations/upsert`;
};

export const getUpdateBatchUrl = (opts: {
  params?: UpdateBatchParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entityOperations/update?${stringifiedParams}`
    : `/entityOperations/update`;
};

export const getDeleteBatchUrl = (opts: {
  params?: DeleteBatchParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entityOperations/delete?${stringifiedParams}`
    : `/entityOperations/delete`;
};

export const getQueryBatchUrl = (opts: {
  params?: QueryBatchParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entityOperations/query?${stringifiedParams}`
    : `/entityOperations/query`;
};

export const getMergeBatchUrl = (opts: {
  params?: MergeBatchParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/entityOperations/merge?${stringifiedParams}`
    : `/entityOperations/merge`;
};

export const getUpsertTemporalUrl = (opts: {
  params?: UpsertTemporalParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities?${stringifiedParams}`
    : `/temporal/entities`;
};

export const getQueryTemporalUrl = <T extends string = string>(opts: {
  params?: QueryTemporalParams<T> | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
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

export const getRetrieveTemporalUrl = (opts: {
  entityId: string;
  params?: RetrieveTemporalParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
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
    ? `/temporal/entities/${opts.entityId}?${stringifiedParams}`
    : `/temporal/entities/${opts.entityId}`;
};

export const getDeleteTemporalUrl = (opts: {
  entityId: string;
  params?: DeleteTemporalParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities/${opts.entityId}?${stringifiedParams}`
    : `/temporal/entities/${opts.entityId}`;
};

export const getAppendAttrsTemporalUrl = (opts: {
  entityId: string;
  params?: AppendAttrsTemporalParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities/${opts.entityId}/attrs?${stringifiedParams}`
    : `/temporal/entities/${opts.entityId}/attrs`;
};

export const getDeleteAttrsTemporalUrl = (opts: {
  entityId: string;
  attrId: string;
  params?: DeleteAttrsTemporalParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
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
    ? `/temporal/entities/${opts.entityId}/attrs/${opts.attrId}?${stringifiedParams}`
    : `/temporal/entities/${opts.entityId}/attrs/${opts.attrId}`;
};

export const getUpdateAttrsTemporalUrl = (opts: {
  entityId: string;
  attrId: string;
  instanceId: string;
  params?: UpdateAttrsTemporalParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities/${opts.entityId}/attrs/${opts.attrId}/${opts.instanceId}?${stringifiedParams}`
    : `/temporal/entities/${opts.entityId}/attrs/${opts.attrId}/${opts.instanceId}`;
};

export const getDeleteAttrInstanceTemporalUrl = (opts: {
  entityId: string;
  attrId: string;
  instanceId: string;
  params?: DeleteAttrInstanceTemporalParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entities/${opts.entityId}/attrs/${opts.attrId}/${opts.instanceId}?${stringifiedParams}`
    : `/temporal/entities/${opts.entityId}/attrs/${opts.attrId}/${opts.instanceId}`;
};

export const getTemporalQueryBatchUrl = (opts: {
  params?: TemporalQueryBatchParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/temporal/entityOperations/query?${stringifiedParams}`
    : `/temporal/entityOperations/query`;
};

export const getRetrieveEntityTypesUrl = (opts: {
  params?: RetrieveEntityTypesParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/types?${stringifiedParams}`
    : `/types`;
};

export const getRetrieveEntityTypeInfoUrl = (opts: {
  type: string;
  params?: RetrieveEntityTypeInfoParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/types/${opts.type}?${stringifiedParams}`
    : `/types/${opts.type}`;
};

export const getRetrieveAttrTypesUrl = (opts: {
  params?: RetrieveAttrTypesParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/attributes?${stringifiedParams}`
    : `/attributes`;
};

export const getRetrieveAttrTypeInfoUrl = (opts: {
  attrId: string;
  params?: RetrieveAttrTypeInfoParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/attributes/${opts.attrId}?${stringifiedParams}`
    : `/attributes/${opts.attrId}`;
};

export const getCreateContextUrl = () => {
  return `/jsonldContexts`;
};

export const getListContextsUrl = (opts: {
  params?: ListContextsParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/jsonldContexts?${stringifiedParams}`
    : `/jsonldContexts`;
};

export const getRetrieveContextUrl = (opts: {
  contextId: string;
  params?: RetrieveContextParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/jsonldContexts/${opts.contextId}?${stringifiedParams}`
    : `/jsonldContexts/${opts.contextId}`;
};

export const getDeleteContextUrl = (opts: {
  contextId: string;
  params?: DeleteContextParams | undefined;
}) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(opts.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/jsonldContexts/${opts.contextId}?${stringifiedParams}`
    : `/jsonldContexts/${opts.contextId}`;
};

export const getRetrieveEntityMapUrl = (opts: { entityMapId: string }) => {
  return `/entityMap/${opts.entityMapId}`;
};

export const getUpdateEntityMapUrl = (opts: { entityMapId: string }) => {
  return `/entityMap/${opts.entityMapId}`;
};

export const getDeleteEntityMapUrl = (opts: { entityMapId: string }) => {
  return `/entityMap/${opts.entityMapId}`;
};

export const getRetrieveCSIdentityInfoUrl = () => {
  return `/info/sourceIdentity`;
};
