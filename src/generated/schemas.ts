/**
 * Any JSON value as defined by IETF RFC 8259.
 */
export type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * 6.16.3 For POST method associated to the operations "Batch Entity Update" and "Append Entity Attributes", the "noOvevwrite"
 * options query parameter indicates that no attribute overwrite shall be performed.
 */
export type OptionsNoOverwrite =
  (typeof OptionsNoOverwrite)[keyof typeof OptionsNoOverwrite];

export const OptionsNoOverwrite = {
  noOverwrite: "noOverwrite",
} as const;

/**
 * 6.3.7 Representation of Entities.
 *
 * An alternative mechanism to include the format parameter. DEPRECATED.
 *
 * When its value includes the keyword "normalized", a normalized
 * representation of Entities shall be provided as defined by clause 4.5.1, with Attributes returned
 * in the normalized representation as defined in clauses 4.5.2.2, 4.5.3.2 and 4.5.18.2.
 *
 * When its value includes the keyword "concise", a concise lossless representation of Entities shall
 * be provided as defined by clause 4.5.1. with Attributes returned in the concise representation as
 * defined in clauses 4.5.2.3, 4.5.3.3 and 4.5.18.3. In this case the broker will return data in the
 * most concise lossless representation possible, for example removing all Attribute "type" members.
 *
 * When its value includes the keyword "keyValues" (or "simplified" as a synonym), a simplified
 * representation of Entities shall be provided as defined by clause 4.5.4.
 *
 * If the Accept Header is set to "application/geo+json" the response will be in simplified GeoJSON
 * format as defined by clause 4.5.17.
 * @deprecated
 */
export type OptionsRepresentation =
  (typeof OptionsRepresentation)[keyof typeof OptionsRepresentation];

export const OptionsRepresentation = {
  normalized: "normalized",
  concise: "concise",
  keyValues: "keyValues",
  simplified: "simplified",
} as const;

/**
 * 6.3.11 Including system generated attributes.
 *
 * When its value includes the keyword "sysAttrs", a representation of NGSI-LD Elements shall be
 * provided so that the system generated attributes createdAt, modifiedAt are included in the response
 * payload body. In the case of temporal representations, also the system generated attribute deletedAt
 * is included, if the NGSI-LD Element has been deleted.
 */
export type OptionsSysAttrs =
  (typeof OptionsSysAttrs)[keyof typeof OptionsSysAttrs];

export const OptionsSysAttrs = {
  sysAttrs: "sysAttrs",
} as const;

/**
 * 6.3.12 Simplified or aggregated temporal representation of entities.
 *
 * An alternative mechanism to include the format parameter. DEPRECATED.
 * If both format and options are present, the value of the format parameter shall take precedence.
 *
 * When its value includes the keyword "temporalValues", a simplified temporal representation of
 * entities shall be provided as defined by clause 4.5.8.
 *
 * When its value includes the keyword "aggregatedValues", an aggregated temporal representation of
 * entities shall be provided as defined by clause 4.5.19.
 *
 * Only one of the two keywords can be present in the values of the parameter.
 * @deprecated
 */
export type OptionsTemporal =
  (typeof OptionsTemporal)[keyof typeof OptionsTemporal];

export const OptionsTemporal = {
  temporalValues: "temporalValues",
  aggregatedValues: "aggregatedValues",
} as const;

/**
 * 6.15.3 Upsert configuration.
 *
 * "replace". Indicates that all the existing Entity content shall be replaced (default mode);
 *
 * "update". Indicates that existing Entity content shall be updated.
 */
export type OptionsUpsert = (typeof OptionsUpsert)[keyof typeof OptionsUpsert];

export const OptionsUpsert = {
  replace: "replace",
  update: "update",
} as const;

/**
 * 6.3.7 Representation of Entities.
 *
 * When its value includes the keyword "normalized", a normalized
 * representation of Entities shall be provided as defined by clause 4.5.1, with Attributes returned
 * in the normalized representation as defined in clauses 4.5.2.2, 4.5.3.2 and 4.5.18.2.
 *
 * When its value includes the keyword "concise", a concise lossless representation of Entities shall
 * be provided as defined by clause 4.5.1. with Attributes returned in the concise representation as
 * defined in clauses 4.5.2.3, 4.5.3.3 and 4.5.18.3. In this case the broker will return data in the
 * most concise lossless representation possible, for example removing all Attribute "type" members.
 *
 * When its value includes the keyword "keyValues" (or "simplified" as a synonym), a simplified
 * representation of Entities shall be provided as defined by clause 4.5.4.
 *
 * If the Accept Header is set to "application/geo+json" the response will be in simplified GeoJSON
 * format as defined by clause 4.5.17.
 */
export type FormatRepresentation =
  (typeof FormatRepresentation)[keyof typeof FormatRepresentation];

export const FormatRepresentation = {
  normalized: "normalized",
  concise: "concise",
  keyValues: "keyValues",
  simplified: "simplified",
} as const;

/**
 * 6.3.12 Simplified or aggregated temporal representation of entities.
 *
 * When its value includes the keyword "temporalValues", a simplified temporal representation of
 * entities shall be provided as defined by clause 4.5.8.
 *
 * When its value includes the keyword "aggregatedValues", an aggregated temporal representation of
 * entities shall be provided as defined by clause 4.5.19.
 *
 * Only one of the two keywords can be present in the values of the parameter.
 */
export type FormatTemporal =
  (typeof FormatTemporal)[keyof typeof FormatTemporal];

export const FormatTemporal = {
  temporalValues: "temporalValues",
  aggregatedValues: "aggregatedValues",
} as const;

/**
 * It is defined as the temporal Property at which the Entity, Property or
 * Relationship was entered into an NGSI-LD system.
 *
 * Entity creation timestamp. See clause 4.8.
 */
export type CreatedAt = string;

/**
 * It is defined as the temporal Property at which the Entity, Property or Relationship
 * was last modified in an NGSI-LD system, e.g. in order to correct a previously entered incorrect value.
 *
 * Entity last modification timestamp. See clause 4.8.
 */
export type ModifiedAt = string;

/**
 * It is defined as the temporal Property at which the Entity, Property or Relationship was deleted from an NGSI-LD system.
 *
 * Entity deletion timestamp. See clause 4.8. It is only used in notifications reporting deletions and in the
 * Temporal Representation of Entities (clause 4.5.6), Properties (clause 4.5.7), Relationships (clause 4.5.8)
 * and LanguageProperties (clause 5.2.32).
 */
export type DeletedAt = string;

/**
 * It is defined as the temporal Property at which a certain Property or Relationship became valid or was observed.
 * For example, a temperature Value was measured by the sensor at this point in time.
 */
export type ObservedAt = string;

/**
 * JSON-LD @type.
 */
export type AttributeType = (typeof AttributeType)[keyof typeof AttributeType];

export const AttributeType = {
  Attribute: "Attribute",
} as const;

/**
 * 5.2.28 This type represents the data needed to define the attribute information.
 */
export interface Attribute {
  /** Full URI of attribute name. */
  id: string;
  /** JSON-LD @type. */
  type: AttributeType;
  /** Name of the attribute, short name if contained in @context. */
  attributeName: string;
  /** Number of attribute instances with this attribute name. */
  attributeCount?: number;
  /**
   * List of attribute types (e.g. Property, Relationship, GeoProperty) for which
   * entity instances exist, which contain an attribute with this name.
   */
  attributeTypes?: string[];
  /**
   * List of entity type names for which entity instances exist containing
   * attributes that have the respective name.
   */
  typeNames?: string[];
}

/**
 * JSON-LD @type.
 */
export type AttributeListType =
  (typeof AttributeListType)[keyof typeof AttributeListType];

export const AttributeListType = {
  AttributeList: "AttributeList",
} as const;

/**
 * 5.2.27 This type represents the data needed to define the attribute
 * list representation as mandated by clause 4.5.13.
 */
export interface AttributeList {
  /** Unique identifier for the attribute list. */
  id: string;
  /** JSON-LD @type. */
  type: AttributeListType;
  /** List containing the attribute names. */
  attributeList: string[];
}

/**
 * The definition of the general "ProblemDetails" data structure from
 * IETF RFC 7807 is reproduced inthis structure. Compared to the
 * general framework defined in IETF RFC 7807, the "status" and
 * "detail" attributes are mandated to be included by the present document,
 * to ensure that the response contains additional textual information about
 * an error. IETF RFC 7807 foresees extensibility of the
 * "ProblemDetails" type. It is possible that particular APIs in the present
 * document, or particular implementations, define extensions to define
 * additional attributes that provide more information about the error.
 * The description column only provides some explanation of the meaning to
 * Facilitate understanding of the design. For a full description, see
 * IETF RFC 7807.
 */
export interface ProblemDetails {
  /**
   * A URI reference according to IETF RFC 3986 that identifies the
   * problem type. It is encouraged that the URI provides human-readable
   * documentation for the problem (e.g. using HTML) when dereferenced.
   * When this member is not present, its value is assumed to be
   * "about:blank".
   */
  type?: string;
  /**
   * A short, human-readable summary of the problem type. It should not
   * change from occurrence to occurrence of the problem, except for
   * purposes of localization. If type is given and other than
   * "about:blank", this attribute shall also be provided.
   * A short, human-readable summary of the problem
   * type.  It SHOULD NOT change from occurrence to occurrence of the
   * problem, except for purposes of localization (e.g., using
   * proactive content negotiation; see [RFC7231], Section 3.4).
   */
  title?: string;
  /**
   * The HTTP status code for this occurrence of the problem.
   * The HTTP status code ([RFC7231], Section 6) generated by the origin
   * server for this occurrence of the problem.
   */
  status: number;
  /**
   * A human-readable explanation specific to this occurrence of the
   * problem.
   *
   * *InvalidRequest: The request associated to the operation is
   * syntactically invalid or includes wrong content. If an HTTP request
   * for an operation contains parameters that are incompatible with the
   * operation, or it contains values of the "options" parameter that are
   * not supported by the operation, an HTTP error response of type
   * InvalidRequest should be returned.
   */
  detail: string;
  /**
   * A URI reference that identifies the specific occurrence of the
   * problem. It may yield further information if dereferenced.
   */
  instance?: string;
}

/**
 * 5.2.17 This datatype represents an error raised (associated to a particular Entity) during
 * the execution of a batch or distributed operation.
 */
export interface BatchEntityError {
  /** Entity Id corresponding to the Entity in error. */
  entityId: string;
  /** Registration Id corresponding to a failed distributed operation (optional). */
  registrationId?: string;
  /** One instance per Entity in error. */
  error: ProblemDetails;
}

/**
 * 5.2.16 The datatype represents the result of a batch operation.
 */
export interface BatchOperationResult {
  /**
   * Array of Entity Ids corresponding to the Entities that were successfully
   * treated by the concerned operation.
   */
  success: string[];
  /** One array item per Entity in error. */
  errors: BatchEntityError[];
}

/**
 * JSON-LD @type.
 */
export type CsourceNotificationType =
  (typeof CsourceNotificationType)[keyof typeof CsourceNotificationType];

export const CsourceNotificationType = {
  CsourceNotification: "CsourceNotification",
} as const;

/**
 * Indicates whether the Csources in the CsourceRegistration.Input(s) in data are newly matching
 * (initial notification or creation), have been updated (but still match) or do not match any longer.
 *
 * • "newlyMatching" - describes the case that the notified Context Source Registration(s) newly
 * match(es) the identified subscription. This value is used in the first notification and
 * whenever a new Context Source Registration matching the Subscription has been registered,
 * or an existing Context Source Registration that did not match before has been updated
 * in such a way that it matches now.
 *
 * • "updated" - describes the case that the notified Context Source Registration that
 * was part of a previous notification has been updated, but still matches the Subscription.
 *
 * • "noLongerMatching" - describes the case that the notified Context Source Registration
 * that was part of a previous notification no longer matches the Subscription, i.e. as a result of
 *  an update or because it was deleted.
 */
export type CsourceNotificationTriggerReason =
  (typeof CsourceNotificationTriggerReason)[keyof typeof CsourceNotificationTriggerReason];

export const CsourceNotificationTriggerReason = {
  newlyMatching: "newlyMatching",
  updated: "updated",
  noLongerMatching: "noLongerMatching",
} as const;

/**
 * JSON-LD @type Use reserved type for identifying Context Source Registration.
 */
export type CsourceRegistrationType =
  (typeof CsourceRegistrationType)[keyof typeof CsourceRegistrationType];

export const CsourceRegistrationType = {
  ContextSourceRegistration: "ContextSourceRegistration",
} as const;

/**
 * 5.2.8 This type represents what Entities, Entity Types or group of Entity ids
 * (as a regular expression pattern mandated by IEEE 1003.2TM) can be provided (by Context Sources).
 */
export interface EntityInfo {
  /** Entity identifier. */
  id?: string;
  /** A regular expression which denotes a pattern that shall be matched by the provided or subscribed Entities. */
  idPattern?: string;
  /** Entity Type (or JSON array, in case of Entities with multiple Entity Types). */
  type: string | string[];
}

/**
 * 5.2.10 RegistrationInfo.
 */
export interface RegistrationInfo {
  /**
   * Describes the entities for which the CSource may be able to provide information.
   * @minItems 1
   */
  entities?: EntityInfo[];
  /**
   * Describes the Properties that the CSource may be able to provide.
   * @minItems 1
   */
  propertyNames?: string[];
  /**
   * Describes the Relationships that the CSource may be able to provide.
   * @minItems 1
   */
  relationshipNames?: string[];
}

/**
 * 5.2.11 NGSI-LD TimeInterval.
 */
export interface TimeInterval {
  /** Describes the start of the time interval. */
  startAt: string;
  /** Describes the end of the time interval. If not present the interval is open. */
  endAt?: string;
}

export type GeometryPointType =
  (typeof GeometryPointType)[keyof typeof GeometryPointType];

export const GeometryPointType = {
  Point: "Point",
} as const;

/**
 * A single position.
 * @minItems 2
 * @maxItems 3
 */
export type GeometryPosition = number[];

export interface GeometryPoint {
  type?: GeometryPointType;
  coordinates?: GeometryPosition;
}

