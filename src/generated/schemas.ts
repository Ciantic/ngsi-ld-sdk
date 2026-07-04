export type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type OptionsNoOverwrite = "noOverwrite";

export type OptionsRepresentation =
  "concise" | "keyValues" | "normalized" | "simplified";

export type OptionsSysAttrs = "sysAttrs";

export type OptionsTemporal = "temporalValues" | "aggregatedValues";

export type OptionsUpsert = "replace" | "update";

export type FormatRepresentation =
  "normalized" | "concise" | "keyValues" | "simplified";

export type FormatTemporal = "temporalValues" | "aggregatedValues";

export type CreatedAt = string;

export type ModifiedAt = string;

export type DeletedAt = string;

export type ObservedAt = string;

export interface Attribute {
  id: string;
  type: "Attribute";
  attributeName: string;
  attributeCount?: number;
  attributeTypes?: string[];
  typeNames?: string[];
}

export interface AttributeList {
  id: string;
  type: "AttributeList";
  attributeList: string[];
}

export interface ProblemDetails {
  type?: string;
  title?: string;
  status: number;
  detail: string;
  instance?: string;
}

export interface BatchEntityError {
  entityId: string;
  registrationId?: string;
  error: ProblemDetails;
}

export interface BatchOperationResult {
  success: string[];
  errors: BatchEntityError[];
}

export type CsourceNotificationTriggerReason =
  "newlyMatching" | "updated" | "noLongerMatching";

export interface EntityInfo {
  id?: string;
  idPattern?: string;
  type: string | string[];
}

export interface RegistrationInfo {
  entities?: EntityInfo[];
  propertyNames?: string[];
  relationshipNames?: string[];
}

export interface TimeInterval {
  startAt: string;
  endAt?: string;
}

export type GeometryPosition = [number, number] | [number, number, number];

export interface GeometryPoint {
  type: "Point";
  coordinates: GeometryPosition;
}

export type GeometryPositionArray = GeometryPosition[];

export interface GeometryMultiPoint {
  type: "MultiPoint";
  coordinates: GeometryPositionArray;
}

export type GeometryLinearRing = GeometryPositionArray;

export type GeometryPolygonCoordinates = GeometryLinearRing[];

export type GeometryLineStringCoordinates = GeometryPositionArray;

export interface GeometryPolygon {
  type: "Polygon";
  coordinates: GeometryPolygonCoordinates;
}

export interface GeometryLineString {
  type: "LineString";
  coordinates: GeometryLineStringCoordinates;
}

export interface GeometryMultiLineString {
  type: "MultiLineString";
  coordinates: GeometryLineStringCoordinates[];
}

export interface GeometryMultiPolygon {
  type: "MultiPolygon";
  coordinates: GeometryLineStringCoordinates[];
}

export type Geometry =
  | GeometryPoint
  | GeometryMultiPoint
  | GeometryPolygon
  | GeometryLineString
  | GeometryMultiLineString
  | GeometryMultiPolygon;

export interface KeyValuePair {
  key: string;
  value: string;
}

export type CsourceRegistrationMode =
  "auxiliary" | "exclusive" | "inclusive" | "redirect";

export interface RegistrationManagementInfo {
  localOnly?: boolean;
  cacheDuration?: string;
  timeout?: number;
  cooldown?: number;
}

export type CsourceRegistrationStatus = "failed" | "ok";

export interface CsourceRegistration {
  id?: string;
  type: "ContextSourceRegistration";
  registrationName?: string;
  contextSourceAlias?: string;
  description?: string;
  information: RegistrationInfo[];
  datasetId?: string[];
  tenant?: string;
  observationInterval?: TimeInterval;
  managementInterval?: TimeInterval;
  location?: Geometry;
  observationSpace?: Geometry;
  operationSpace?: Geometry;
  expiresAt?: string;
  endpoint: string;
  contextSourceInfo?: KeyValuePair[];
  scope?: string | string[];
  mode?: CsourceRegistrationMode;
  operations?: string[];
  refreshRate?: string;
  management?: RegistrationManagementInfo;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  readonly status?: CsourceRegistrationStatus;
  readonly timesSent?: number;
  readonly timesFailed?: number;
  readonly lastSuccess?: string;
  readonly lastFailure?: string;
  [key: string]: unknown;
}

