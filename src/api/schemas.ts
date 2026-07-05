export type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type FormatRepresentation =
  "normalized" | "concise" | "keyValues" | "simplified";

export type FormatTemporal = "temporalValues" | "aggregatedValues";

export type CreatedAt = string;

export type ModifiedAt = string;

export type DeletedAt = string;

export type ObservedAt = string;

export type EntityTypeName = string | string[];

export type Scope = string | string[];

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
  type: EntityTypeName;
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
  scope?: Scope;
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
}

export interface Entity<TType extends EntityTypeName = EntityTypeName> {
  id: string;
  type: TType;
  scope?: Scope;
  location?: GeoProperty;
  observationSpace?: GeoProperty;
  operationSpace?: GeoProperty;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
}

export interface EntitySelector {
  id?: string;
  idPattern?: string;
  type: string;
}

export interface EntityTemporal<TType extends EntityTypeName = EntityTypeName> {
  id: string;
  type: TType;
  scope?: Scope;
  location?: GeoProperty;
  observationSpace?: GeoProperty;
  operationSpace?: GeoProperty;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
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

export type FeatureProperties<T extends Entity = Entity> = {
  type: T["type"];
} & Omit<T, keyof Entity>;

export type LdContext =
  string | { [key: string]: unknown } | (string | { [key: string]: unknown })[];

export type WithContext<T> = T & {
  "@context": LdContext;
};

export type MaybeContext<T> = T & {
  "@context"?: LdContext;
};

export interface Feature<T extends Entity = Entity> {
  id: string;
  type: "Feature";
  geometry: Geometry;
  properties: FeatureProperties<T>;
  "@context"?: LdContext;
}

export interface FeatureCollection<T extends Entity = Entity> {
  type: "FeatureCollection";
  features?: Feature<T>[];
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
}

export type SubscriptionCommonNotificationTriggerItem =
  | "entityCreated"
  | "entityUpdated"
  | "entityDeleted"
  | "attributeCreated"
  | "attributeUpdated"
  | "attributeDeleted";

export type SubscriptionCommonStatus = "active" | "paused" | "expired";

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

export type RetrieveEntityTypes200 =
  | (EntityTypeList & {
      "@context": LdContext;
    })
  | (EntityType & {
      "@context": LdContext;
    })[];

export type RetrieveContext200 =
  | {
      "@context"?: LdContext;
    }
  | LdContextMetadata;

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