export type GeometryMultiPointType =
  (typeof GeometryMultiPointType)[keyof typeof GeometryMultiPointType];

export const GeometryMultiPointType = {
  MultiPoint: "MultiPoint",
} as const;

/**
 * An array of positions.
 */
export type GeometryPositionArray = GeometryPosition[];

export interface GeometryMultiPoint {
  type?: GeometryMultiPointType;
  coordinates?: GeometryPositionArray;
}

/**
 * An array of four positions where the first equals the last (i.e., a closed LineString).
 */
export type GeometryLinearRing = GeometryPositionArray;

/**
 * An array of linear rings.
 */
export type GeometryPolygon = GeometryLinearRing[];

/**
 * An array of two or more positions.
 */
export type GeometryLineString = GeometryPositionArray;

export type GeometryMultiLineStringType =
  (typeof GeometryMultiLineStringType)[keyof typeof GeometryMultiLineStringType];

export const GeometryMultiLineStringType = {
  MultiLineString: "MultiLineString",
} as const;

export interface GeometryMultiLineString {
  type?: GeometryMultiLineStringType;
  coordinates?: GeometryLineString[];
}

export type GeometryMultiPolygonType =
  (typeof GeometryMultiPolygonType)[keyof typeof GeometryMultiPolygonType];

export const GeometryMultiPolygonType = {
  MultiPolygon: "MultiPolygon",
} as const;

export interface GeometryMultiPolygon {
  type?: GeometryMultiPolygonType;
  coordinates?: GeometryLineString[];
}

/**
 * A valid GeoJSON geometry object (as mandated by RFC7946).
 */
export type Geometry =
  | GeometryPoint
  | GeometryMultiPoint
  | GeometryPolygon
  | GeometryLineString
  | GeometryMultiLineString
  | GeometryMultiPolygon;

/**
 * 5.2.22 This datatype represents the optional information that is required when contacting an endpoint for notifications.
 */
export interface KeyValuePair {
  /** The key of the key/value pair. */
  key: string;
  /** The value of the key/value pair. */
  value: string;
}

/**
 * The definition of the mode of distributed operation (see clause 4.3.6)
 * supported by the registered Context Source.
 */
export type CsourceRegistrationMode =
  (typeof CsourceRegistrationMode)[keyof typeof CsourceRegistrationMode];

export const CsourceRegistrationMode = {
  inclusive: "inclusive",
  exclusive: "exclusive",
  redirect: "redirect",
  auxiliary: "auxiliary",
} as const;

/**
 * 5.2.34 This type represents the data to alter the default behaviour of a Context Broker when
 * making a distributed operation request to a registered Context Source.
 */
export interface RegistrationManagementInfo {
  /**
   * If localOnly=true then distributed operations associated to this Context Source Registration
   * will act only on data held directly by the registered Context Source itself (see clause 4.3.6.4).
   */
  localOnly?: boolean;
  /**
   * Minimal period of time which shall elapse between two consecutive context information
   * consumption operations (as defined in clause 5.7) related to the same context data will occur.
   * If the cacheDuration latency period has not been reached, a cached value for the
   * entity or its attributes shall be returned where available.
   */
  cacheDuration?: string;
  /**
   * Maximum period of time in milliseconds which may elapse before a
   * forwarded request is assumed to have failed.
   * @minimum 1
   */
  timeout?: number;
  /**
   * Minimum period of time in milliseconds which shall elapse before attempting
   * to make a subsequent forwarded request to the same endpoint after failure.
   * If requests are received before the cooldown period has expired, a timeout error
   * response for the registration is automatically returned.
   * @minimum 1
   */
  cooldown?: number;
}

/**
 * Read-only. Status of the Registration. It shall be "ok" if the last attempt to perform a distributed
 * operation succeeded. It shall be "failed" if the last attempt to perform a distributed operation failed.
 */
export type CsourceRegistrationStatus =
  (typeof CsourceRegistrationStatus)[keyof typeof CsourceRegistrationStatus];

export const CsourceRegistrationStatus = {
  ok: "ok",
  failed: "failed",
} as const;

/**
 * 5.2.9 This type represents the data needed to register a new Context Source.
 */
export interface CsourceRegistration {
  /**
   * Unique registration identifier. (JSON-LD @id). There may be multiple registrations per
   * Context Source, i.e. the id is unique per registration.
   */
  id?: string;
  /** JSON-LD @type Use reserved type for identifying Context Source Registration. */
  type?: CsourceRegistrationType;
  /**
   * A name given to this Context Source Registration.
   * @minLength 1
   */
  registrationName?: string;
  /**
   * A previously retrieved unique id for a registered Context Source which is used to
   * identify loops. In the multi-tenancy use case (see clause 4.14), this id shall be
   * used to identify a specific Tenant within a registered Context Source.
   * @minLength 1
   */
  contextSourceAlias?: string;
  /**
   * A description of this Context Source Registration.
   * @minLength 1
   */
  description?: string;
  /**
   * Describes the Entities, Properties and Relationships for which the
   * Context Source may be able to provide information.
   * @minItems 1
   */
  information?: RegistrationInfo[];
  /**
   * Specifies the datasetIds of Attributes that the Context Source can provide,
   * defined as per clause 4.5.5. Valid URIs, "@none" for including the default
   * Attribute instances.
   */
  datasetId?: string[];
  /**
   * Identifies the tenant that has to be specified in all requests to the Context Source that
   * are related to the information registered in this Context Source Registration.
   * If not present, the default tenant is assumed. Should only be present in systems supporting multi-tenancy.
   */
  tenant?: string;
  /**
   * If present, the Context Source can be queried for Temporal Entity Representations. (If latest Entity
   * information is also provided, a separate Context Registration is needed for this purpose).
   * The observationInterval specifies the time interval for which the Context Source can provide
   * Entity information as specified by the observedAt Temporal Property.
   * A temporal query based on the observedAt Temporal Property, which is the default,
   * is matched against the observationInterval for overlap.
   */
  observationInterval?: TimeInterval;
  /**
   * If present, the Context Source can be queried for Temporal Entity Representations. (If latest Entity
   * information is also provided, a separate Context Registration is needed for this purpose).
   * The managementInterval specifies the time interval for which the Context Source can provide Entity
   * information as specified by the createdAt, modifiedAt and deletedAt Temporal Properties.
   * A temporal query based on the createdAt, modifiedAt or deletedAt Temporal Property is matched
   * against the managementInterval for overlap.
   */
  managementInterval?: TimeInterval;
  /** Location for which the Context Source may be able to provide information. */
  location?: Geometry;
  /**
   * Geographic location that includes the observation spaces of all entities as specified by their
   * respective observationSpace GeoProperty for which the Context Source may be able to provide
   * information.
   */
  observationSpace?: Geometry;
  /**
   * Geographic location that includes the operation spaces of all entities as specified by their
   * respective operationSpace GeoProperty for which the Context Source may be able to provide
   * information.
   */
  operationSpace?: Geometry;
  /**
   * Provides an expiration date. When passed the Context Source Registration
   * will become invalid and the Context Source might no longer be available.
   */
  expiresAt?: string;
  /** Endpoint expressed as dereferenceable URI through which the Context Source exposes its NGSI-LD interface. */
  endpoint?: string;
  /**
   * Generic {key, value} array to convey optional information to provide
   * when contacting the registered Context Source.
   */
  contextSourceInfo?: KeyValuePair[];
  /** Scopes (see clause 4.18) for which the Context Source has Entities. */
  scope?: string | string[];
  /**
   * The definition of the mode of distributed operation (see clause 4.3.6)
   * supported by the registered Context Source.
   */
  mode?: CsourceRegistrationMode;
  /**
   * The definition limited subset of API operations supported by the registered Context Source.
   *
   * If undefined, the default set of operations is "federationOps" (see clause 4.20).
   */
  operations?: string[];
  /**
   * An indication of the likely period of time to elapse between updates at this registered endpoint.
   * Brokers may optionally use this information to help implement caching.
   */
  refreshRate?: string;
  /**
   * Holds additional optional registration management information that can be used
   * to limit unnecessary distributed operation requests.
   */
  management?: RegistrationManagementInfo;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  /**
   * Read-only. Status of the Registration. It shall be "ok" if the last attempt to perform a distributed
   * operation succeeded. It shall be "failed" if the last attempt to perform a distributed operation failed.
   */
  readonly status?: CsourceRegistrationStatus;
  /**
   * Number of times that the registration triggered a distributed operation, including failed attempts.
   * @minimum 0
   */
  readonly timesSent?: number;
  /**
   * Number of times that the registration triggered a distributed operation request that failed.
   * @minimum 0
   */
  readonly timesFailed?: number;
  /**
   * Timestamp corresponding to the instant when the last successfully distributed operation was sent.
   * Created on first successful operation.
   */
  readonly lastSuccess?: string;
  /**
   * Timestamp corresponding to the instant when the last distributed operation resulting in
   * a failure (for instance, in the HTTP binding, an HTTP response code other than 2xx) was returned.
   */
  readonly lastFailure?: string;
  [key: string]: unknown;
}

/**
 * 5.3.2 This datatype represents the parameters that allow building a Context Source Notification
 * to be sent to a subscriber.
 */
export interface CsourceNotification {
  /** Csource notification identifier (JSON-LD @id). */
  id: string;
  /** JSON-LD @type. */
  type: CsourceNotificationType;
  /** Identifier of the subscription that originated the notification. */
  subscriptionId: string;
  /** Timestamp corresponding to the instant when the notification was generated by the system. */
  notifiedAt: string;
  /** The content of the notification as NGSI-LD entities. See clause 5.2.4. */
  readonly data: readonly CsourceRegistration[];
  /**
   * Indicates whether the Csources in the CsourceRegistration.Input(s) in data are newly matching
   * (initial notification or creation), have been updated (but still match) or do not match any longer.
   *
   * • "newlyMatching" - describes the case that the notified Context Source Registration(s) newly
   * match(es) the identified subscription. This value is used in the first notification and
   * whenever a new Context Source Registration matching the Subscription has been registered,
   * or an existing Context Source Registration that did not match before has been updated
   * in such a way that it matches now.
   *
   * • "updated" - describes the case that the notified Context Source Registration that
   * was part of a previous notification has been updated, but still matches the Subscription.
   *
   * • "noLongerMatching" - describes the case that the notified Context Source Registration
   * that was part of a previous notification no longer matches the Subscription, i.e. as a result of
   *  an update or because it was deleted.
   */
  triggerReason: CsourceNotificationTriggerReason;
}

export type DateTimeValueType =
  (typeof DateTimeValueType)[keyof typeof DateTimeValueType];

export const DateTimeValueType = {
  DateTime: "DateTime",
} as const;

/**
 * Date representation as mandated by C.6 "Date Representation".
 */
export interface DateTimeValue {
  "@type": DateTimeValueType;
  "@value": string;
}

/**
 * Intended to convey the MIME type of the notification payload body (JSON, or JSON-LD, or GeoJSON).
 * If not present, default is "application/json".
 */
export type EndpointAccept =
  (typeof EndpointAccept)[keyof typeof EndpointAccept];

export const EndpointAccept = {
  "application/json": "application/json",
  "application/ld+json": "application/ld+json",
  "application/geo+json": "application/geo+json",
} as const;

/**
 * 5.2.15 This datatype represents the parameters that are required in order to define an endpoint for notifications.
 */
export interface Endpoint {
  /** URI which conveys the endpoint which will receive the notification. */
  uri: string;
  /**
   * Intended to convey the MIME type of the notification payload body (JSON, or JSON-LD, or GeoJSON).
   * If not present, default is "application/json".
   */
  accept?: EndpointAccept;
  /**
   * Maximum period of time in milliseconds which may elapse before a notification is assumed to have failed.
   * The NGSI-LD system can override this value. This only applies if the binding protocol always returns a
   * response.
   * @minimum 1
   */
  timeout?: number;
  /**
   * Once a failure has occurred, minimum period of time in milliseconds which shall elapse before
   * attempting to make a subsequent notification to the same endpoint after failure.
   * If requests are received before the cooldown period has expired, no notification is sent.
   * @minimum 1
   */
  cooldown?: number;
  /** Generic {key, value} array to convey optional information to the receiver. */
  receiverInfo?: KeyValuePair[];
  /** Generic {key, value} array to set up the communication channel. */
  notifierInfo?: KeyValuePair[];
}

/**
 * Node type.
 */
export type GeoPropertyType =
  (typeof GeoPropertyType)[keyof typeof GeoPropertyType];

export const GeoPropertyType = {
  GeoProperty: "GeoProperty",
} as const;

/**
 * 5.2.7 NGSI-LD GeoProperty.
 */
export interface GeoProperty {
  /** Node type. */
  type?: GeoPropertyType;
  /** Geolocation encoded as GeoJSON. As mandated by clause 4.7. */
  value?: Geometry;
  /** Timestamp. See clause 4.8. */
  observedAt?: ObservedAt;
  /** It allows identifying a set or group of property values. */
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  /**
   * A URI uniquely identifying a GeoProperty instance,
   * as mandated by clause 4.5.7. System generated.
   * Only used in temporal representation of GeoProperties.
   */
  readonly instanceId?: string;
  /**
   * Previous GeoProperty value. Only used in notifications, if the showChanges
   * option is explicitly requested.
   */
  readonly previousValue?: Geometry;
  /** Dynamic NGSI-LD attributes (Properties, Relationships, etc.). */
  $props?: { [key: string]: NgsildAttribute };
}

/**
 * 5.2.4 NGSI-LD Entity.
 */
export interface Entity {
  /** Entity id. */
  id?: string;
  /** Entity Type(s). Both short hand string(s) (type name) or URI(s) are allowed. */
  type?: string | string[];
  /** Scope. */
  scope?: string | string[];
  /** Default geospatial Property of an entity. See clause 4.7. */
  location?: GeoProperty;
  /** See clause 4.7. */
  observationSpace?: GeoProperty;
  /** See clause 4.7. */
  operationSpace?: GeoProperty;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  /** Dynamic NGSI-LD attributes (Properties, Relationships, etc.). */
  $props?: { [key: string]: NgsildAttribute };
}