export interface CsourceNotification {
  id: string;
  type: "CsourceNotification";
  subscriptionId: string;
  notifiedAt: string;
  readonly data: readonly CsourceRegistration[];
  triggerReason: CsourceNotificationTriggerReason;
}

export interface DateTimeValue {
  "@type": "DateTime";
  "@value": string;
}

export type EndpointAccept =
  "application/json" | "application/ld+json" | "application/geo+json";

export interface Endpoint {
  uri: string;
  accept?: EndpointAccept;
  timeout?: number;
  cooldown?: number;
  receiverInfo?: KeyValuePair[];
  notifierInfo?: KeyValuePair[];
}

export interface GeoProperty {
  type: "GeoProperty";
  value: Geometry;
  observedAt?: ObservedAt;
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  readonly instanceId?: string;
  readonly previousValue?: Geometry;
  $props?: { [key: string]: NgsildAttribute };
}

export interface Entity {
  id: string;
  type: string | string[];
  scope?: string | string[];
  location?: GeoProperty;
  observationSpace?: GeoProperty;
  operationSpace?: GeoProperty;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  $props?: { [key: string]: NgsildAttribute };
}

export interface EntitySelector {
  id?: string;
  idPattern?: string;
  type: string;
}

export interface EntityTemporal {
  id: string;
  type: string | string[];
  scope?: string | string[];
  location?: GeoProperty;
  observationSpace?: GeoProperty;
  operationSpace?: GeoProperty;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  $props?: { [key: string]: NgsildAttributeTemporal };
}

export interface EntityType {
  id: string;
  type: "EntityType";
  typeName: string;
  attributeNames: string[];
}

export interface EntityTypeInfo {
  id: string;
  type: "EntityTypeInfo";
  typeName: string;
  entityCount: number;
  attributeDetails: Attribute[];
}

export interface EntityTypeList {
  id: string;
  type: "EntityTypeList";
  typeList: string[];
}

export interface FeatureProperties {
  type: string | string[];
  $props?: { [key: string]: NgsildAttribute };
}

export type LdContext =
  string | { [key: string]: unknown } | (string | { [key: string]: unknown })[];

export type WithContext<T> = T & {
  "@context": LdContext;
};

export type MaybeContext<T> = T & {
  "@context"?: LdContext;
};

export interface Feature {
  id: string;
  type: "Feature";
  geometry: Geometry;
  properties: FeatureProperties;
  "@context"?: LdContext;
}

export interface FeatureCollection {
  type: "FeatureCollection";
  features?: Feature[];
  "@context"?: LdContext;
}

export type GeoQueryCoordinates = string | { [key: string]: unknown }[];

export interface GeoQuery {
  geometry: string;
  coordinates: GeoQueryCoordinates;
  georel: string;
  geoproperty?: string;
}

export type LanguagePropertyLanguageMap = { [key: string]: unknown };

export type LanguagePropertyPreviousLanguageMap = { [key: string]: unknown };

export interface LanguageProperty {
  type: "LanguageProperty";
  languageMap?: LanguagePropertyLanguageMap;
  observedAt?: ObservedAt;
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  readonly instanceId?: string;
  readonly previousLanguageMap?: LanguagePropertyPreviousLanguageMap;
  $props?: { [key: string]: NgsildAttribute };
}

export type LdContextMetadataItemKind =
  "Cached" | "Hosted" | "ImplicitlyCreated";

export type LdContextMetadataItemExtraInfo = { [key: string]: unknown };

export type LdContextMetadataItem = {
  URL: string;
  localId: string;
  kind: LdContextMetadataItemKind;
  timestamp: string;
  lastUsage?: string;
  numberOfHits?: number;
  extraInfo?: LdContextMetadataItemExtraInfo;
};

export type LdContextMetadata = LdContextMetadataItem[];