/**
 * 5.2.33 This type selects which entity or group of entities are queried or subscribed to by Context Consumers.
 * The `id` takes precedence over `idPattern`.
 */
export interface EntitySelector {
  /** Entity identifier. */
  id?: string;
  /** A regular expression which denotes a pattern that shall be matched by the provided or subscribed Entities. */
  idPattern?: string;
  /**
   * Selector of Entity Type(s).
   * If type is specified as "*", implying local scope, local scope shall not be explicitly set to be false
   * (clause 5.5.13) for the execution of the corresponding operation.
   */
  type: string;
}

/**
 * 5.2.20 This is the same data type as mandated by clause 5.2.4 with the only deviation that
 * the representation of Properties and Relationships shall be the temporal one
 * (arrays of (Property or Relationship) instances represented by JSON-LD objects)
 * as defined in clauses 4.5.7 and 4.5.8. Alternatively it is possible to specify
 * the EntityTemporal by using the "Simplified Temporal Representation of an Entity",
 * as defined in clause 4.5.9.
 */
export interface EntityTemporal {
  /** Entity id. */
  id?: string;
  /** Entity Type(s). Both short hand string(s) (type name) or URI(s) are allowed. */
  type?: string | string[];
  /** Scope. */
  scope?: string | string[];
  /** Default geospatial Property of an entity. See clause 4.7. */
  location?: GeoProperty;
  /** See clause 4.7. */
  observationSpace?: GeoProperty;
  /** See clause 4.7. */
  operationSpace?: GeoProperty;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  /** Dynamic NGSI-LD attributes (Properties, Relationships, etc.). */
  $props?: { [key: string]: NgsildAttributeTemporal };
}

/**
 * JSON-LD @type.
 */
export type EntityTypeType =
  (typeof EntityTypeType)[keyof typeof EntityTypeType];

export const EntityTypeType = {
  EntityType: "EntityType",
} as const;

/**
 * 5.2.25 This type represents the data needed to define the elements of the detailed
 * entity type list representation as mandated by clause 4.5.11.
 */
export interface EntityType {
  /** Fully Qualified Name (FQN) of the entity type being described. */
  id: string;
  /** JSON-LD @type. */
  type: EntityTypeType;
  /** Name of the entity type, short name if contained in @context. */
  typeName: string;
  /** List containing the names of attributes that instances of the entity type can have. */
  attributeNames: string[];
}

/**
 * JSON-LD @type.
 */
export type EntityTypeInfoType =
  (typeof EntityTypeInfoType)[keyof typeof EntityTypeInfoType];

export const EntityTypeInfoType = {
  EntityTypeInfo: "EntityTypeInfo",
} as const;

/**
 * 5.2.26 This type represents the data needed to define the detailed entity type
 * information representation as mandated by clause 4.5.12.
 */
export interface EntityTypeInfo {
  /** Fully Qualified Name (FQN) of the entity type being described. */
  id: string;
  /** JSON-LD @type. */
  type: EntityTypeInfoType;
  /** Name of the entity type, short name if contained in @context. */
  typeName: string;
  /** Number of entity instances of this entity type. */
  entityCount: number;
  /** List of attributes that entity instances with the specified entity type can have. */
  attributeDetails: Attribute[];
}

/**
 * JSON-LD @type.
 */
export type EntityTypeListType =
  (typeof EntityTypeListType)[keyof typeof EntityTypeListType];

export const EntityTypeListType = {
  EntityTypeList: "EntityTypeList",
} as const;

/**
 * 5.2.24 This type represents the data needed to define the entity type
 * list representation as mandated by clause 4.5.10.
 */
export interface EntityTypeList {
  /** Unique identifier for the entity type list. */
  id: string;
  /** JSON-LD @type. */
  type: EntityTypeListType;
  /** List containing the entity type names. */
  typeList: string[];
}

/**
 * GeoJSON Type.
 */
export type FeatureType = (typeof FeatureType)[keyof typeof FeatureType];

export const FeatureType = {
  Feature: "Feature",
} as const;

/**
 * 5.2.31 This data type represents the type and the associated attributes
 * (Properties and Relationships) of an Entity in GeoJSON format.
 */
export interface FeatureProperties {
  /**
   * Entity Type (or JSON array, in case of Entities with multiple Entity Types).
   * Both short hand string (type name) or URI are allowed.
   */
  type: string | string[];
  /** Dynamic NGSI-LD attributes (Properties, Relationships, etc.). */
  $props?: { [key: string]: NgsildAttribute };
}

/**
 * 5.2.3 JSON-LD @context
 *
 * When encoding NGSI-LD Entities, Context Source Registrations, Subscriptions and Notifications,
 * as pure JSON-LD (MIME type "application/ld+json"), a proper @context shall be included
 * as a special member of the corresponding JSON-LD Object.
 */
export type LdContext =
  string | { [key: string]: unknown } | (string | { [key: string]: unknown })[];

export type WithContext<T> = T & {
  "@context": LdContext;
};

/**
 * Helper: wraps any type with an optional JSON-LD @context.
 */
export type JsonLdContext = {
  "@context"?: LdContext;
};

/**
 * 5.2.29 This data type represents a spatially bounded Entity in GeoJSON format, as mandated by IETF RFC 7946.
 */
export interface Feature {
  /** Entity id. */
  id: string;
  /** GeoJSON Type. */
  type: FeatureType;
  /** Null if no matching GeoProperty. */
  geometry: Geometry;
  /** List of attributes as mandated by clause 5.2.31. */
  properties: FeatureProperties;
  /**
   * JSON-LD @context. This field is only present if requested in the payload by
   * the HTTP Prefer Header (IETF RFC 7240).
   */
  "@context"?: LdContext;
}

/**
 * GeoJSON Type.
 */
export type FeatureCollectionType =
  (typeof FeatureCollectionType)[keyof typeof FeatureCollectionType];

export const FeatureCollectionType = {
  FeatureCollection: "FeatureCollection",
} as const;

/**
 * 5.2.30 This data type represents a list of spatially bounded
 * Entities in GeoJSON format, as mandated by IETF RFC 7946.
 */
export interface FeatureCollection {
  /** GeoJSON Type. */
  type: FeatureCollectionType;
  /** In the case that no matches are found, "features" will be an empty array. */
  features?: Feature[];
  /**
   * JSON-LD @context. This field is only present if requested in the payload
   * by the HTTP Prefer Header (IETF RFC 7240).
   */
  "@context"?: LdContext;
}

export type GeometryPolygonType =
  (typeof GeometryPolygonType)[keyof typeof GeometryPolygonType];

export const GeometryPolygonType = {
  Polygon: "Polygon",
} as const;

export type GeometryLineStringType =
  (typeof GeometryLineStringType)[keyof typeof GeometryLineStringType];

export const GeometryLineStringType = {
  LineString: "LineString",
} as const;

/**
 * Coordinates of the reference geometry. For the sake of JSON-LD compatibility.
 * It can be encoded as a string as described in clause 4.7.1.
 */
export type GeoQueryCoordinates = string | { [key: string]: unknown }[];

/**
 * 5.2.13 This datatype represents a geoquery used for Subscriptions.
 */
export interface GeoQuery {
  /** Type of the reference geometry. */
  geometry: string;
  /**
   * Coordinates of the reference geometry. For the sake of JSON-LD compatibility.
   * It can be encoded as a string as described in clause 4.7.1.
   */
  coordinates: GeoQueryCoordinates;
  /** Geo-relationship (near, within, etc.). */
  georel: string;
  /**
   * Specifies the GeoProperty to which the GeoQuery is to be applied.
   * If not present, the default GeoProperty is location.
   */
  geoproperty?: string;
}

/**
 * Node type.
 */
export type LanguagePropertyType =
  (typeof LanguagePropertyType)[keyof typeof LanguagePropertyType];

export const LanguagePropertyType = {
  LanguageProperty: "LanguageProperty",
} as const;

/**
 * String Property Values defined in multiple natural languages.
 */
export type LanguagePropertyLanguageMap = { [key: string]: unknown };

/**
 * Previous LanguageProperty's languageMap. Only used in notifications, if the showChanges
 * option is explicitly requested.
 */
export type LanguagePropertyPreviousLanguageMap = { [key: string]: unknown };

/**
 * 5.2.32 NGSI-LD LanguageProperty.
 */
export interface LanguageProperty {
  /** Node type. */
  type?: LanguagePropertyType;
  /** String Property Values defined in multiple natural languages. */
  languageMap?: LanguagePropertyLanguageMap;
  /** Timestamp. See clause 4.8. */
  observedAt?: ObservedAt;
  /** It allows identifying a set or group of property values. */
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  /**
   * A URI uniquely identifying a LanguageProperty instance,
   * as mandated by clause 4.5.7. System generated.
   * Only used in temporal representation of LanguageProperties.
   */
  readonly instanceId?: string;
  /**
   * Previous LanguageProperty's languageMap. Only used in notifications, if the showChanges
   * option is explicitly requested.
   */
  readonly previousLanguageMap?: LanguagePropertyPreviousLanguageMap;
  /** Dynamic NGSI-LD attributes (Properties, Relationships, etc.). */
  $props?: { [key: string]: NgsildAttribute };
}

export type LdContextMetadataItemKind =
  (typeof LdContextMetadataItemKind)[keyof typeof LdContextMetadataItemKind];

export const LdContextMetadataItemKind = {
  Cached: "Cached",
  Hosted: "Hosted",
  ImplicitlyCreated: "ImplicitlyCreated",
} as const;

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

/**
 * JSON object which represents information (metadata)
 * about an @context currently stored by the Broker as defined in 5.13.3.5. It contains information about the @context's
 * original URL (if any), its local identifier in the Broker's storage, its kind ("Cached", "Hosted" and "ImplicitlyCreated"),
 * its creation timestamp, its expiry date (if "Cached"), and additional optional information.
 */
export type LdContextMetadata = LdContextMetadataItem[];

/**
 * 5.2.19 This datatype represents additional information provided by an implementation
 * when an Attribute update did not happen.
 */
export interface NotUpdatedDetails {
  /** Attribute name. */
  attributeName: string;
  /** Reason for not having changed such Attribute. */
  reason: string;
  /** Registration Id corresponding to a failed distributed operation (optional). */
  registrationId?: string;
}

/**
 * JSON-LD @type.
 */
export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export const NotificationType = {
  Notification: "Notification",
} as const;

/**
 * 5.3.1 This datatype represents the parameters that allow building a notification to be sent to a subscriber.
 */
export interface Notification {
  /** Notification identifier (JSON-LD @id). It shall be automatically generated by the implementation. */
  id: string;
  /** JSON-LD @type. */
  type: NotificationType;
  /** Identifier of the subscription that originated the notification. */
  subscriptionId: string;
  /** Timestamp corresponding to the instant when the notification was generated by the system. */
  notifiedAt: string;
  /**
   * The content of the notification as NGSI-LD Entities. See clause 5.2.4.
   *
   * If the notification has been triggered from a Subscription that has the notification.
   * endpoint.accept field set to application/geo+json then data is returned as a FeatureCollection.
   * In this case, if the notification.endpoint.rece iverInfo contains the key "Prefer" and
   * it is set to the value "body=json", then the FeatureCollection will not contain
   * an @context field.
   *
   * If endpoint.accept is not set or holds another value then Entity[] is returned.
   */
  data: Entity[] | FeatureCollection;
}

/**
 * Conveys the representation format of the entities delivered at notification time.
 * By default, it will be in the normalized format.
 */
export type NotificationParamsFormat =
  (typeof NotificationParamsFormat)[keyof typeof NotificationParamsFormat];

export const NotificationParamsFormat = {
  normalized: "normalized",
  concise: "concise",
  keyValues: "keyValues",
} as const;

/**
 * String representing the type of Linked Entity retrieval to apply.
 */
export type NotificationParamsJoin =
  (typeof NotificationParamsJoin)[keyof typeof NotificationParamsJoin];

export const NotificationParamsJoin = {
  flat: "flat",
  inline: "inline",
  "@none": "@none",
} as const;

/**
 * Status of the Notification. It shall be "ok" if the last attempt to notify the subscriber succeeded.
 * It shall be "failed" if the last attempt to notify the subscriber failed.
 */
export type NotificationParamsStatus =
  (typeof NotificationParamsStatus)[keyof typeof NotificationParamsStatus];

export const NotificationParamsStatus = {
  ok: "ok",
  failed: "failed",
} as const;

/**
 * 5.2.14 This datatype represents the parameters that allow to convey the details of a notification.
 */
export interface NotificationParams {
  /**
   * Entity Attribute Names (Properties or Relationships) to be included in the notification payload body.
   * If undefined it will mean all Attributes.
   *
   * A synonym for a combination of the pick and q parameter. DEPRECATED.
   * @deprecated
   * @minItems 1
   */
  attributes?: string[];
  /**
   * If true, the system generated attributes createdAt and modifiedAt are included in
   * the response payload body, in the case of a deletion also deletedAt.
   */
  sysAttrs?: boolean;
  /**
   * Conveys the representation format of the entities delivered at notification time.
   * By default, it will be in the normalized format.
   */
  format?: NotificationParamsFormat;
  /**
   * When defined, every Entity within payload body is reduced down to only contain
   * the specified Entity members.
   * Entity member ("id", "type", "scope" or a projected Attribute name) as a valid
   * attribute projection language string as per clause 4.21).
   * @minItems 1
   */
  pick?: string[];
  /**
   * When defined, the specified Entity members are removed from each Entity within
   * the payload. Entity member ("id", "type", "scope" or a projected Attribute name)
   * as a valid attribute projection language string as per clause 4.21).
   * @minItems 1
   */
  omit?: string[];
  /**
   * If true the previous value (previousValue) of Properties or languageMap (previousLanguageMap) of
   * Language Properties or object (previousObject) of Relationships is provided in addition to the current one.
   * This requires that it exists, i.e. in case of modifications and deletions,
   *  but not in the case of creations. showChanges cannot be true in case format is "keyValues".
   */
  showChanges?: boolean;
  /** String representing the type of Linked Entity retrieval to apply. */
  join?: NotificationParamsJoin;
  /**
   * Depth of Linked Entity retrieval to apply. Only applicable if join parameter is "flat" or "inline".
   * @minimum 1
   */
  joinLevel?: number;
  /** Notification endpoint details. */
  endpoint: Endpoint;
  /**
   * Status of the Notification. It shall be "ok" if the last attempt to notify the subscriber succeeded.
   * It shall be "failed" if the last attempt to notify the subscriber failed.
   */
  readonly status?: NotificationParamsStatus;
  /**
   * Number of times that the notification has been sent. Provided by the system when
   * querying the details of a subscription.
   * @minimum 1
   */
  readonly timesSent?: number;
  /**
   * Number of times an unsuccessful response (or timeout) has been received when deliverying the notification.
   * Provided by the system when querying the details of a subscription.
   * @minimum 1
   */
  readonly timesFailed?: number;
  /**
   * Timestamp corresponding to the instant when the last notification has been sent.
   * Provided by the system when querying the details of a subscription.
   */
  readonly lastNotification?: string;
  /**
   * Timestamp corresponding to the instant when the last notification resulting in failure
   * (for instance, in the HTTP binding, an HTTP response code different than 200) has been sent.
   * Provided by the system when querying the details of a subscription.
   */
  readonly lastFailure?: string;
  /**
   * Timestamp corresponding to the instant when the last successful (200 OK response) notification
   * has been sent. Provided by the system when querying the details of a subscription.
   */
  readonly lastSuccess?: string;
}

/**
 * Common schema for URI data type in path parameters.
 */
export type Path = string;

/**
 * Node type.
 */
export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

export const PropertyType = {
  Property: "Property",
} as const;

/**
 * 5.2.5 NGSI-LD Property.
 */
export interface Property {
  /** Node type. */
  type?: PropertyType;
  /** Property value. */
  value?: DateTimeValue | JsonValue;
  /** Timestamp. See clause 4.8. */
  observedAt?: ObservedAt;
  /** Property Value's unit code. */
  unitCode?: string;
  /** It allows identifying a set or group of property values. */
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  /**
   * A URI uniquely identifying a Property instance as
   * mandated by clause 4.5.7. System generated.
   * Only used in temporal representation of Properties.
   */
  readonly instanceId?: string;
  /**
   * Previous Property value. Only used in notifications, if the showChanges
   * option is explicitly requested.
   */
  readonly previousValue?: DateTimeValue | JsonValue;
  /** Dynamic NGSI-LD attributes (Properties, Relationships, etc.). */
  $props?: { [key: string]: NgsildAttribute };
}

/**
 * JSON-LD @type.
 */
export type QueryType = (typeof QueryType)[keyof typeof QueryType];

export const QueryType = {
  Query: "Query",
} as const;

/**
 * 5.2.23 This datatype represents the information that is required in order to convey
 * a query when a "Query Entities" operation is to be performed (as per clause 5.7.2).
 */
export interface Query {
  /** JSON-LD @type. */
  type: QueryType;
  /**
   * Entity ids, id pattern and Entity types that shall be matched by Entities in order to be retrieved.
   * @minItems 1
   */
  entities?: EntitySelector[];
  /**
   * List of Attributes that shall be matched by Entities in order to be retrieved.
   * If not present all Attributes will be retrieved.
   * A synonym for a combination of the pick and q parameter. DEPRECATED.
   * @deprecated
   * @minItems 1
   */
  attrs?: string[];
  /**
   * When defined, every Entity within payload body is reduced down to only contain
   * the specified Entity members.
   * Entity member ("id", "type", "scope" or a projected Attribute name) as a valid
   * attribute projection language string as per clause 4.21).
   * @minItems 1
   */
  pick?: string[];
  /**
   * When defined, the specified Entity members are removed from each Entity within
   * the payload. Entity member ("id", "type", "scope" or a projected Attribute name)
   * as a valid attribute projection language string as per clause 4.21).
   * @minItems 1
   */
  omit?: string[];
  /** Query that shall be matched by Entities in order to be retrieved. */
  q?: string;
  /** Geoquery that shall be matched by Entities in order be retrieved. */
  geoQ?: GeoQuery;
  /**
   * Context source filter that shall be matched by Context Source Registrations describing
   * Context Sources to be used for retrieving Entities.
   */
  csf?: string;
  /** Scope query. */
  scopeQ?: string;
  /** Language filter to be applied to the query (clause 4.15). */
  lang?: string;
  /**
   * List of entity ids which have previously been encountered whilst retrieving the Entity Graph.
   * Only applicable if joinLevel is present.
   * Only applicable for the "Query Entities" operation (clause 5.7.2).
   * @minItems 1
   */
  containedBy?: string[];
  /**
   * Specifies the datasetIds of the Attribute instances to be selected for each
   * matched Attribute as per clause 4.5.5. Valid URIs, "@none" for including the
   * default Attribute instances.
   */
  datasetId?: string[];
  /**
   * If true, the location of the EntityMap used in the operation is returned in the response.
   * Only applicable for the "Query Entities" operation (clause 5.7.2).
   */
  entityMap?: boolean;
}

/**
 * Allowed values: "before", "after" and "between".
 */
export type TemporalQueryTimerel =
  (typeof TemporalQueryTimerel)[keyof typeof TemporalQueryTimerel];

export const TemporalQueryTimerel = {
  before: "before",
  after: "after",
  between: "between",
} as const;

/**
 * Allowed values: "observedAt", "createdAt", "modifiedAt" and "deletedAt".
 * If not specified, the default is "observedAt". (See clause 4.8).
 */
export type TemporalQueryTimeproperty =
  (typeof TemporalQueryTimeproperty)[keyof typeof TemporalQueryTimeproperty];

export const TemporalQueryTimeproperty = {
  observedAt: "observedAt",
  createdAt: "createdAt",
  modifiedAt: "modifiedAt",
  deletedAt: "deletedAt",
} as const;

/**
 * 5.2.21 This datatype represents a temporal query.
 */
export interface TemporalQuery {
  /** Allowed values: "before", "after" and "between". */
  timerel: TemporalQueryTimerel;
  /** It shall be a DateTime. */
  timeAt: string;
  /** It shall be a DateTime. Cardinality shall be 1 if timerel is equal to "between". */
  endTimeAt?: string;
  /**
   * Allowed values: "observedAt", "createdAt", "modifiedAt" and "deletedAt".
   * If not specified, the default is "observedAt". (See clause 4.8).
   */
  timeproperty?: TemporalQueryTimeproperty;
}

/**
 * 5.2.23 This datatype represents the information that is required in order to convey
 * a query when a "Query Temporal Evolution of Entities" operation is to be performed (as pe clause 5.7.4).
 */
export type QueryTemporal = Query & {
  /** Temporal Query to be present only for "Query Temporal Evolution of Entities" operation (clause 5.7.4). */
  temporalQ?: TemporalQuery;
};

/**
 * Node type.
 */
export type RelationshipType =
  (typeof RelationshipType)[keyof typeof RelationshipType];

export const RelationshipType = {
  Relationship: "Relationship",
} as const;

/**
 * 5.2.6 NGSI-LD Relationship.
 */
export interface Relationship {
  /** Node type. */
  type?: RelationshipType;
  /** Relationship's target object. */
  object?: string | string[];
  /**
   * Node Type of the Relationship's target object.
   * Both short hand string(s) (type name) or URI(s) are allowed.
   */
  objectType?: string | string[];
  /** Timestamp. See clause 4.8. */
  observedAt?: ObservedAt;
  /** It allows identifying a set or group of target relationship objects. */
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  /**
   * A URI uniquely identifying a Relationship instance
   * as mandated by clause 4.5.8. System generated.
   * Only used in temporal representation of Relationships.
   */
  readonly instanceId?: string;
  /**
   * Previous Relationship's target object. Only used in notifications, if the showChanges
   * option is explicitly requested.
   */
  readonly previousObject?: string | string[];
  /**
   * An inline Entity obtained by Linked Entity Retrieval, corresponding to the
   * Relationship's target object. See clause 4.5.23.2. Only used in Linked Entity
   * Retrieval, if the join=inline option is explicitly requested.
   */
  readonly entity?: Entity | Entity[];
  /** Dynamic NGSI-LD attributes (Properties, Relationships, etc.). */
  $props?: { [key: string]: NgsildAttribute };
}

/**
 * JSON-LD @type.
 */
export type SubscriptionCommonType =
  (typeof SubscriptionCommonType)[keyof typeof SubscriptionCommonType];

export const SubscriptionCommonType = {
  Subscription: "Subscription",
} as const;

export type SubscriptionCommonNotificationTriggerItem =
  (typeof SubscriptionCommonNotificationTriggerItem)[keyof typeof SubscriptionCommonNotificationTriggerItem];

export const SubscriptionCommonNotificationTriggerItem = {
  entityCreated: "entityCreated",
  entityUpdated: "entityUpdated",
  entityDeleted: "entityDeleted",
  attributeCreated: "attributeCreated",
  attributeUpdated: "attributeUpdated",
  attributeDeleted: "attributeDeleted",
} as const;

/**
 * Read-only. Provided by the system when querying the details of a subscription.
 */
export type SubscriptionCommonStatus =
  (typeof SubscriptionCommonStatus)[keyof typeof SubscriptionCommonStatus];

export const SubscriptionCommonStatus = {
  active: "active",
  paused: "paused",
  expired: "expired",
} as const;

/**
 * 5.2.12 This datatype represents a Context Subscription.
 */
export interface SubscriptionCommon {
  /** Subscription identifier (JSON-LD @id). */
  id?: string;
  /** JSON-LD @type. */
  type?: SubscriptionCommonType;
  /** A (short) name given to this Subscription. */
  subscriptionName?: string;
  /** Subscription description. */
  description?: string;
  /**
   * Entities subscribed.
   * Mandatory if timeInterval is present, unless the execution of the request
   * is limited to local scope (see clause 5.5.13).
   * @minItems 1
   */
  entities?: EntitySelector[];
  /**
   * If localOnly=true then the subscription only pertains to the Entities
   * stored locally (see clause 5.5.13).
   */
  localOnly?: boolean;
  /**
   * The notification triggers listed indicate what kind of changes shall trigger a notification.
   * If not present, the default is the combination attributeCreated and attributeUpdated.
   * entityUpdated is equivalent to the combination attributeCreated, attributeUpdated and attributeDeleted.
   */
  notificationTrigger?: SubscriptionCommonNotificationTriggerItem[];
  /** Query that shall be met by subscribed entities in order to trigger the notification. */
  q?: string;
  /** Geoquery that shall be met by subscribed entities in order to trigger the notification. */
  geoQ?: GeoQuery;
  /**
   * Context source filter that shall be met by Context Source Registrations describing Context Sources
   * to be used for Entity Subscriptions.
   */
  csf?: string;
  /**
   * Allows clients to temporarily pause the subscription by making it inactive.
   * true indicates that the Subscription is under operation.
   * false indicates that the subscription is paused and notifications shall not be delivered.
   */
  isActive?: boolean;
  /** Notification details. */
  notification?: NotificationParams;
  /** Expiration date for the subscription. */
  expiresAt?: string;
  /**
   * Temporal Query to be used only in Context Registration Subscriptions for matching
   * Context Source Registrations of Context Sources providing temporal information.
   */
  temporalQ?: TemporalQuery;
  /** Scope query. */
  scopeQ?: string;
  /** Language filter to be applied to the query (clause 4.15). */
  lang?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  /** Read-only. Provided by the system when querying the details of a subscription. */
  readonly status?: SubscriptionCommonStatus;
  /**
   * The dereferenceable URI of the JSON-LD @context to be used when sending
   * a notification resulting from the subscription. If not provided, the
   * @context used for the subscription shall be used as a default.
   */
  jsonldContext?: string;
  /**
   * Specifies the datasetIds of the Attribute instances to be selected for each
   * matched Attribute as per clause 4.5.5. Valid URIs, "@none" for including the
   * default Attribute instances.
   */
  datasetId?: string[];
}

export type SubscriptionOnChange = SubscriptionCommon & {
  /**
   * Watched Attributes (Properties or Relationships). If not defined it means any Attribute.
   * @minItems 1
   */
  watchedAttributes?: string[];
  /**
   * Minimal period of time in seconds which shall elapse between two consecutive notifications.
   * @minimum 1
   */
  throttling?: number;
};

export type SubscriptionPeriodic = SubscriptionCommon & {
  /**
   * Indicates that a notification shall be delivered periodically regardless of attribute changes.
   * Actually, when the time interval (in seconds) specified in this value field is reached.
   * @minimum 1
   */
  timeInterval?: number;
};

export type Subscription = SubscriptionOnChange | SubscriptionPeriodic;

/**
 * 5.2.18 This datatype represents the result of Attribute update (append or update) operations
 * in the NGSI-LD API regardless of whether local or distributed.
 */
export interface UpdateResult {
  /** List of Attributes (represented by their Name) that were appended or updated. */
  updated: string[];
  /**
   * List which contains the Attributes (represented by their Name) that were not updated,
   * together with the reason for not being updated.
   */
  notUpdated: NotUpdatedDetails[];
}

/**
 * Node type.
 */
export type VocabPropertyType =
  (typeof VocabPropertyType)[keyof typeof VocabPropertyType];

export const VocabPropertyType = {
  VocabProperty: "VocabProperty",
} as const;

/**
 * 5.2.35 NGSI-LD VocabProperty.
 */
export interface VocabProperty {
  /** Node type. */
  type?: VocabPropertyType;
  /** String Values which shall be type coerced to URIs based on the supplied @context. */
  vocab?: string | string[];
  /**
   * Previous VocabProperty's vocab. Only used in notifications, if the showChanges
   * option is explicitly requested.
   */
  readonly previousVocab?: string | string[];
  /** Timestamp. See clause 4.8. */
  observedAt?: ObservedAt;
  /** It allows identifying a set or group of property values. */
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  /**
   * A URI uniquely identifying a VocabProperty instance,
   * as mandated by clause 4.5.7. System generated.
   * Only used in temporal representation of VocabProperties.
   */
  readonly instanceId?: string;
  /** Dynamic NGSI-LD attributes (Properties, Relationships, etc.). */
  $props?: { [key: string]: NgsildAttribute };
}