export interface NotUpdatedDetails {
  attributeName: string;
  reason: string;
  registrationId?: string;
}

export interface Notification {
  id: string;
  type: "Notification";
  subscriptionId: string;
  notifiedAt: string;
  data: Entity[] | FeatureCollection;
}

export type NotificationParamsFormat = "normalized" | "concise" | "keyValues";

export type NotificationParamsJoin = "flat" | "inline" | "@none";

export type NotificationParamsStatus = "ok" | "failed";

export interface NotificationParams {
  attributes?: string[];
  sysAttrs?: boolean;
  format?: NotificationParamsFormat;
  pick?: string[];
  omit?: string[];
  showChanges?: boolean;
  join?: NotificationParamsJoin;
  joinLevel?: number;
  endpoint: Endpoint;
  readonly status?: NotificationParamsStatus;
  readonly timesSent?: number;
  readonly timesFailed?: number;
  readonly lastNotification?: string;
  readonly lastFailure?: string;
  readonly lastSuccess?: string;
}

export type Path = string;

export interface Property {
  type: "Property";
  value: DateTimeValue | JsonValue;
  observedAt?: ObservedAt;
  unitCode?: string;
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  readonly instanceId?: string;
  readonly previousValue?: DateTimeValue | JsonValue;
  $props?: { [key: string]: NgsildAttribute };
}

export interface Query {
  type: "Query";
  entities?: EntitySelector[];
  attrs?: string[];
  pick?: string[];
  omit?: string[];
  q?: string;
  geoQ?: GeoQuery;
  csf?: string;
  scopeQ?: string;
  lang?: string;
  containedBy?: string[];
  datasetId?: string[];
  entityMap?: boolean;
}

export type TemporalQueryTimerel = "before" | "after" | "between";

export type TemporalQueryTimeproperty =
  "observedAt" | "createdAt" | "modifiedAt" | "deletedAt";

export interface TemporalQuery {
  timerel: TemporalQueryTimerel;
  timeAt: string;
  endTimeAt?: string;
  timeproperty?: TemporalQueryTimeproperty;
}

export type QueryTemporal = Query & {
  temporalQ: TemporalQuery;
};

export interface Relationship {
  type: "Relationship";
  object?: string | string[];
  objectType?: string | string[];
  observedAt?: ObservedAt;
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  readonly instanceId?: string;
  readonly previousObject?: string | string[];
  readonly entity?: Entity | Entity[];
  $props?: { [key: string]: NgsildAttribute };
}

export type SubscriptionCommonNotificationTriggerItem =
  | "entityCreated"
  | "entityUpdated"
  | "entityDeleted"
  | "attributeCreated"
  | "attributeUpdated"
  | "attributeDeleted";

export type SubscriptionCommonStatus = "active" | "paused" | "expired";

export interface SubscriptionCommon {
  id?: string;
  type: "Subscription";
  subscriptionName?: string;
  description?: string;
  entities?: EntitySelector[];
  localOnly?: boolean;
  notificationTrigger?: SubscriptionCommonNotificationTriggerItem[];
  q?: string;
  geoQ?: GeoQuery;
  csf?: string;
  isActive?: boolean;
  notification: NotificationParams;
  expiresAt?: string;
  temporalQ?: TemporalQuery;
  scopeQ?: string;
  lang?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  readonly status?: SubscriptionCommonStatus;
  jsonldContext?: string;
  datasetId?: string[];
}

export type SubscriptionOnChange = SubscriptionCommon & {
  watchedAttributes?: string[];
  throttling?: number;
};

export type SubscriptionPeriodic = SubscriptionCommon & {
  timeInterval?: number;
};

export type Subscription = SubscriptionOnChange | SubscriptionPeriodic;

export interface UpdateResult {
  updated: string[];
  notUpdated: NotUpdatedDetails[];
}

export interface VocabProperty {
  type: "VocabProperty";
  vocab?: string | string[];
  readonly previousVocab?: string | string[];
  observedAt?: ObservedAt;
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  readonly instanceId?: string;
  $props?: { [key: string]: NgsildAttribute };
}