/**
 * Node type.
 */
export type ListPropertyType =
  (typeof ListPropertyType)[keyof typeof ListPropertyType];

export const ListPropertyType = {
  ListProperty: "ListProperty",
} as const;

/**
 * 5.2.36 NGSI-LD ListProperty.
 */
export interface ListProperty {
  /** Node type. */
  type?: ListPropertyType;
  /** Ordered array of Property Values. */
  valueList?: (DateTimeValue | JsonValue)[];
  /** Timestamp. See clause 4.8. */
  observedAt?: ObservedAt;
  /** Property Value's unit code. */
  unitCode?: string;
  /** It allows identifying a set or group of property list values. */
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  /**
   * A URI uniquely identifying a ListProperty instance as
   * mandated by clause 4.5.7. System generated.
   * Only used in temporal representation of ListProperties.
   */
  readonly instanceId?: string;
  /**
   * Ordered array of Property Values. See NGSI-LD Value
   * definition in clause 3.1
   */
  readonly previousValueList?: readonly (DateTimeValue | JsonValue)[];
  /** Dynamic NGSI-LD attributes (Properties, Relationships, etc.). */
  $props?: { [key: string]: NgsildAttribute };
}

/**
 * Node type.
 */
export type ListRelationshipType =
  (typeof ListRelationshipType)[keyof typeof ListRelationshipType];

export const ListRelationshipType = {
  ListRelationship: "ListRelationship",
} as const;

/**
 * Ordered array of Relationship target objects.
 * In the normalized form, each array element holds a JSON object
 * containing a containing a single Attribute with a key called "object"
 * and where the value is a valid URI. In the concise form, each string
 * in the array holds a valid URI.
 */
export type ListRelationshipObjectList =
  { [key: string]: unknown }[] | string[];

/**
 * Ordered array of previous Relationship target objects.
 * In the normalized form, each array element holds a JSON object
 * containing a containing a single Attribute with a key called "object"
 * and where the value is a valid URI. In the concise form, each string
 * in the array holds a valid URI.
 */
export type ListRelationshipPreviousObjectList =
  { [key: string]: unknown }[] | string[];

/**
 * 5.2.37 NGSI-LD ListRelationship.
 */
export interface ListRelationship {
  /** Node type. */
  type?: ListRelationshipType;
  /**
   * Ordered array of Relationship target objects.
   * In the normalized form, each array element holds a JSON object
   * containing a containing a single Attribute with a key called "object"
   * and where the value is a valid URI. In the concise form, each string
   * in the array holds a valid URI.
   */
  objectList?: ListRelationshipObjectList;
  /**
   * Node Type of the Relationship's target object.
   * Both short hand string(s) (type name) or URI(s) are allowed.
   */
  objectType?: string | string[];
  /** Timestamp. See clause 4.8. */
  observedAt?: ObservedAt;
  /** It allows identifying a set or group of target relationship objects. */
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  /**
   * A URI uniquely identifying a ListRelationship instance
   * as mandated by clause 4.5.8. System generated.
   * Only used in temporal representation of ListRelationships.
   */
  readonly instanceId?: string;
  /**
   * Ordered array of previous Relationship target objects.
   * In the normalized form, each array element holds a JSON object
   * containing a containing a single Attribute with a key called "object"
   * and where the value is a valid URI. In the concise form, each string
   * in the array holds a valid URI.
   */
  readonly previousObjectList?: ListRelationshipPreviousObjectList;
  /**
   * An array of inline Entity obtained by Linked Entity Retrieval, corresponding
   * to the ListRelationship's target object. See clause 4.5.23.2. Only used in
   * Linked Entity Retrieval, if the join=inline option is explicitly requested.
   */
  readonly entityList?: readonly Entity[];
  /** Dynamic NGSI-LD attributes (Properties, Relationships, etc.). */
  $props?: { [key: string]: NgsildAttribute };
}

/**
 * Node type.
 */
export type JsonPropertyType =
  (typeof JsonPropertyType)[keyof typeof JsonPropertyType];

export const JsonPropertyType = {
  JsonProperty: "JsonProperty",
} as const;

/**
 * Raw unexpandable JSON which shall not be interpreted as JSON-LD using the supplied @context.
 */
export type JsonPropertyJson = { [key: string]: unknown };

/**
 * Previous JsonProperty's json. Only used in notifications, if the showChanges
 * option is explicitly requested.
 */
export type JsonPropertyPreviousJson = { [key: string]: unknown };

/**
 * 5.2.38 NGSI-LD JsonProperty.
 */
export interface JsonProperty {
  /** Node type. */
  type?: JsonPropertyType;
  /** Raw unexpandable JSON which shall not be interpreted as JSON-LD using the supplied @context. */
  json?: JsonPropertyJson;
  /**
   * Previous JsonProperty's json. Only used in notifications, if the showChanges
   * option is explicitly requested.
   */
  readonly previousJson?: JsonPropertyPreviousJson;
  /** Timestamp. See clause 4.8. */
  observedAt?: ObservedAt;
  /** It allows identifying a set or group of property values. */
  datasetId?: string;
  readonly createdAt?: CreatedAt;
  readonly modifiedAt?: ModifiedAt;
  readonly deletedAt?: DeletedAt;
  /**
   * A URI uniquely identifying a JsonProperty instance,
   * as mandated by clause 4.5.7. System generated.
   * Only used in temporal representation of JsonProperties.
   */
  readonly instanceId?: string;
  /** Dynamic NGSI-LD attributes (Properties, Relationships, etc.). */
  $props?: { [key: string]: NgsildAttribute };
}

/**
 * Node type.
 */
export type EntityMapType = (typeof EntityMapType)[keyof typeof EntityMapType];

export const EntityMapType = {
  EntityMap: "EntityMap",
} as const;

/**
 * System generated mapping of Entities to CSourceRegistrations.
 *
 * A set of key-value pairs whose keys shall be strings representing
 * Entity ids and whose values shall be an array holding every
 * CSourceRegistration id which is relevant to the ongoing Context
 * Information Consumption request (see clause 4.21).
 *
 * The key "@none" shall be used to refer to an Entity that is held locally.
 */
export type EntityMapEntityMap = { [key: string]: unknown };

/**
 * System generated mapping of Context CSourceRegistrations to a URI
 * indicating which EntityMaps was used by the Context Source.
 *
 * A set of key-value pairs whose keys shall be strings representing
 * CSourceRegistration ids which are relevant to the ongoing Context
 * Information request and whose values shall represent the associated
 * EntityMap id used by the ContextSource.
 */
export type EntityMapLinkedMaps = { [key: string]: unknown };

/**
 * 5.2.39 EntityMap.
 */
export interface EntityMap {
  /** EntityMap id. */
  id?: string;
  /** Node type. */
  type: EntityMapType;
  /** Expiration date for the EntityMap. */
  expiresAt: string;
  /**
   * System generated mapping of Entities to CSourceRegistrations.
   *
   * A set of key-value pairs whose keys shall be strings representing
   * Entity ids and whose values shall be an array holding every
   * CSourceRegistration id which is relevant to the ongoing Context
   * Information Consumption request (see clause 4.21).
   *
   * The key "@none" shall be used to refer to an Entity that is held locally.
   */
  readonly entityMap?: EntityMapEntityMap;
  /**
   * System generated mapping of Context CSourceRegistrations to a URI
   * indicating which EntityMaps was used by the Context Source.
   *
   * A set of key-value pairs whose keys shall be strings representing
   * CSourceRegistration ids which are relevant to the ongoing Context
   * Information request and whose values shall represent the associated
   * EntityMap id used by the ContextSource.
   */
  readonly linkedMaps?: EntityMapLinkedMaps;
}

/**
 * Node type.
 */
export type ContextSourceIdentityType =
  (typeof ContextSourceIdentityType)[keyof typeof ContextSourceIdentityType];

export const ContextSourceIdentityType = {
  ContextSourceIdentity: "ContextSourceIdentity",
} as const;

/**
 * Instance specific information relevant to the configuration
 * of the Context Source itself in raw unexpandable JSON which
 * shall not be interpreted as JSON-LD using the supplied @context.
 */
export type ContextSourceIdentityContextSourceExtras = {
  [key: string]: unknown;
};

/**
 * 5.2.40 This type represents the data uniquely identifying a Context Source,
 * and if the Context Source supports multi-tenancy (see clause 4.14) uniquely
 * identifying a Tenant within that Context Source.
 */
export interface ContextSourceIdentity {
  /** Context Source ID. */
  id: string;
  /** Node type. */
  type: ContextSourceIdentityType;
  /**
   * Instance specific information relevant to the configuration
   * of the Context Source itself in raw unexpandable JSON which
   * shall not be interpreted as JSON-LD using the supplied @context.
   */
  contextSourceExtras?: ContextSourceIdentityContextSourceExtras;
  /** Total Duration that the Context Source has been available. */
  contextSourceUpTime: string;
  /**
   * Current time observed at the Context Source. Timestamp.
   * See clause 4.8.
   */
  contextSourceTimeAt: string;
  /**
   * A unique id for a Context Source which can be used to identify loops.
   * In the multi-tenancy use case (see clause 4.14), this id shall be
   * used to identify a specific Tenant within a registered Context Source.
   * @minLength 1
   */
  contextSourceAlias: string;
}

/**
 * It is used to indicate that the request or its content is incorrect,
 * see clause 6.3.2. In the returned ProblemDetails structure, the "detail"
 * attribute should convey more information about the error.
 */
export type BadRequestResponse = ProblemDetails;

/**
 * It is used to indicate that the entity or an exclusive or redirect
 * registration defining the entity already exists, see clause 6.3.2.
 * In the returned ProblemDetails structure, the "detail" attribute should
 * convey more information about the error.
 */
export type ConflictResponse = ProblemDetails;

/**
 * If the entity input data matches to a registration, the relevant parts of the request are forwarded
 * as a distributed operation. In the case when an error response is received back from any distributed
 * operation, a response body containing the result returned from each registration is returned in a
 * BatchOperationResult structure. Errors can occur whenever a distributed operation is unsupported,
 * fails or times out, see clause 6.3.17.
 */
export type MultiStatusBatchOperationResultResponse = BatchOperationResult;

/**
 * Only the Attributes included in the response payload body were successfully appended. If no Attributes
 * were successfully updated the updated array of UpdateResult (see clause 5.2.18) will be empty.
 *
 * If the entity input data matches to a registration, the relevant parts of the request are
 * forwarded as a distributed operation.
 *
 * In the case when an error response is received back from any distributed operation, a response
 * body containing the result returned from each registration is returned in a UpdateResult structure.
 *
 * Names of the Attributes included in the UpdateResult structure are represented as Fully Qualified Names as per clause 6.3.6.
 *
 * Errors can occur whenever a distributed operation is unsupported, fails or times out, see clause 6.3.17.
 */
export type MultiStatusUpdateResultResponse = UpdateResult;

/**
 * It is used when a client provided an entity identifier (URI) not known
 * to the system, see clause 6.3.2.
 */
export type NotFoundResponse = ProblemDetails;

/**
 * It is used when re-downloading fails.
 */
export type GatewayTimeoutResponse = ProblemDetails;

/**
 * It is used to indicate that the operation is not available,
 * see clause 6.3.2. In the returned ProblemDetails structure,
 * the "detail" attribute should convey more information about the error.
 */
export type UnprocessableResponse = ProblemDetails;

/**
 * It is used by Registered Context Sources to indicate that the data format
 * of the request is unsupported see clause 6.3.7.
 */
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

export type EntityTemporalBody = EntityTemporal & {
  "@context"?: LdContext;
};

export type EntityTemporalFragmentBody = EntityTemporal & {
  "@context"?: LdContext;
};

export type QueryTemporalBody = QueryTemporal;

export type SubscriptionBody = Subscription & {
  "@context"?: LdContext;
};

export type SubscriptionFragmentBody = Subscription & {
  "@context"?: LdContext;
};

/**
 * If present, the EntityMap supplied is used for determining the set of Entities requested during the query operation.
 * The location of the EntityMap used in the query/retrieval operation is returned in the response.
 */
export type HeadersNgsildEntityMapParameter = string;

/**
 * 6.3.5 JSON-LD @context resolution
 *
 * In summary, from a developer's perspective, for POST, PATCH and PUT operations,
 * if MIME type is "application/ld+json", then the associated @context shall be provided
 * only as part of the request payload body. Likewise, if MIME type is "application/json",
 * then the associated @context shall be provided only by using the JSON-LD Link header.
 * No mixes are allowed, i.e. mixing options shall result in HTTP response errors.
 * Implementations should provide descriptive error messages when these situations arise.
 *
 * In contrast, GET and DELETE operations always take their input @context from the JSON-LD Link Header.
 */
export type HeadersLinkParameter = string;

/**
 * 6.3.14 Tenant specification. The tenant to which the NGSI-LD HTTP operation is targeted.
 */
export type HeadersNgsildTenantParameter = string;

/**
 * 6.3.18 Limiting Distributed Operations
 *
 * If present, the listing of previously encountered Context Sources supplied is used when determining
 * matching registrations. HTTP Via Header (IETF RFC 7230).
 *
 * Any Context Broker implementation passing a distributed operation request onward to another Context Source
 * shall send an additional field value on the Via header field using its own unique Context Source "hostAlias"
 * (see clause 5.2.40) as the pseudonym.
 */
export type HeadersViaParameter = string;

export type QueryAggrMethodsParameter =
  (typeof QueryAggrMethodsParameter)[keyof typeof QueryAggrMethodsParameter];

export const QueryAggrMethodsParameter = {
  totalCount: "totalCount",
  distinctCount: "distinctCount",
  sum: "sum",
  avg: "avg",
  min: "min",
  max: "max",
  stddev: "stddev",
  sumsq: "sumsq",
} as const;

/**
 * If not specified, it defaults to a duration of 0 seconds and is interpreted as a duration spanning
 * the whole time range specified by the temporal query.
 *
 * Only applicable if aggregatedValues is present in the options parameter.
 */
export type QueryAggrPeriodDurationParameter = string;

/**
 * List of Attributes to be matched by the Entity and included in the response. If the Entity does not
 * have any of the Attributes in attrs, then a 404 Not Found shall be retrieved. If attrs is not
 * specified, no matching is performed and all Attributes related to the Entity shall be retrieved.
 *
 * A synonym for a combination of the pick and q parameters. DEPRECATED.
 * Each String is an Attribute (Property or Relationship) name.
 * @deprecated
 */
export type QueryAttrsParameter = string[];

/**
 * List of entity ids which have previously been encountered whilst retrieving the
 * Entity Graph. Only applicable if joinLevel is present.
 */
export type QueryContainedByParameter = string[];

/**
 * Coordinates serialized as a string as per clause 4.10. It is part of geoquery.
 * It shall be one if geometry or georel are present.
 */
export type QueryCoordinatesParameter =
  | GeometryPosition
  | GeometryPositionArray
  | GeometryLineString
  | GeometryLinearRing
  | GeometryPolygon;

/**
 * 6.3.13 Counting number of results. If true, then a special HTTP header (NGSILD-Results-Count) is set in
 * the response. Regardless of how many entities are actually returned (maybe due to the "limit" URI parameter),
 * the total number of matching results (e.g. number of Entities) is returned.
 */
export type QueryCountParameter = boolean;

/**
 * Context Source filter as per clause 4.9.
 */
export type QueryCsfParameter = string;

/**
 * Specifies the datasetIds of the Attribute instances to be selected for each matched Attribute as per clause 4.5.5,
 * or the datasetId of the dataset to be deleted.
 */
export type QueryDatasetIdParameter = string | string[];

/**
 * Whether a list of URLs or a more detailed list of JSON Objects is requested.
 */
export type QueryDetailsParameter = boolean;

/**
 * If true, all attribute instances are deleted. Otherwise (default) only the Attribute instance specified
 * by the datasetId is deleted. In case neither the deleteAll flag nor a datasetId is present,
 * the default Attribute instance is deleted.
 */
export type QueryDeleteAllParameter = boolean;

/**
 * It shall be a DateTime. Cardinality shall be 1 if timerel is equal to "between".
 * String representing the endTimeAt parameter as defined by clause 4.11.
 */
export type QueryEndTimeAtParameter = string;

/**
 * If true, the location of the EntityMap used in the operation is returned in the response.
 */
export type QueryEntityMapParameter = boolean;

export type QueryFormatEntitiesParameter = FormatRepresentation;

export type QueryFormatTemporalParameter = FormatTemporal;

/**
 * List of entity ids to be retrieved.
 */
export type QueryIdParameter = string[];

/**
 * Regular expression that shall be matched by entity ids.
 */
export type QueryIdPatternParameter = string;

/**
 * 4.5.16.1 Top-level "geometry" field selection algorithm.
 * A parameter of the request (named "geometryProperty") may be used to indicate the name of the GeoProperty to be selected.
 * If this parameter is not present, then the default name of "location" shall be used.
 *
 * In the case of GeoJSON Entity representation, this parameter indicates which GeoProperty to use
 * for the toplevel geometry field.
 */
export type QueryGeometryPropertyParameter = string;

export type QueryGeometryParameter =
  (typeof QueryGeometryParameter)[keyof typeof QueryGeometryParameter];

export const QueryGeometryParameter = {
  Point: "Point",
  MultiPoint: "MultiPoint",
  LineString: "LineString",
  MultiLineString: "MultiLineString",
  Polygon: "Polygon",
  MultiPolygon: "MultiPolygon",
} as const;

export type QueryGeopropertyParameter =
  (typeof QueryGeopropertyParameter)[keyof typeof QueryGeopropertyParameter];

export const QueryGeopropertyParameter = {
  location: "location",
  observationSpace: "observationSpace",
  operationSpace: "operationSpace",
} as const;

/**
 * Geo relationship as per clause 4.10. It is part of geoquery. It shall be one if
 * geometry or georel are present.
 */
export type QueryGeorelParameter =
  | "equals"
  | "disjoint"
  | "intersects"
  | "within"
  | "contains"
  | "overlaps"
  | string;

/**
 * The type of Linked Entity retrieval to apply (see clause 4.5.23). Allowed values: "flat", "inline", "@none".
 */
export type QueryJoinParameter = string;

/**
 * Depth of Linked Entity retrieval to apply. Only applicable if join parameter is present.
 */
export type QueryJoinLevelParameter = number;

export type QueryKindParameter =
  (typeof QueryKindParameter)[keyof typeof QueryKindParameter];

export const QueryKindParameter = {
  Cached: "Cached",
  Hosted: "Hosted",
  ImplicitlyCreated: "ImplicitlyCreated",
} as const;

/**
 * It is used to reduce languageMaps to a string or string array property in a single preferred language.
 */
export type QueryLangParameter = string;

/**
 * Only the last n instances, per Attribute, per Entity (under the specified time interval) shall be retrieved.
 */
export type QueryLastNParameter = number;

/**
 * 6.3.10 Pagination behaviour. It defines the limit to the number of NGSI-LD Elements that shall be retrieved
 * at a maximum as mandated by clause 5.5.9. The value 0 is only allowed in combination with
 * the count URI parameter.
 */
export type QueryLimitParameter = number;

/**
 * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
 * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
 *
 * The parameter described in this clause limits the execution of an operation to a local Context Source
 * or Context Broker (clause 5.5.13).
 */
export type QueryLocalParameter = boolean;

/**
 * When a merge operation applies to a pre-existing Attribute which previously contained an "observedAt"
 * sub-attribute, the value held in this query parameter shall be used if no specific "observedAt"
 * sub-Attribute is found in the payload body.
 */
export type QueryObservedAtParameter = string;

/**
 * Each String is an Entity member ("id", "type", "scope" or a projected Attribute name).
 * When defined, the listed Entity members are removed from each Entity within the payload.
 */
export type QueryOmitParameter = string[];

export const QueryOptionsEntitiesParameterItem = {
  ...OptionsRepresentation,
  ...OptionsSysAttrs,
} as const;
export type QueryOptionsEntitiesParameter =
  (typeof QueryOptionsEntitiesParameterItem)[keyof typeof QueryOptionsEntitiesParameterItem][];

export type QueryOptionsNoOverwriteParameter = OptionsNoOverwrite[];

export type QueryOptionsSysAttrsParameter = OptionsSysAttrs[];

export type QueryOptionsTemporalParameter = OptionsTemporal[];

export type QueryOptionsUpsertParameter = OptionsUpsert[];

/**
 * Each String is an Entity member ("id", "type", "scope" or a projected Attribute name).
 * When defined, every Entity within the payload body is reduced down to only contain
 * the listed Entity members.
 */
export type QueryPickParameter = string[];

/**
 * Query as per clause 4.9.
 */
export type QueryQParameter = string;

/**
 * Indicates to perform a download and replace of the @context, as specified in clause 5.13.5.4.
 */
export type QueryReloadParameter = boolean;

/**
 * Scope query (see clause 4.19).
 */
export type QueryScopeQParameter = string;

/**
 * It shall be a DateTime. Cardinality shall be 1 if timerel is present.
 * String representing the timeAt parameter as defined by clause 4.11.
 */
export type QueryTimeAtParameter = string;

export type QueryTimepropertyParameter =
  (typeof QueryTimepropertyParameter)[keyof typeof QueryTimepropertyParameter];

export const QueryTimepropertyParameter = {
  observedAt: "observedAt",
  createdAt: "createdAt",
  modifiedAt: "modifiedAt",
  deletedAt: "deletedAt",
} as const;

export type QueryTimerelParameter =
  (typeof QueryTimerelParameter)[keyof typeof QueryTimerelParameter];

export const QueryTimerelParameter = {
  before: "before",
  after: "after",
  between: "between",
} as const;

/**
 * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
 * implicitly set to true and shall not be explicitly set to false.
 */
export type QueryTypeParameter = string;

export type CreateEntityParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type CreateEntityBody = Entity & {
  "@context"?: LdContext;
};

export type QueryEntityParams = {
  /**
   * List of entity ids to be retrieved.
   */
  id?: QueryIdParameter;
  /**
   * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
   * implicitly set to true and shall not be explicitly set to false.
   */
  type?: QueryTypeParameter;
  /**
   * Regular expression that shall be matched by entity ids.
   */
  idPattern?: QueryIdPatternParameter;
  /**
   * List of Attributes to be matched by the Entity and included in the response. If the Entity does not
   * have any of the Attributes in attrs, then a 404 Not Found shall be retrieved. If attrs is not
   * specified, no matching is performed and all Attributes related to the Entity shall be retrieved.
   *
   * A synonym for a combination of the pick and q parameters. DEPRECATED.
   * Each String is an Attribute (Property or Relationship) name.
   */
  attrs?: QueryAttrsParameter;
  /**
   * Each String is an Entity member ("id", "type", "scope" or a projected Attribute name).
   * When defined, every Entity within the payload body is reduced down to only contain
   * the listed Entity members.
   */
  pick?: QueryPickParameter;
  /**
   * Each String is an Entity member ("id", "type", "scope" or a projected Attribute name).
   * When defined, the listed Entity members are removed from each Entity within the payload.
   */
  omit?: QueryOmitParameter;
  /**
   * Query as per clause 4.9.
   */
  q?: QueryQParameter;
  /**
   * Context Source filter as per clause 4.9.
   */
  csf?: QueryCsfParameter;
  /**
   * Geometry as per clause 4.10. It is part of geoquery. It shall be one if geometry or georel are present.
   */
  geometry?: QueryGeometryParameter;
  /**
   * Geo relationship as per clause 4.10. It is part of geoquery. It shall be one if
   * geometry or georel are present.
   */
  georel?: QueryGeorelParameter;
  /**
   * Coordinates serialized as a string as per clause 4.10. It is part of geoquery.
   * It shall be one if geometry or georel are present.
   */
  coordinates?: QueryCoordinatesParameter;
  /**
   * The name of the Property that contains the geospatial data that will be used to resolve the geoquery.
   * By default, will be location (see clause 4.7). It shall be ignored unless a geoquery is present.
   */
  geoproperty?: QueryGeopropertyParameter;
  /**
   * 4.5.16.1 Top-level "geometry" field selection algorithm.
   * A parameter of the request (named "geometryProperty") may be used to indicate the name of the GeoProperty to be selected.
   * If this parameter is not present, then the default name of "location" shall be used.
   *
   * In the case of GeoJSON Entity representation, this parameter indicates which GeoProperty to use
   * for the toplevel geometry field.
   */
  geometryProperty?: QueryGeometryPropertyParameter;
  /**
   * It is used to reduce languageMaps to a string or string array property in a single preferred language.
   */
  lang?: QueryLangParameter;
  /**
   * Scope query (see clause 4.19).
   */
  scopeQ?: QueryScopeQParameter;
  /**
   * List of entity ids which have previously been encountered whilst retrieving the
   * Entity Graph. Only applicable if joinLevel is present.
   */
  containedBy?: QueryContainedByParameter;
  /**
   * The type of Linked Entity retrieval to apply (see clause 4.5.23). Allowed values: "flat", "inline", "@none".
   */
  join?: QueryJoinParameter;
  /**
   * Depth of Linked Entity retrieval to apply. Only applicable if join parameter is present.
   */
  joinLevel?: QueryJoinLevelParameter;
  /**
   * Specifies the datasetIds of the Attribute instances to be selected for each matched Attribute as per clause 4.5.5,
   * or the datasetId of the dataset to be deleted.
   */
  datasetId?: QueryDatasetIdParameter;
  /**
   * If true, the location of the EntityMap used in the operation is returned in the response.
   */
  details?: QueryEntityMapParameter;
  /**
   * 6.3.10 Pagination behaviour. It defines the limit to the number of NGSI-LD Elements that shall be retrieved
   * at a maximum as mandated by clause 5.5.9. The value 0 is only allowed in combination with
   * the count URI parameter.
   * @minimum 0
   */
  limit?: QueryLimitParameter;
  /**
   * 6.3.13 Counting number of results. If true, then a special HTTP header (NGSILD-Results-Count) is set in
   * the response. Regardless of how many entities are actually returned (maybe due to the "limit" URI parameter),
   * the total number of matching results (e.g. number of Entities) is returned.
   */
  count?: QueryCountParameter;
  options?: QueryOptionsEntitiesParameter;
  /**
   * 6.3.7 Representation of Entities.
   *
   * When its value includes the keyword "normalized", a normalized
   * representation of Entities shall be provided as defined by clause 4.5.1, with Attributes returned
   * in the normalized representation as defined in clauses 4.5.2.2, 4.5.3.2 and 4.5.18.2.
   *
   * When its value includes the keyword "concise", a concise lossless representation of Entities shall
   * be provided as defined by clause 4.5.1. with Attributes returned in the concise representation as
   * defined in clauses 4.5.2.3, 4.5.3.3 and 4.5.18.3. In this case the broker will return data in the
   * most concise lossless representation possible, for example removing all Attribute "type" members.
   *
   * When its value includes the keyword "keyValues" (or "simplified" as a synonym), a simplified
   * representation of Entities shall be provided as defined by clause 4.5.4.
   *
   * If the Accept Header is set to "application/geo+json" the response will be in simplified GeoJSON
   * format as defined by clause 4.5.17.
   */
  format?: QueryFormatEntitiesParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};