export interface ListProperty {
  type: "ListProperty";
  valueList?: (DateTimeValue | JsonValue)[];
  observedAt?: ObservedAt;
  unitCode?: string;
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  readonly instanceId?: string;
  readonly previousValueList?: readonly (DateTimeValue | JsonValue)[];
  $props?: { [key: string]: NgsildAttribute };
}

export type ListRelationshipObjectList =
  { [key: string]: unknown }[] | string[];

export type ListRelationshipPreviousObjectList =
  { [key: string]: unknown }[] | string[];

export interface ListRelationship {
  type: "ListRelationship";
  objectList?: ListRelationshipObjectList;
  objectType?: string | string[];
  observedAt?: ObservedAt;
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  readonly instanceId?: string;
  readonly previousObjectList?: ListRelationshipPreviousObjectList;
  readonly entityList?: readonly Entity[];
  $props?: { [key: string]: NgsildAttribute };
}

export type JsonPropertyJson = { [key: string]: unknown };

export type JsonPropertyPreviousJson = { [key: string]: unknown };

export interface JsonProperty {
  type: "JsonProperty";
  json?: JsonPropertyJson;
  readonly previousJson?: JsonPropertyPreviousJson;
  observedAt?: ObservedAt;
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  readonly instanceId?: string;
  $props?: { [key: string]: NgsildAttribute };
}

export type EntityMapEntityMap = { [key: string]: unknown };

export type EntityMapLinkedMaps = { [key: string]: unknown };

export interface EntityMap {
  id?: string;
  type: "EntityMap";
  expiresAt: string;
  readonly entityMap?: EntityMapEntityMap;
  readonly linkedMaps?: EntityMapLinkedMaps;
}

export type ContextSourceIdentityContextSourceExtras = {
  [key: string]: unknown;
};

export interface ContextSourceIdentity {
  id: string;
  type: "ContextSourceIdentity";
  contextSourceExtras?: ContextSourceIdentityContextSourceExtras;
  contextSourceUpTime: string;
  contextSourceTimeAt: string;
  contextSourceAlias: string;
}

export type BadRequestResponse = ProblemDetails;

export type ConflictResponse = ProblemDetails;

export type MultiStatusBatchOperationResultResponse = BatchOperationResult;

export type MultiStatusUpdateResultResponse = UpdateResult;

export type NotFoundResponse = ProblemDetails;

export type GatewayTimeoutResponse = ProblemDetails;

export type UnprocessableResponse = ProblemDetails;

export type NotImplementedResponse = ProblemDetails;

export type AttributeFragmentBody = (
  | Property
  | Relationship
  | GeoProperty
  | LanguageProperty
  | VocabProperty
  | JsonProperty
  | ListProperty
  | ListRelationship
) & {
  "@context"?: LdContext;
};

export type TemporalAttributeFragmentBody = WithContext<
  RequiredObservedAt<
    | Property
    | Relationship
    | GeoProperty
    | LanguageProperty
    | VocabProperty
    | JsonProperty
    | ListProperty
    | ListRelationship
  >
>;

export type QueryTemporalBody = QueryTemporal;

export type HeadersNgsildEntityMapParameter = string;

export type HeadersLinkParameter = string;

export type HeadersNgsildTenantParameter = string;

export type HeadersViaParameter = string;

export type QueryAggrMethodsParameter =
  | "totalCount"
  | "distinctCount"
  | "sum"
  | "avg"
  | "min"
  | "max"
  | "stddev"
  | "sumsq";

export type QueryAggrPeriodDurationParameter = string;

export type QueryAttrsParameter = string[];

export type QueryContainedByParameter = string[];

export type QueryCoordinatesParameter =
  | GeometryPosition
  | GeometryPositionArray
  | GeometryLineStringCoordinates
  | GeometryLinearRing
  | GeometryPolygonCoordinates;

export type QueryCountParameter = boolean;

export type QueryCsfParameter = string;

export type QueryDatasetIdParameter = string | string[];

export type QueryDetailsParameter = boolean;

export type QueryDeleteAllParameter = boolean;

export type QueryEndTimeAtParameter = string;

export type QueryEntityMapParameter = boolean;

export type QueryFormatEntitiesParameter = FormatRepresentation;

export type QueryFormatTemporalParameter = FormatTemporal;

export type QueryIdParameter = string[];

export type QueryIdPatternParameter = string;

export type QueryGeometryPropertyParameter = string;

export type QueryGeometryParameter =
  | "LineString"
  | "MultiLineString"
  | "MultiPoint"
  | "MultiPolygon"
  | "Point"
  | "Polygon";

export type QueryGeopropertyParameter =
  "location" | "observationSpace" | "operationSpace";

export type QueryGeorelParameter =
  | "equals"
  | "disjoint"
  | "intersects"
  | "within"
  | "contains"
  | "overlaps"
  | string;

export type QueryJoinParameter = string;

export type QueryJoinLevelParameter = number;

export type QueryKindParameter = "Cached" | "Hosted" | "ImplicitlyCreated";

export type QueryLangParameter = string;

export type QueryLastNParameter = number;

export type QueryLimitParameter = number;

export type QueryLocalParameter = boolean;

export type QueryObservedAtParameter = string;

export type QueryOmitParameter = string[];

export type QueryOptionsParameter = (OptionsRepresentation | OptionsSysAttrs)[];

export type QueryOptionsNoOverwriteParameter = OptionsNoOverwrite[];

export type QueryOptionsSysAttrsParameter = OptionsSysAttrs[];

export type QueryOptionsTemporalParameter = OptionsTemporal[];

export type QueryOptionsUpsertParameter = OptionsUpsert[];

export type QueryPickParameter = string[];

export type QueryQParameter = string;

export type QueryReloadParameter = boolean;

export type QueryScopeQParameter = string;

export type QueryTimeAtParameter = string;

export type QueryTimepropertyParameter =
  "createdAt" | "deletedAt" | "modifiedAt" | "observedAt";

export type QueryTimerelParameter = "after" | "before" | "between";

export type QueryTypeParameter = string;

export type CreateEntityParams = {
  local?: QueryLocalParameter;
};

export type QueryEntityParams = {
  id?: QueryIdParameter;
  type?: QueryTypeParameter;
  idPattern?: QueryIdPatternParameter;
  attrs?: QueryAttrsParameter;
  pick?: QueryPickParameter;
  omit?: QueryOmitParameter;
  q?: QueryQParameter;
  csf?: QueryCsfParameter;
  geometry?: QueryGeometryParameter;
  georel?: QueryGeorelParameter;
  coordinates?: QueryCoordinatesParameter;
  geoproperty?: QueryGeopropertyParameter;
  geometryProperty?: QueryGeometryPropertyParameter;
  lang?: QueryLangParameter;
  scopeQ?: QueryScopeQParameter;
  containedBy?: QueryContainedByParameter;
  join?: QueryJoinParameter;
  joinLevel?: QueryJoinLevelParameter;
  datasetId?: QueryDatasetIdParameter;
  details?: QueryEntityMapParameter;
  limit?: QueryLimitParameter;
  count?: QueryCountParameter;
  options?: QueryOptionsParameter;
  format?: QueryFormatEntitiesParameter;
  local?: QueryLocalParameter;
};

export type RetrieveEntityParams = {
  type?: QueryTypeParameter;
  attrs?: QueryAttrsParameter;
  pick?: QueryPickParameter;
  omit?: QueryOmitParameter;
  geometryProperty?: QueryGeometryPropertyParameter;
  lang?: QueryLangParameter;
  containedBy?: QueryContainedByParameter;
  join?: QueryJoinParameter;
  joinLevel?: QueryJoinLevelParameter;
  datasetId?: QueryDatasetIdParameter;
  details?: QueryEntityMapParameter;
  options?: QueryOptionsParameter;
  format?: QueryFormatEntitiesParameter;
  local?: QueryLocalParameter;
};

export type DeleteEntityParams = {
  type?: QueryTypeParameter;
  local?: QueryLocalParameter;
};