export type RetrieveEntityParams = {
  /**
   * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
   * implicitly set to true and shall not be explicitly set to false.
   */
  type?: QueryTypeParameter;
  /**
   * List of Attributes to be matched by the Entity and included in the response. If the Entity does not
   * have any of the Attributes in attrs, then a 404 Not Found shall be retrieved. If attrs is not
   * specified, no matching is performed and all Attributes related to the Entity shall be retrieved.
   *
   * A synonym for a combination of the pick and q parameters. DEPRECATED.
   * Each String is an Attribute (Property or Relationship) name.
   */
  attrs?: QueryAttrsParameter;
  /**
   * Each String is an Entity member ("id", "type", "scope" or a projected Attribute name).
   * When defined, every Entity within the payload body is reduced down to only contain
   * the listed Entity members.
   */
  pick?: QueryPickParameter;
  /**
   * Each String is an Entity member ("id", "type", "scope" or a projected Attribute name).
   * When defined, the listed Entity members are removed from each Entity within the payload.
   */
  omit?: QueryOmitParameter;
  /**
   * 4.5.16.1 Top-level "geometry" field selection algorithm.
   * A parameter of the request (named "geometryProperty") may be used to indicate the name of the GeoProperty to be selected.
   * If this parameter is not present, then the default name of "location" shall be used.
   *
   * In the case of GeoJSON Entity representation, this parameter indicates which GeoProperty to use
   * for the toplevel geometry field.
   */
  geometryProperty?: QueryGeometryPropertyParameter;
  /**
   * It is used to reduce languageMaps to a string or string array property in a single preferred language.
   */
  lang?: QueryLangParameter;
  /**
   * List of entity ids which have previously been encountered whilst retrieving the
   * Entity Graph. Only applicable if joinLevel is present.
   */
  containedBy?: QueryContainedByParameter;
  /**
   * The type of Linked Entity retrieval to apply (see clause 4.5.23). Allowed values: "flat", "inline", "@none".
   */
  join?: QueryJoinParameter;
  /**
   * Depth of Linked Entity retrieval to apply. Only applicable if join parameter is present.
   */
  joinLevel?: QueryJoinLevelParameter;
  /**
   * Specifies the datasetIds of the Attribute instances to be selected for each matched Attribute as per clause 4.5.5,
   * or the datasetId of the dataset to be deleted.
   */
  datasetId?: QueryDatasetIdParameter;
  /**
   * If true, the location of the EntityMap used in the operation is returned in the response.
   */
  details?: QueryEntityMapParameter;
  options?: QueryOptionsEntitiesParameter;
  /**
   * 6.3.7 Representation of Entities.
   *
   * When its value includes the keyword "normalized", a normalized
   * representation of Entities shall be provided as defined by clause 4.5.1, with Attributes returned
   * in the normalized representation as defined in clauses 4.5.2.2, 4.5.3.2 and 4.5.18.2.
   *
   * When its value includes the keyword "concise", a concise lossless representation of Entities shall
   * be provided as defined by clause 4.5.1. with Attributes returned in the concise representation as
   * defined in clauses 4.5.2.3, 4.5.3.3 and 4.5.18.3. In this case the broker will return data in the
   * most concise lossless representation possible, for example removing all Attribute "type" members.
   *
   * When its value includes the keyword "keyValues" (or "simplified" as a synonym), a simplified
   * representation of Entities shall be provided as defined by clause 4.5.4.
   *
   * If the Accept Header is set to "application/geo+json" the response will be in simplified GeoJSON
   * format as defined by clause 4.5.17.
   */
  format?: QueryFormatEntitiesParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type RetrieveEntity200 = Entity & {
  "@context"?: LdContext;
};

export type DeleteEntityParams = {
  /**
   * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
   * implicitly set to true and shall not be explicitly set to false.
   */
  type?: QueryTypeParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type MergeEntityParams = {
  options?: OptionsRepresentation[];
  /**
   * 6.3.7 Representation of Entities.
   *
   * When its value includes the keyword "normalized", a normalized
   * representation of Entities shall be provided as defined by clause 4.5.1, with Attributes returned
   * in the normalized representation as defined in clauses 4.5.2.2, 4.5.3.2 and 4.5.18.2.
   *
   * When its value includes the keyword "concise", a concise lossless representation of Entities shall
   * be provided as defined by clause 4.5.1. with Attributes returned in the concise representation as
   * defined in clauses 4.5.2.3, 4.5.3.3 and 4.5.18.3. In this case the broker will return data in the
   * most concise lossless representation possible, for example removing all Attribute "type" members.
   *
   * When its value includes the keyword "keyValues" (or "simplified" as a synonym), a simplified
   * representation of Entities shall be provided as defined by clause 4.5.4.
   *
   * If the Accept Header is set to "application/geo+json" the response will be in simplified GeoJSON
   * format as defined by clause 4.5.17.
   */
  format?: QueryFormatEntitiesParameter;
  /**
   * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
   * implicitly set to true and shall not be explicitly set to false.
   */
  type?: QueryTypeParameter;
  /**
   * When a merge operation applies to a pre-existing Attribute which previously contained an "observedAt"
   * sub-attribute, the value held in this query parameter shall be used if no specific "observedAt"
   * sub-Attribute is found in the payload body.
   */
  observedAt?: QueryObservedAtParameter;
  /**
   * It is used to reduce languageMaps to a string or string array property in a single preferred language.
   */
  lang?: QueryLangParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type MergeEntityBody = Entity & {
  "@context"?: LdContext;
};

export type ReplaceEntityParams = {
  /**
   * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
   * implicitly set to true and shall not be explicitly set to false.
   */
  type?: QueryTypeParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type ReplaceEntityBody = Entity & {
  "@context"?: LdContext;
};

export type AppendAttrsParams = {
  /**
   * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
   * implicitly set to true and shall not be explicitly set to false.
   */
  type?: QueryTypeParameter;
  options?: QueryOptionsNoOverwriteParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type AppendAttrsBody = Entity & {
  "@context"?: LdContext;
};

export type UpdateEntityParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
  /**
   * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
   * implicitly set to true and shall not be explicitly set to false.
   */
  type?: QueryTypeParameter;
};

export type UpdateEntityBody = Entity & {
  "@context"?: LdContext;
};

export type UpdateAttrsParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
  /**
   * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
   * implicitly set to true and shall not be explicitly set to false.
   */
  type?: QueryTypeParameter;
};

export type DeleteAttrsParams = {
  /**
   * If true, all attribute instances are deleted. Otherwise (default) only the Attribute instance specified
   * by the datasetId is deleted. In case neither the deleteAll flag nor a datasetId is present,
   * the default Attribute instance is deleted.
   */
  deleteAll?: QueryDeleteAllParameter;
  /**
   * Specifies the datasetIds of the Attribute instances to be selected for each matched Attribute as per clause 4.5.5,
   * or the datasetId of the dataset to be deleted.
   */
  datasetId?: QueryDatasetIdParameter;
  /**
   * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
   * implicitly set to true and shall not be explicitly set to false.
   */
  type?: QueryTypeParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type ReplaceAttrsParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
  /**
   * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
   * implicitly set to true and shall not be explicitly set to false.
   */
  type?: QueryTypeParameter;
};

export type CreateCSRBody = CsourceRegistration & {
  "@context"?: LdContext;
};

export type QueryCSRParams = {
  /**
   * List of entity ids to be retrieved.
   */
  id?: QueryIdParameter;
  /**
   * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
   * implicitly set to true and shall not be explicitly set to false.
   */
  type?: QueryTypeParameter;
  /**
   * Regular expression that shall be matched by entity ids.
   */
  idPattern?: QueryIdPatternParameter;
  /**
   * List of Attributes to be matched by the Entity and included in the response. If the Entity does not
   * have any of the Attributes in attrs, then a 404 Not Found shall be retrieved. If attrs is not
   * specified, no matching is performed and all Attributes related to the Entity shall be retrieved.
   *
   * A synonym for a combination of the pick and q parameters. DEPRECATED.
   * Each String is an Attribute (Property or Relationship) name.
   */
  attrs?: QueryAttrsParameter;
  /**
   * Query as per clause 4.9.
   */
  q?: QueryQParameter;
  /**
   * Context Source filter as per clause 4.9.
   */
  csf?: QueryCsfParameter;
  /**
   * Geometry as per clause 4.10. It is part of geoquery. It shall be one if geometry or georel are present.
   */
  geometry?: QueryGeometryParameter;
  /**
   * Geo relationship as per clause 4.10. It is part of geoquery. It shall be one if
   * geometry or georel are present.
   */
  georel?: QueryGeorelParameter;
  /**
   * Coordinates serialized as a string as per clause 4.10. It is part of geoquery.
   * It shall be one if geometry or georel are present.
   */
  coordinates?: QueryCoordinatesParameter;
  /**
   * The name of the Property that contains the geospatial data that will be used to resolve the geoquery.
   * By default, will be location (see clause 4.7). It shall be ignored unless a geoquery is present.
   */
  geoproperty?: QueryGeopropertyParameter;
  /**
   * Allowed values: "observedAt", "createdAt", "modifiedAt" and "deletedAt".
   * If not specified, the default is "observedAt". (See clause 4.8)
   */
  timeproperty?: QueryTimepropertyParameter;
  /**
   * Allowed values: "before", "after", "between"
   */
  timerel?: QueryTimerelParameter;
  /**
   * It shall be a DateTime. Cardinality shall be 1 if timerel is present.
   * String representing the timeAt parameter as defined by clause 4.11.
   */
  timeAt?: QueryTimeAtParameter;
  /**
   * It shall be a DateTime. Cardinality shall be 1 if timerel is equal to "between".
   * String representing the endTimeAt parameter as defined by clause 4.11.
   */
  endTimeAt?: QueryEndTimeAtParameter;
  /**
   * 4.5.16.1 Top-level "geometry" field selection algorithm.
   * A parameter of the request (named "geometryProperty") may be used to indicate the name of the GeoProperty to be selected.
   * If this parameter is not present, then the default name of "location" shall be used.
   *
   * In the case of GeoJSON Entity representation, this parameter indicates which GeoProperty to use
   * for the toplevel geometry field.
   */
  geometryProperty?: QueryGeometryPropertyParameter;
  /**
   * It is used to reduce languageMaps to a string or string array property in a single preferred language.
   */
  lang?: QueryLangParameter;
  /**
   * Scope query (see clause 4.19).
   */
  scopeQ?: QueryScopeQParameter;
  options?: QueryOptionsSysAttrsParameter;
  /**
   * 6.3.10 Pagination behaviour. It defines the limit to the number of NGSI-LD Elements that shall be retrieved
   * at a maximum as mandated by clause 5.5.9. The value 0 is only allowed in combination with
   * the count URI parameter.
   * @minimum 0
   */
  limit?: QueryLimitParameter;
  /**
   * 6.3.13 Counting number of results. If true, then a special HTTP header (NGSILD-Results-Count) is set in
   * the response. Regardless of how many entities are actually returned (maybe due to the "limit" URI parameter),
   * the total number of matching results (e.g. number of Entities) is returned.
   */
  count?: QueryCountParameter;
};
export type RetrieveCSRParams = {
  options?: QueryOptionsSysAttrsParameter;
};

export type RetrieveCSR200 = CsourceRegistration & {
  "@context"?: LdContext;
};

export type UpdateCSRBody = CsourceRegistration & {
  "@context"?: LdContext;
};

export type CreateSubscriptionParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type QuerySubscriptionParams = {
  options?: QueryOptionsSysAttrsParameter;
  /**
   * 6.3.10 Pagination behaviour. It defines the limit to the number of NGSI-LD Elements that shall be retrieved
   * at a maximum as mandated by clause 5.5.9. The value 0 is only allowed in combination with
   * the count URI parameter.
   * @minimum 0
   */
  limit?: QueryLimitParameter;
  /**
   * 6.3.13 Counting number of results. If true, then a special HTTP header (NGSILD-Results-Count) is set in
   * the response. Regardless of how many entities are actually returned (maybe due to the "limit" URI parameter),
   * the total number of matching results (e.g. number of Entities) is returned.
   */
  count?: QueryCountParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};
export type RetrieveSubscriptionParams = {
  options?: QueryOptionsSysAttrsParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type RetrieveSubscription200 = Subscription & {
  "@context"?: LdContext;
};

export type UpdateSubscriptionParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type DeleteSubscriptionParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type QueryCSRSubscriptionParams = {
  options?: QueryOptionsSysAttrsParameter;
  /**
   * 6.3.10 Pagination behaviour. It defines the limit to the number of NGSI-LD Elements that shall be retrieved
   * at a maximum as mandated by clause 5.5.9. The value 0 is only allowed in combination with
   * the count URI parameter.
   * @minimum 0
   */
  limit?: QueryLimitParameter;
  /**
   * 6.3.13 Counting number of results. If true, then a special HTTP header (NGSILD-Results-Count) is set in
   * the response. Regardless of how many entities are actually returned (maybe due to the "limit" URI parameter),
   * the total number of matching results (e.g. number of Entities) is returned.
   */
  count?: QueryCountParameter;
};
export type RetrieveCSRSubscriptionParams = {
  options?: QueryOptionsSysAttrsParameter;
};

export type RetrieveCSRSubscription200 = Subscription & {
  "@context"?: LdContext;
};

export type CreateBatchParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type CreateBatchBodyItem = Entity & {
  "@context"?: LdContext;
};

export type UpsertBatchParams = {
  options?: QueryOptionsUpsertParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type UpsertBatchBodyItem = Entity & {
  "@context"?: LdContext;
};

export type UpdateBatchParams = {
  options?: QueryOptionsNoOverwriteParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type UpdateBatchBodyItem = Entity & {
  "@context"?: LdContext;
};

export type DeleteBatchParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type QueryBatchParams = {
  /**
   * 6.3.13 Counting number of results. If true, then a special HTTP header (NGSILD-Results-Count) is set in
   * the response. Regardless of how many entities are actually returned (maybe due to the "limit" URI parameter),
   * the total number of matching results (e.g. number of Entities) is returned.
   */
  count?: QueryCountParameter;
  /**
   * 6.3.10 Pagination behaviour. It defines the limit to the number of NGSI-LD Elements that shall be retrieved
   * at a maximum as mandated by clause 5.5.9. The value 0 is only allowed in combination with
   * the count URI parameter.
   * @minimum 0
   */
  limit?: QueryLimitParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
  options?: (typeof QueryBatchOptionsItem)[keyof typeof QueryBatchOptionsItem][];
};

export const QueryBatchOptionsItem = {
  ...OptionsRepresentation,
  ...OptionsSysAttrs,
} as const;
export type MergeBatchParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type MergeBatchBodyItem = Entity & {
  "@context"?: LdContext;
};

export type UpsertTemporalParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type QueryTemporalParams = {
  /**
   * List of entity ids to be retrieved.
   */
  id?: QueryIdParameter;
  /**
   * Selection of Entity Types as per clause 4.17. "*" is also allowed as a value and local is
   * implicitly set to true and shall not be explicitly set to false.
   */
  type?: QueryTypeParameter;
  /**
   * Regular expression that shall be matched by entity ids.
   */
  idPattern?: QueryIdPatternParameter;
  /**
   * List of Attributes to be matched by the Entity and included in the response. If the Entity does not
   * have any of the Attributes in attrs, then a 404 Not Found shall be retrieved. If attrs is not
   * specified, no matching is performed and all Attributes related to the Entity shall be retrieved.
   *
   * A synonym for a combination of the pick and q parameters. DEPRECATED.
   * Each String is an Attribute (Property or Relationship) name.
   */
  attrs?: QueryAttrsParameter;
  /**
   * Each String is an Entity member ("id", "type", "scope" or a projected Attribute name).
   * When defined, every Entity within the payload body is reduced down to only contain
   * the listed Entity members.
   */
  pick?: QueryPickParameter;
  /**
   * Each String is an Entity member ("id", "type", "scope" or a projected Attribute name).
   * When defined, the listed Entity members are removed from each Entity within the payload.
   */
  omit?: QueryOmitParameter;
  /**
   * Query as per clause 4.9.
   */
  q?: QueryQParameter;
  /**
   * Context Source filter as per clause 4.9.
   */
  csf?: QueryCsfParameter;
  /**
   * Geometry as per clause 4.10. It is part of geoquery. It shall be one if geometry or georel are present.
   */
  geometry?: QueryGeometryParameter;
  /**
   * Geo relationship as per clause 4.10. It is part of geoquery. It shall be one if
   * geometry or georel are present.
   */
  georel?: QueryGeorelParameter;
  /**
   * Coordinates serialized as a string as per clause 4.10. It is part of geoquery.
   * It shall be one if geometry or georel are present.
   */
  coordinates?: QueryCoordinatesParameter;
  /**
   * The name of the Property that contains the geospatial data that will be used to resolve the geoquery.
   * By default, will be location (see clause 4.7). It shall be ignored unless a geoquery is present.
   */
  geoproperty?: QueryGeopropertyParameter;
  /**
   * Allowed values: "observedAt", "createdAt", "modifiedAt" and "deletedAt".
   * If not specified, the default is "observedAt". (See clause 4.8)
   */
  timeproperty?: QueryTimepropertyParameter;
  /**
   * Allowed values: "before", "after", "between"
   */
  timerel?: QueryTimerelParameter;
  /**
   * It shall be a DateTime. Cardinality shall be 1 if timerel is present.
   * String representing the timeAt parameter as defined by clause 4.11.
   */
  timeAt?: QueryTimeAtParameter;
  /**
   * It shall be a DateTime. Cardinality shall be 1 if timerel is equal to "between".
   * String representing the endTimeAt parameter as defined by clause 4.11.
   */
  endTimeAt?: QueryEndTimeAtParameter;
  /**
   * Only the last n instances, per Attribute, per Entity (under the specified time interval) shall be retrieved.
   * @minimum 1
   */
  lastN?: QueryLastNParameter;
  /**
   * It is used to reduce languageMaps to a string or string array property in a single preferred language.
   */
  lang?: QueryLangParameter;
  /**
   * 4.5.19.1 Aggregated Temporal Representation of an Entity.
   *
   * Comma separated list of aggregation methods.
   *
   * Only applicable if aggregatedValues is present in the options parameter.
   */
  aggrMethods?: QueryAggrMethodsParameter;
  /**
   * If not specified, it defaults to a duration of 0 seconds and is interpreted as a duration spanning
   * the whole time range specified by the temporal query.
   *
   * Only applicable if aggregatedValues is present in the options parameter.
   */
  aggrPeriodDuration?: QueryAggrPeriodDurationParameter;
  /**
   * Scope query (see clause 4.19).
   */
  scopeQ?: QueryScopeQParameter;
  /**
   * Specifies the datasetIds of the Attribute instances to be selected for each matched Attribute as per clause 4.5.5,
   * or the datasetId of the dataset to be deleted.
   */
  datasetId?: QueryDatasetIdParameter;
  /**
   * 6.3.10 Pagination behaviour. It defines the limit to the number of NGSI-LD Elements that shall be retrieved
   * at a maximum as mandated by clause 5.5.9. The value 0 is only allowed in combination with
   * the count URI parameter.
   * @minimum 0
   */
  limit?: QueryLimitParameter;
  /**
   * 6.3.13 Counting number of results. If true, then a special HTTP header (NGSILD-Results-Count) is set in
   * the response. Regardless of how many entities are actually returned (maybe due to the "limit" URI parameter),
   * the total number of matching results (e.g. number of Entities) is returned.
   */
  count?: QueryCountParameter;
  options?: QueryOptionsTemporalParameter | QueryOptionsSysAttrsParameter;
  /**
   * 6.3.12 Simplified or aggregated temporal representation of entities.
   *
   * When its value includes the keyword "temporalValues", a simplified temporal representation of
   * entities shall be provided as defined by clause 4.5.8.
   *
   * When its value includes the keyword "aggregatedValues", an aggregated temporal representation of
   * entities shall be provided as defined by clause 4.5.19.
   *
   * Only one of the two keywords can be present in the values of the parameter.
   */
  format?: QueryFormatTemporalParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};
export type RetrieveTemporalParams = {
  /**
   * List of Attributes to be matched by the Entity and included in the response. If the Entity does not
   * have any of the Attributes in attrs, then a 404 Not Found shall be retrieved. If attrs is not
   * specified, no matching is performed and all Attributes related to the Entity shall be retrieved.
   *
   * A synonym for a combination of the pick and q parameters. DEPRECATED.
   * Each String is an Attribute (Property or Relationship) name.
   */
  attrs?: QueryAttrsParameter;
  /**
   * Each String is an Entity member ("id", "type", "scope" or a projected Attribute name).
   * When defined, every Entity within the payload body is reduced down to only contain
   * the listed Entity members.
   */
  pick?: QueryPickParameter;
  /**
   * Each String is an Entity member ("id", "type", "scope" or a projected Attribute name).
   * When defined, the listed Entity members are removed from each Entity within the payload.
   */
  omit?: QueryOmitParameter;
  /**
   * Allowed values: "observedAt", "createdAt", "modifiedAt" and "deletedAt".
   * If not specified, the default is "observedAt". (See clause 4.8)
   */
  timeproperty?: QueryTimepropertyParameter;
  /**
   * Allowed values: "before", "after", "between"
   */
  timerel?: QueryTimerelParameter;
  /**
   * It shall be a DateTime. Cardinality shall be 1 if timerel is present.
   * String representing the timeAt parameter as defined by clause 4.11.
   */
  timeAt?: QueryTimeAtParameter;
  /**
   * It shall be a DateTime. Cardinality shall be 1 if timerel is equal to "between".
   * String representing the endTimeAt parameter as defined by clause 4.11.
   */
  endTimeAt?: QueryEndTimeAtParameter;
  /**
   * Only the last n instances, per Attribute, per Entity (under the specified time interval) shall be retrieved.
   * @minimum 1
   */
  lastN?: QueryLastNParameter;
  /**
   * It is used to reduce languageMaps to a string or string array property in a single preferred language.
   */
  lang?: QueryLangParameter;
  /**
   * 4.5.19.1 Aggregated Temporal Representation of an Entity.
   *
   * Comma separated list of aggregation methods.
   *
   * Only applicable if aggregatedValues is present in the options parameter.
   */
  aggrMethods?: QueryAggrMethodsParameter;
  /**
   * If not specified, it defaults to a duration of 0 seconds and is interpreted as a duration spanning
   * the whole time range specified by the temporal query.
   *
   * Only applicable if aggregatedValues is present in the options parameter.
   */
  aggrPeriodDuration?: QueryAggrPeriodDurationParameter;
  /**
   * Specifies the datasetIds of the Attribute instances to be selected for each matched Attribute as per clause 4.5.5,
   * or the datasetId of the dataset to be deleted.
   */
  datasetId?: QueryDatasetIdParameter;
  options?: QueryOptionsTemporalParameter | QueryOptionsSysAttrsParameter;
  /**
   * 6.3.12 Simplified or aggregated temporal representation of entities.
   *
   * When its value includes the keyword "temporalValues", a simplified temporal representation of
   * entities shall be provided as defined by clause 4.5.8.
   *
   * When its value includes the keyword "aggregatedValues", an aggregated temporal representation of
   * entities shall be provided as defined by clause 4.5.19.
   *
   * Only one of the two keywords can be present in the values of the parameter.
   */
  format?: QueryFormatTemporalParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type RetrieveTemporal200 = EntityTemporal & {
  "@context"?: LdContext;
};

export type DeleteTemporalParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type AppendAttrsTemporalParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type DeleteAttrsTemporalParams = {
  /**
   * If true, all attribute instances are deleted. Otherwise (default) only the Attribute instance specified
   * by the datasetId is deleted. In case neither the deleteAll flag nor a datasetId is present,
   * the default Attribute instance is deleted.
   */
  deleteAll?: QueryDeleteAllParameter;
  /**
   * Specifies the datasetIds of the Attribute instances to be selected for each matched Attribute as per clause 4.5.5,
   * or the datasetId of the dataset to be deleted.
   */
  datasetId?: QueryDatasetIdParameter;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type UpdateAttrsTemporalParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type DeleteAttrInstanceTemporalParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type TemporalQueryBatchParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};
export type RetrieveEntityTypesParams = {
  /**
   * If true, then detailed entity type information represented as an array with
   * elements of the Entity Type data structure (clause 5.2.25) is to be returned.
   */
  details?: boolean;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
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
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type RetrieveEntityTypeInfo200 = EntityTypeInfo & {
  "@context": LdContext;
};

export type RetrieveAttrTypesParams = {
  /**
   * If true, then detailed attribute information represented as an array
   * with elements of the Attribute data structure (clause 5.2.28) is to be returned.
   */
  details?: boolean;
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type RetrieveAttrTypes200 =
  | (AttributeList & {
      "@context": LdContext;
    })
  | (Attribute & {
      "@context": LdContext;
    })[];

export type RetrieveAttrTypeInfoParams = {
  /**
   * 6.3.18 Limiting Distributed Operations. If local=true then no Context Source Registrations shall be
   * considered as matching to avoid cascading distributed operations (see clause 4.3.6.4).
   *
   * The parameter described in this clause limits the execution of an operation to a local Context Source
   * or Context Broker (clause 5.5.13).
   */
  local?: QueryLocalParameter;
};

export type RetrieveAttrTypeInfo200 = Attribute & {
  "@context": LdContext;
};

export type CreateContextBody = {
  "@context": LdContext;
};

export type ListContextsParams = {
  /**
   * Whether a list of URLs or a more detailed list of JSON Objects is requested.
   */
  details?: QueryDetailsParameter;
  /**
   * Can be either "Cached", "Hosted", or "ImplicitlyCreated".
   */
  kind?: QueryKindParameter;
};

export type RetrieveContextParams = {
  /**
   * Whether a list of URLs or a more detailed list of JSON Objects is requested.
   */
  details?: QueryDetailsParameter;
};

export type RetrieveContext200 =
  | {
      "@context"?: LdContext;
    }
  | LdContextMetadata;

export type DeleteContextParams = {
  /**
   * Indicates to perform a download and replace of the @context, as specified in clause 5.13.5.4.
   */
  reload?: QueryReloadParameter;
};

export type RetrieveEntityMap200 = EntityMap & {
  "@context"?: LdContext;
};

export type UpdateEntityMapBody = EntityMap & {
  "@context"?: LdContext;
};

export type RetrieveCSIdentityInfo200 = ContextSourceIdentity & {
  "@context"?: LdContext;
};

/**
 * NGSI-LD attribute types valid in normalized non-temporal
 * representations (Entity, FeatureProperties, and attribute types).
 * Each dynamic key maps to exactly one attribute instance.
 *
 * Derived from the oneOf in the OpenAPI spec's additionalProperties.
 */
export type NgsildAttribute =
  | Property
  | GeoProperty
  | LanguageProperty
  | VocabProperty
  | JsonProperty
  | ListProperty
  | Relationship
  | ListRelationship;

/**
 * NGSI-LD attribute types valid in normalized temporal representations
 * (EntityTemporal).  Temporal entities have arrays of attribute instances
 * keyed by observedAt.
 */
export type NgsildAttributeTemporal = NgsildAttribute | NgsildAttribute[];
// ─── Generated runtime constants for fetcher.ts ──────────────────────────────
// Derived from the preprocessed NGSI-LD OpenAPI spec.
// Do not edit manually — regenerate with `pnpm run generate:api`.

/** Every property name defined on NGSI-LD structural schemas (Entity,
 *  EntityTemporal, FeatureProperties, and all attribute types).  Keys
 *  not in this set are dynamic NGSI-LD attributes. */
export const STRUCTURAL_KEYS = new Set([
  "@context",
  "bbox",
  "coordinates",
  "createdAt",
  "datasetId",
  "deletedAt",
  "entity",
  "entityList",
  "features",
  "geometry",
  "id",
  "instanceId",
  "json",
  "languageMap",
  "location",
  "modifiedAt",
  "object",
  "objectList",
  "objectType",
  "observationSpace",
  "observedAt",
  "operationSpace",
  "previousJson",
  "previousLanguageMap",
  "previousObject",
  "previousObjectList",
  "previousValue",
  "previousValueList",
  "previousVocab",
  "scope",
  "type",
  "unitCode",
  "value",
  "valueList",
  "vocab",
]);

/** NGSI-LD attribute "type" discriminator values. */
export const NGSILD_ATTR_TYPES = new Set([
  "GeoProperty",
  "JsonProperty",
  "LanguageProperty",
  "ListProperty",
  "ListRelationship",
  "Property",
  "Relationship",
  "VocabProperty",
]);

/** GeoJSON "type" discriminator values (RFC 7946). */
export const GEOJSON_TYPES = new Set([
  "Feature",
  "FeatureCollection",
  "GeometryCollection",
  "LineString",
  "MultiLineString",
  "MultiPoint",
  "MultiPolygon",
  "Point",
  "Polygon",
]);