export type MergeEntityParams = {
  options?: OptionsRepresentation[];
  format?: QueryFormatEntitiesParameter;
  type?: QueryTypeParameter;
  observedAt?: QueryObservedAtParameter;
  lang?: QueryLangParameter;
  local?: QueryLocalParameter;
};

export type ReplaceEntityParams = {
  type?: QueryTypeParameter;
  local?: QueryLocalParameter;
};

export type AppendAttrsParams = {
  type?: QueryTypeParameter;
  options?: QueryOptionsNoOverwriteParameter;
  local?: QueryLocalParameter;
};

export type UpdateEntityParams = {
  local?: QueryLocalParameter;
  type?: QueryTypeParameter;
};

export type UpdateAttrsParams = {
  local?: QueryLocalParameter;
  type?: QueryTypeParameter;
};

export type DeleteAttrsParams = {
  deleteAll?: QueryDeleteAllParameter;
  datasetId?: QueryDatasetIdParameter;
  type?: QueryTypeParameter;
  local?: QueryLocalParameter;
};

export type ReplaceAttrsParams = {
  local?: QueryLocalParameter;
  type?: QueryTypeParameter;
};

export type QueryCSRParams = {
  id?: QueryIdParameter;
  type?: QueryTypeParameter;
  idPattern?: QueryIdPatternParameter;
  attrs?: QueryAttrsParameter;
  q?: QueryQParameter;
  csf?: QueryCsfParameter;
  geometry?: QueryGeometryParameter;
  georel?: QueryGeorelParameter;
  coordinates?: QueryCoordinatesParameter;
  geoproperty?: QueryGeopropertyParameter;
  timeproperty?: QueryTimepropertyParameter;
  timerel?: QueryTimerelParameter;
  timeAt?: QueryTimeAtParameter;
  endTimeAt?: QueryEndTimeAtParameter;
  geometryProperty?: QueryGeometryPropertyParameter;
  lang?: QueryLangParameter;
  scopeQ?: QueryScopeQParameter;
  options?: QueryOptionsSysAttrsParameter;
  limit?: QueryLimitParameter;
  count?: QueryCountParameter;
};

export type RetrieveCSRParams = {
  options?: QueryOptionsSysAttrsParameter;
};

export type CreateSubscriptionParams = {
  local?: QueryLocalParameter;
};

export type QuerySubscriptionParams = {
  options?: QueryOptionsSysAttrsParameter;
  limit?: QueryLimitParameter;
  count?: QueryCountParameter;
  local?: QueryLocalParameter;
};

export type RetrieveSubscriptionParams = {
  options?: QueryOptionsSysAttrsParameter;
  local?: QueryLocalParameter;
};

export type UpdateSubscriptionParams = {
  local?: QueryLocalParameter;
};

export type DeleteSubscriptionParams = {
  local?: QueryLocalParameter;
};

export type QueryCSRSubscriptionParams = {
  options?: QueryOptionsSysAttrsParameter;
  limit?: QueryLimitParameter;
  count?: QueryCountParameter;
};

export type RetrieveCSRSubscriptionParams = {
  options?: QueryOptionsSysAttrsParameter;
};

export type CreateBatchParams = {
  local?: QueryLocalParameter;
};

export type UpsertBatchParams = {
  options?: QueryOptionsUpsertParameter;
  local?: QueryLocalParameter;
};

export type UpdateBatchParams = {
  options?: QueryOptionsNoOverwriteParameter;
  local?: QueryLocalParameter;
};

export type DeleteBatchParams = {
  local?: QueryLocalParameter;
};

export type QueryBatchParams = {
  count?: QueryCountParameter;
  limit?: QueryLimitParameter;
  local?: QueryLocalParameter;
  options?: QueryOptionsParameter;
};

export type MergeBatchParams = {
  local?: QueryLocalParameter;
};

export type UpsertTemporalParams = {
  local?: QueryLocalParameter;
};

export type QueryTemporalParams = {
  id?: QueryIdParameter;
  type?: QueryTypeParameter;
  idPattern?: QueryIdPatternParameter;
  attrs?: QueryAttrsParameter;
  pick?: QueryPickParameter;
  omit?: QueryOmitParameter;
  q?: QueryQParameter;
  csf?: QueryCsfParameter;
  geometry?: QueryGeometryParameter;
  georel?: QueryGeorelParameter;
  coordinates?: QueryCoordinatesParameter;
  geoproperty?: QueryGeopropertyParameter;
  timeproperty?: QueryTimepropertyParameter;
  timerel?: QueryTimerelParameter;
  timeAt?: QueryTimeAtParameter;
  endTimeAt?: QueryEndTimeAtParameter;
  lastN?: QueryLastNParameter;
  lang?: QueryLangParameter;
  aggrMethods?: QueryAggrMethodsParameter;
  aggrPeriodDuration?: QueryAggrPeriodDurationParameter;
  scopeQ?: QueryScopeQParameter;
  datasetId?: QueryDatasetIdParameter;
  limit?: QueryLimitParameter;
  count?: QueryCountParameter;
  options?: QueryOptionsTemporalParameter | QueryOptionsSysAttrsParameter;
  format?: QueryFormatTemporalParameter;
  local?: QueryLocalParameter;
};

export type RetrieveTemporalParams = {
  attrs?: QueryAttrsParameter;
  pick?: QueryPickParameter;
  omit?: QueryOmitParameter;
  timeproperty?: QueryTimepropertyParameter;
  timerel?: QueryTimerelParameter;
  timeAt?: QueryTimeAtParameter;
  endTimeAt?: QueryEndTimeAtParameter;
  lastN?: QueryLastNParameter;
  lang?: QueryLangParameter;
  aggrMethods?: QueryAggrMethodsParameter;
  aggrPeriodDuration?: QueryAggrPeriodDurationParameter;
  datasetId?: QueryDatasetIdParameter;
  options?: QueryOptionsTemporalParameter | QueryOptionsSysAttrsParameter;
  format?: QueryFormatTemporalParameter;
  local?: QueryLocalParameter;
};

export type DeleteTemporalParams = {
  local?: QueryLocalParameter;
};

export type AppendAttrsTemporalParams = {
  local?: QueryLocalParameter;
};

export type DeleteAttrsTemporalParams = {
  deleteAll?: QueryDeleteAllParameter;
  datasetId?: QueryDatasetIdParameter;
  local?: QueryLocalParameter;
};

export type UpdateAttrsTemporalParams = {
  local?: QueryLocalParameter;
};

export type DeleteAttrInstanceTemporalParams = {
  local?: QueryLocalParameter;
};

export type TemporalQueryBatchParams = {
  local?: QueryLocalParameter;
};

export type RetrieveEntityTypesParams = {
  details?: boolean;
  local?: QueryLocalParameter;
};

export type RetrieveEntityTypes200 =
  | (EntityTypeList & {
      "@context": LdContext;
    })
  | (EntityType & {
      "@context": LdContext;
    })[];

export type RetrieveEntityTypeInfoParams = {
  local?: QueryLocalParameter;
};

export type RetrieveAttrTypesParams = {
  details?: boolean;
  local?: QueryLocalParameter;
};

export type RetrieveAttrTypeInfoParams = {
  local?: QueryLocalParameter;
};

export type CreateContextBody = {
  "@context": LdContext;
};

export type ListContextsParams = {
  details?: QueryDetailsParameter;
  kind?: QueryKindParameter;
};

export type RetrieveContextParams = {
  details?: QueryDetailsParameter;
};

export type RetrieveContext200 =
  | {
      "@context"?: LdContext;
    }
  | LdContextMetadata;

export type DeleteContextParams = {
  reload?: QueryReloadParameter;
};

export type NgsildAttribute =
  | Property
  | GeoProperty
  | LanguageProperty
  | VocabProperty
  | JsonProperty
  | ListProperty
  | Relationship
  | ListRelationship;

type RequiredObservedAt<T> = T & {
  observedAt: string;
};

export type NgsildAttributeTemporal =
  RequiredObservedAt<NgsildAttribute> | RequiredObservedAt<NgsildAttribute>[];
