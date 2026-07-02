import type {
  BadRequestResponse,
  Attribute,
  ConflictResponse,
  ContextSourceIdentity,
  CsourceRegistration,
  Entity,
  EntityMap,
  EntityTemporal,
  EntityTypeInfo,
  Feature,
  FeatureCollection,
  GatewayTimeoutResponse,
  JsonLdContext,
  LdContextMetadata,
  MaybeContext,
  MultiStatusBatchOperationResultResponse,
  MultiStatusUpdateResultResponse,
  NotFoundResponse,
  NotImplementedResponse,
  RetrieveAttrTypes200,
  RetrieveContext200,
  RetrieveEntityTypes200,
  Subscription,
  UnprocessableResponse,
  WithContext,
} from "./schemas";
// https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir/49579497#49579497
export type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

export type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >;
}[keyof T];

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
export type DistributeReadOnlyOverUnions<T> = T extends any
  ? NonReadonly<T>
  : never;

export type Writable<T> = Pick<T, WritableKeys<T>>;
export type NonReadonly<T> = [T] extends [UnionToIntersection<T>]
  ? {
      [P in keyof Writable<T>]: T[P] extends object
        ? NonReadonly<NonNullable<T[P]>>
        : T[P];
    }
  : DistributeReadOnlyOverUnions<T>;

// Makes the given keys required in a type (useful when the OpenAPI spec
// layers `required` via allOf, which orval doesn't propagate).
export type PickRequired<Type, Key extends keyof Type> = Type &
  Required<Pick<Type, Key>>;

export type CreateEntityResponse201 = {
  data: void;
  status: 201;
  /** URI of the created entity from the Location header. */
  location: string;
};

export type CreateEntityResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type CreateEntityResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type CreateEntityResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type CreateEntityResponse422 = {
  data: UnprocessableResponse;
  status: 422;
};

export type CreateEntityResponseSuccess =
  CreateEntityResponse201 | CreateEntityResponse207;
export type CreateEntityResponseError =
  CreateEntityResponse400 | CreateEntityResponse409 | CreateEntityResponse422;

export type CreateEntityResponse =
  CreateEntityResponseSuccess | CreateEntityResponseError;
export type QueryEntityResponse200 = {
  data: (Entity & JsonLdContext)[];
  status: 200;
};

export type QueryEntityResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type QueryEntityResponse501 = {
  data: NotImplementedResponse;
  status: 501;
};

export type QueryEntityResponseSuccess = QueryEntityResponse200;
export type QueryEntityResponseError =
  QueryEntityResponse400 | QueryEntityResponse501;

export type QueryEntityResponse =
  QueryEntityResponseSuccess | QueryEntityResponseError;
export type RetrieveEntityResponse200 = {
  data: MaybeContext<Entity>;
  status: 200;
};

export type RetrieveEntityResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type RetrieveEntityResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type RetrieveEntityResponse501 = {
  data: NotImplementedResponse;
  status: 501;
};

export type RetrieveEntityResponseSuccess = RetrieveEntityResponse200;
export type RetrieveEntityResponseError =
  | RetrieveEntityResponse400
  | RetrieveEntityResponse404
  | RetrieveEntityResponse501;

export type RetrieveEntityResponse =
  RetrieveEntityResponseSuccess | RetrieveEntityResponseError;

// Narrowed types for GeoJSON content negotiation.
// When a consumer explicitly requests application/geo+json, the response
// data is a GeoJSON Feature (single) or FeatureCollection (query).
export type RetrieveGeoEntityResponse200 = {
  data: Feature;
  status: 200;
};

export type RetrieveGeoEntityResponseSuccess = RetrieveGeoEntityResponse200;
export type RetrieveGeoEntityResponseError =
  | RetrieveEntityResponse400
  | RetrieveEntityResponse404
  | RetrieveEntityResponse501;

export type RetrieveGeoEntityResponse =
  RetrieveGeoEntityResponseSuccess | RetrieveGeoEntityResponseError;

export type QueryGeoEntityResponse200 = {
  data: FeatureCollection;
  status: 200;
};

export type QueryGeoEntityResponseSuccess = QueryGeoEntityResponse200;
export type QueryGeoEntityResponseError = QueryEntityResponseError;

export type QueryGeoEntityResponse =
  QueryGeoEntityResponseSuccess | QueryGeoEntityResponseError;

export type QueryGeoBatchResponse200 = {
  data: FeatureCollection;
  status: 200;
};

export type QueryGeoBatchResponseSuccess = QueryGeoBatchResponse200;
export type QueryGeoBatchResponseError = QueryBatchResponseError;

export type QueryGeoBatchResponse =
  QueryGeoBatchResponseSuccess | QueryGeoBatchResponseError;

export type DeleteEntityResponse204 = {
  data: void;
  status: 204;
};

export type DeleteEntityResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type DeleteEntityResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type DeleteEntityResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type DeleteEntityResponseSuccess =
  DeleteEntityResponse204 | DeleteEntityResponse207;
export type DeleteEntityResponseError =
  DeleteEntityResponse400 | DeleteEntityResponse404;

export type DeleteEntityResponse =
  DeleteEntityResponseSuccess | DeleteEntityResponseError;
export type MergeEntityResponse204 = {
  data: void;
  status: 204;
};

export type MergeEntityResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type MergeEntityResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type MergeEntityResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type MergeEntityResponseSuccess =
  MergeEntityResponse204 | MergeEntityResponse207;
export type MergeEntityResponseError =
  MergeEntityResponse400 | MergeEntityResponse404;

export type MergeEntityResponse =
  MergeEntityResponseSuccess | MergeEntityResponseError;
export type ReplaceEntityResponse204 = {
  data: void;
  status: 204;
};

export type ReplaceEntityResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type ReplaceEntityResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type ReplaceEntityResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type ReplaceEntityResponseSuccess =
  ReplaceEntityResponse204 | ReplaceEntityResponse207;
export type ReplaceEntityResponseError =
  ReplaceEntityResponse400 | ReplaceEntityResponse404;

export type ReplaceEntityResponse =
  ReplaceEntityResponseSuccess | ReplaceEntityResponseError;
export type AppendAttrsResponse204 = {
  data: void;
  status: 204;
};

export type AppendAttrsResponse207 = {
  data: MultiStatusUpdateResultResponse;
  status: 207;
};

export type AppendAttrsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type AppendAttrsResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type AppendAttrsResponseSuccess =
  AppendAttrsResponse204 | AppendAttrsResponse207;
export type AppendAttrsResponseError =
  AppendAttrsResponse400 | AppendAttrsResponse404;

export type AppendAttrsResponse =
  AppendAttrsResponseSuccess | AppendAttrsResponseError;
export type UpdateEntityResponse204 = {
  data: void;
  status: 204;
};

export type UpdateEntityResponse207 = {
  data: MultiStatusUpdateResultResponse;
  status: 207;
};

export type UpdateEntityResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type UpdateEntityResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type UpdateEntityResponseSuccess =
  UpdateEntityResponse204 | UpdateEntityResponse207;
export type UpdateEntityResponseError =
  UpdateEntityResponse400 | UpdateEntityResponse404;

export type UpdateEntityResponse =
  UpdateEntityResponseSuccess | UpdateEntityResponseError;
export type UpdateAttrsResponse204 = {
  data: void;
  status: 204;
};

export type UpdateAttrsResponse207 = {
  data: MultiStatusUpdateResultResponse;
  status: 207;
};

export type UpdateAttrsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type UpdateAttrsResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type UpdateAttrsResponseSuccess =
  UpdateAttrsResponse204 | UpdateAttrsResponse207;
export type UpdateAttrsResponseError =
  UpdateAttrsResponse400 | UpdateAttrsResponse404;

export type UpdateAttrsResponse =
  UpdateAttrsResponseSuccess | UpdateAttrsResponseError;
export type DeleteAttrsResponse204 = {
  data: void;
  status: 204;
};

export type DeleteAttrsResponse207 = {
  data: MultiStatusUpdateResultResponse;
  status: 207;
};

export type DeleteAttrsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type DeleteAttrsResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type DeleteAttrsResponseSuccess =
  DeleteAttrsResponse204 | DeleteAttrsResponse207;
export type DeleteAttrsResponseError =
  DeleteAttrsResponse400 | DeleteAttrsResponse404;

export type DeleteAttrsResponse =
  DeleteAttrsResponseSuccess | DeleteAttrsResponseError;
export type ReplaceAttrsResponse204 = {
  data: void;
  status: 204;
};

export type ReplaceAttrsResponse207 = {
  data: MultiStatusUpdateResultResponse;
  status: 207;
};

export type ReplaceAttrsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type ReplaceAttrsResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type ReplaceAttrsResponseSuccess =
  ReplaceAttrsResponse204 | ReplaceAttrsResponse207;
export type ReplaceAttrsResponseError =
  ReplaceAttrsResponse400 | ReplaceAttrsResponse404;

export type ReplaceAttrsResponse =
  ReplaceAttrsResponseSuccess | ReplaceAttrsResponseError;
export type CreateCSRResponse201 = {
  data: void;
  status: 201;
  /** URI of the created CSR from the Location header. */
  location: string;
};

export type CreateCSRResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type CreateCSRResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type CreateCSRResponse422 = {
  data: UnprocessableResponse;
  status: 422;
};

export type CreateCSRResponseSuccess = CreateCSRResponse201;
export type CreateCSRResponseError =
  CreateCSRResponse400 | CreateCSRResponse409 | CreateCSRResponse422;

export type CreateCSRResponse =
  CreateCSRResponseSuccess | CreateCSRResponseError;
export type QueryCSRResponse200 = {
  data: (CsourceRegistration & JsonLdContext)[];
  status: 200;
};

export type QueryCSRResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type QueryCSRResponseSuccess = QueryCSRResponse200;
export type QueryCSRResponseError = QueryCSRResponse400;

export type QueryCSRResponse = QueryCSRResponseSuccess | QueryCSRResponseError;
export type RetrieveCSRResponse200 = {
  data: MaybeContext<CsourceRegistration>;
  status: 200;
};

export type RetrieveCSRResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type RetrieveCSRResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type RetrieveCSRResponseSuccess = RetrieveCSRResponse200;
export type RetrieveCSRResponseError =
  RetrieveCSRResponse400 | RetrieveCSRResponse404;

export type RetrieveCSRResponse =
  RetrieveCSRResponseSuccess | RetrieveCSRResponseError;
export type UpdateCSRResponse204 = {
  data: void;
  status: 204;
};

export type UpdateCSRResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type UpdateCSRResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type UpdateCSRResponseSuccess = UpdateCSRResponse204;
export type UpdateCSRResponseError =
  UpdateCSRResponse400 | UpdateCSRResponse404;

export type UpdateCSRResponse =
  UpdateCSRResponseSuccess | UpdateCSRResponseError;
export type DeleteCSRResponse204 = {
  data: void;
  status: 204;
};

export type DeleteCSRResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type DeleteCSRResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type DeleteCSRResponseSuccess = DeleteCSRResponse204;
export type DeleteCSRResponseError =
  DeleteCSRResponse400 | DeleteCSRResponse404;

export type DeleteCSRResponse =
  DeleteCSRResponseSuccess | DeleteCSRResponseError;
export type CreateSubscriptionResponse201 = {
  data: void;
  status: 201;
  /** URI of the created subscription from the Location header. */
  location: string;
};

export type CreateSubscriptionResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type CreateSubscriptionResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type CreateSubscriptionResponseSuccess = CreateSubscriptionResponse201;
export type CreateSubscriptionResponseError =
  CreateSubscriptionResponse400 | CreateSubscriptionResponse409;

export type CreateSubscriptionResponse =
  CreateSubscriptionResponseSuccess | CreateSubscriptionResponseError;
export type QuerySubscriptionResponse200 = {
  data: (Subscription & JsonLdContext)[];
  status: 200;
};

export type QuerySubscriptionResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type QuerySubscriptionResponseSuccess = QuerySubscriptionResponse200;
export type QuerySubscriptionResponseError = QuerySubscriptionResponse400;

export type QuerySubscriptionResponse =
  QuerySubscriptionResponseSuccess | QuerySubscriptionResponseError;
export type RetrieveSubscriptionResponse200 = {
  data: MaybeContext<Subscription>;
  status: 200;
};

export type RetrieveSubscriptionResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type RetrieveSubscriptionResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type RetrieveSubscriptionResponseSuccess =
  RetrieveSubscriptionResponse200;
export type RetrieveSubscriptionResponseError =
  RetrieveSubscriptionResponse400 | RetrieveSubscriptionResponse404;

export type RetrieveSubscriptionResponse =
  RetrieveSubscriptionResponseSuccess | RetrieveSubscriptionResponseError;
export type UpdateSubscriptionResponse204 = {
  data: void;
  status: 204;
};

export type UpdateSubscriptionResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type UpdateSubscriptionResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type UpdateSubscriptionResponseSuccess = UpdateSubscriptionResponse204;
export type UpdateSubscriptionResponseError =
  UpdateSubscriptionResponse400 | UpdateSubscriptionResponse404;

export type UpdateSubscriptionResponse =
  UpdateSubscriptionResponseSuccess | UpdateSubscriptionResponseError;
export type DeleteSubscriptionResponse204 = {
  data: void;
  status: 204;
};

export type DeleteSubscriptionResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type DeleteSubscriptionResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type DeleteSubscriptionResponseSuccess = DeleteSubscriptionResponse204;
export type DeleteSubscriptionResponseError =
  DeleteSubscriptionResponse400 | DeleteSubscriptionResponse404;

export type DeleteSubscriptionResponse =
  DeleteSubscriptionResponseSuccess | DeleteSubscriptionResponseError;
export type CreateCSRSubscriptionResponse201 = {
  data: void;
  status: 201;
  /** URI of the created CSR subscription from the Location header. */
  location: string;
};

export type CreateCSRSubscriptionResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type CreateCSRSubscriptionResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type CreateCSRSubscriptionResponseSuccess =
  CreateCSRSubscriptionResponse201;
export type CreateCSRSubscriptionResponseError =
  CreateCSRSubscriptionResponse400 | CreateCSRSubscriptionResponse409;

export type CreateCSRSubscriptionResponse =
  CreateCSRSubscriptionResponseSuccess | CreateCSRSubscriptionResponseError;
export type QueryCSRSubscriptionResponse200 = {
  data: (Subscription & JsonLdContext)[];
  status: 200;
};

export type QueryCSRSubscriptionResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type QueryCSRSubscriptionResponseSuccess =
  QueryCSRSubscriptionResponse200;
export type QueryCSRSubscriptionResponseError = QueryCSRSubscriptionResponse400;

export type QueryCSRSubscriptionResponse =
  QueryCSRSubscriptionResponseSuccess | QueryCSRSubscriptionResponseError;
export type RetrieveCSRSubscriptionResponse200 = {
  data: MaybeContext<Subscription>;
  status: 200;
};

export type RetrieveCSRSubscriptionResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type RetrieveCSRSubscriptionResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type RetrieveCSRSubscriptionResponseSuccess =
  RetrieveCSRSubscriptionResponse200;
export type RetrieveCSRSubscriptionResponseError =
  RetrieveCSRSubscriptionResponse400 | RetrieveCSRSubscriptionResponse404;

export type RetrieveCSRSubscriptionResponse =
  RetrieveCSRSubscriptionResponseSuccess | RetrieveCSRSubscriptionResponseError;
export type UpdateCSRSubscriptionResponse204 = {
  data: void;
  status: 204;
};

export type UpdateCSRSubscriptionResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type UpdateCSRSubscriptionResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type UpdateCSRSubscriptionResponseSuccess =
  UpdateCSRSubscriptionResponse204;
export type UpdateCSRSubscriptionResponseError =
  UpdateCSRSubscriptionResponse400 | UpdateCSRSubscriptionResponse404;

export type UpdateCSRSubscriptionResponse =
  UpdateCSRSubscriptionResponseSuccess | UpdateCSRSubscriptionResponseError;
export type DeleteCSRSubscriptionResponse204 = {
  data: void;
  status: 204;
};

export type DeleteCSRSubscriptionResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type DeleteCSRSubscriptionResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type DeleteCSRSubscriptionResponseSuccess =
  DeleteCSRSubscriptionResponse204;
export type DeleteCSRSubscriptionResponseError =
  DeleteCSRSubscriptionResponse400 | DeleteCSRSubscriptionResponse404;

export type DeleteCSRSubscriptionResponse =
  DeleteCSRSubscriptionResponseSuccess | DeleteCSRSubscriptionResponseError;
export type CreateBatchResponse201 = {
  data: string[];
  status: 201;
};

export type CreateBatchResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type CreateBatchResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type CreateBatchResponseSuccess =
  CreateBatchResponse201 | CreateBatchResponse207;
export type CreateBatchResponseError = CreateBatchResponse400;

export type CreateBatchResponse =
  CreateBatchResponseSuccess | CreateBatchResponseError;
export type UpsertBatchResponse201 = {
  data: string[];
  status: 201;
};

export type UpsertBatchResponse204 = {
  data: void;
  status: 204;
};

export type UpsertBatchResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type UpsertBatchResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type UpsertBatchResponseSuccess =
  UpsertBatchResponse201 | UpsertBatchResponse204 | UpsertBatchResponse207;
export type UpsertBatchResponseError = UpsertBatchResponse400;

export type UpsertBatchResponse =
  UpsertBatchResponseSuccess | UpsertBatchResponseError;
export type UpdateBatchResponse204 = {
  data: void;
  status: 204;
};

export type UpdateBatchResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type UpdateBatchResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type UpdateBatchResponseSuccess =
  UpdateBatchResponse204 | UpdateBatchResponse207;
export type UpdateBatchResponseError = UpdateBatchResponse400;

export type UpdateBatchResponse =
  UpdateBatchResponseSuccess | UpdateBatchResponseError;
export type DeleteBatchResponse204 = {
  data: void;
  status: 204;
};

export type DeleteBatchResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type DeleteBatchResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type DeleteBatchResponseSuccess =
  DeleteBatchResponse204 | DeleteBatchResponse207;
export type DeleteBatchResponseError = DeleteBatchResponse400;

export type DeleteBatchResponse =
  DeleteBatchResponseSuccess | DeleteBatchResponseError;
export type QueryBatchResponse200 = {
  data: (Entity & JsonLdContext)[];
  status: 200;
};

export type QueryBatchResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type QueryBatchResponseSuccess = QueryBatchResponse200;
export type QueryBatchResponseError = QueryBatchResponse400;

export type QueryBatchResponse =
  QueryBatchResponseSuccess | QueryBatchResponseError;
export type MergeBatchResponse204 = {
  data: void;
  status: 204;
};

export type MergeBatchResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type MergeBatchResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type MergeBatchResponseSuccess =
  MergeBatchResponse204 | MergeBatchResponse207;
export type MergeBatchResponseError = MergeBatchResponse400;

export type MergeBatchResponse =
  MergeBatchResponseSuccess | MergeBatchResponseError;
export type UpsertTemporalResponse201 = {
  data: void;
  status: 201;
  /** URI of the created temporal entity from the Location header. */
  location: string;
};

export type UpsertTemporalResponse204 = {
  data: void;
  status: 204;
};

export type UpsertTemporalResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type UpsertTemporalResponse422 = {
  data: UnprocessableResponse;
  status: 422;
};

export type UpsertTemporalResponseSuccess =
  UpsertTemporalResponse201 | UpsertTemporalResponse204;
export type UpsertTemporalResponseError =
  UpsertTemporalResponse400 | UpsertTemporalResponse422;

export type UpsertTemporalResponse =
  UpsertTemporalResponseSuccess | UpsertTemporalResponseError;
export type QueryTemporalResponse200 = {
  data: (EntityTemporal & JsonLdContext)[];
  status: 200;
};

export type QueryTemporalResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type QueryTemporalResponseSuccess = QueryTemporalResponse200;
export type QueryTemporalResponseError = QueryTemporalResponse400;

export type QueryTemporalResponse =
  QueryTemporalResponseSuccess | QueryTemporalResponseError;
export type RetrieveTemporalResponse200 = {
  data: MaybeContext<EntityTemporal>;
  status: 200;
};

export type RetrieveTemporalResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type RetrieveTemporalResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type RetrieveTemporalResponseSuccess = RetrieveTemporalResponse200;
export type RetrieveTemporalResponseError =
  RetrieveTemporalResponse400 | RetrieveTemporalResponse404;

export type RetrieveTemporalResponse =
  RetrieveTemporalResponseSuccess | RetrieveTemporalResponseError;
export type DeleteTemporalResponse204 = {
  data: void;
  status: 204;
};

export type DeleteTemporalResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type DeleteTemporalResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type DeleteTemporalResponseSuccess = DeleteTemporalResponse204;
export type DeleteTemporalResponseError =
  DeleteTemporalResponse400 | DeleteTemporalResponse404;

export type DeleteTemporalResponse =
  DeleteTemporalResponseSuccess | DeleteTemporalResponseError;
export type AppendAttrsTemporalResponse204 = {
  data: void;
  status: 204;
};

export type AppendAttrsTemporalResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type AppendAttrsTemporalResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type AppendAttrsTemporalResponseSuccess = AppendAttrsTemporalResponse204;
export type AppendAttrsTemporalResponseError =
  AppendAttrsTemporalResponse400 | AppendAttrsTemporalResponse404;

export type AppendAttrsTemporalResponse =
  AppendAttrsTemporalResponseSuccess | AppendAttrsTemporalResponseError;
export type DeleteAttrsTemporalResponse204 = {
  data: void;
  status: 204;
};

export type DeleteAttrsTemporalResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type DeleteAttrsTemporalResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type DeleteAttrsTemporalResponseSuccess = DeleteAttrsTemporalResponse204;
export type DeleteAttrsTemporalResponseError =
  DeleteAttrsTemporalResponse400 | DeleteAttrsTemporalResponse404;

export type DeleteAttrsTemporalResponse =
  DeleteAttrsTemporalResponseSuccess | DeleteAttrsTemporalResponseError;
export type UpdateAttrsTemporalResponse204 = {
  data: void;
  status: 204;
};

export type UpdateAttrsTemporalResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type UpdateAttrsTemporalResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type UpdateAttrsTemporalResponseSuccess = UpdateAttrsTemporalResponse204;
export type UpdateAttrsTemporalResponseError =
  UpdateAttrsTemporalResponse400 | UpdateAttrsTemporalResponse404;

export type UpdateAttrsTemporalResponse =
  UpdateAttrsTemporalResponseSuccess | UpdateAttrsTemporalResponseError;
export type DeleteAttrInstanceTemporalResponse204 = {
  data: void;
  status: 204;
};

export type DeleteAttrInstanceTemporalResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type DeleteAttrInstanceTemporalResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type DeleteAttrInstanceTemporalResponseSuccess =
  DeleteAttrInstanceTemporalResponse204;
export type DeleteAttrInstanceTemporalResponseError =
  DeleteAttrInstanceTemporalResponse400 | DeleteAttrInstanceTemporalResponse404;

export type DeleteAttrInstanceTemporalResponse =
  | DeleteAttrInstanceTemporalResponseSuccess
  | DeleteAttrInstanceTemporalResponseError;
export type TemporalQueryBatchResponse200 = {
  data: (EntityTemporal & JsonLdContext)[];
  status: 200;
};

export type TemporalQueryBatchResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type TemporalQueryBatchResponseSuccess = TemporalQueryBatchResponse200;
export type TemporalQueryBatchResponseError = TemporalQueryBatchResponse400;

export type TemporalQueryBatchResponse =
  TemporalQueryBatchResponseSuccess | TemporalQueryBatchResponseError;
export type RetrieveEntityTypesResponse200 = {
  data: RetrieveEntityTypes200;
  status: 200;
};

export type RetrieveEntityTypesResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type RetrieveEntityTypesResponseSuccess = RetrieveEntityTypesResponse200;
export type RetrieveEntityTypesResponseError = RetrieveEntityTypesResponse400;

export type RetrieveEntityTypesResponse =
  RetrieveEntityTypesResponseSuccess | RetrieveEntityTypesResponseError;
export type RetrieveEntityTypeInfoResponse200 = {
  data: WithContext<EntityTypeInfo>;
  status: 200;
};

export type RetrieveEntityTypeInfoResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type RetrieveEntityTypeInfoResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type RetrieveEntityTypeInfoResponseSuccess =
  RetrieveEntityTypeInfoResponse200;
export type RetrieveEntityTypeInfoResponseError =
  RetrieveEntityTypeInfoResponse400 | RetrieveEntityTypeInfoResponse404;

export type RetrieveEntityTypeInfoResponse =
  RetrieveEntityTypeInfoResponseSuccess | RetrieveEntityTypeInfoResponseError;
export type RetrieveAttrTypesResponse200 = {
  data: RetrieveAttrTypes200;
  status: 200;
};

export type RetrieveAttrTypesResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type RetrieveAttrTypesResponseSuccess = RetrieveAttrTypesResponse200;
export type RetrieveAttrTypesResponseError = RetrieveAttrTypesResponse400;

export type RetrieveAttrTypesResponse =
  RetrieveAttrTypesResponseSuccess | RetrieveAttrTypesResponseError;
export type RetrieveAttrTypeInfoResponse200 = {
  data: WithContext<Attribute>;
  status: 200;
};

export type RetrieveAttrTypeInfoResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type RetrieveAttrTypeInfoResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type RetrieveAttrTypeInfoResponseSuccess =
  RetrieveAttrTypeInfoResponse200;
export type RetrieveAttrTypeInfoResponseError =
  RetrieveAttrTypeInfoResponse400 | RetrieveAttrTypeInfoResponse404;

export type RetrieveAttrTypeInfoResponse =
  RetrieveAttrTypeInfoResponseSuccess | RetrieveAttrTypeInfoResponseError;
export type CreateContextResponse201 = {
  data: void;
  status: 201;
  /** URI of the created @context from the Location header. */
  location: string;
};

export type CreateContextResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type CreateContextResponseSuccess = CreateContextResponse201;
export type CreateContextResponseError = CreateContextResponse400;

export type CreateContextResponse =
  CreateContextResponseSuccess | CreateContextResponseError;
export type ListContextsResponse200 = {
  data: string[] | LdContextMetadata[];
  status: 200;
};

export type ListContextsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type ListContextsResponseSuccess = ListContextsResponse200;
export type ListContextsResponseError = ListContextsResponse400;

export type ListContextsResponse =
  ListContextsResponseSuccess | ListContextsResponseError;
export type RetrieveContextResponse200 = {
  data: RetrieveContext200;
  status: 200;
};

export type RetrieveContextResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type RetrieveContextResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type RetrieveContextResponse422 = {
  data: UnprocessableResponse;
  status: 422;
};

export type RetrieveContextResponseSuccess = RetrieveContextResponse200;
export type RetrieveContextResponseError =
  | RetrieveContextResponse400
  | RetrieveContextResponse404
  | RetrieveContextResponse422;

export type RetrieveContextResponse =
  RetrieveContextResponseSuccess | RetrieveContextResponseError;
export type DeleteContextResponse204 = {
  data: void;
  status: 204;
};

export type DeleteContextResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type DeleteContextResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type DeleteContextResponse504 = {
  data: GatewayTimeoutResponse;
  status: 504;
};

export type DeleteContextResponseSuccess = DeleteContextResponse204;
export type DeleteContextResponseError =
  | DeleteContextResponse400
  | DeleteContextResponse404
  | DeleteContextResponse504;

export type DeleteContextResponse =
  DeleteContextResponseSuccess | DeleteContextResponseError;
export type RetrieveEntityMapResponse200 = {
  data: MaybeContext<EntityMap>;
  status: 200;
};

export type RetrieveEntityMapResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type RetrieveEntityMapResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type RetrieveEntityMapResponseSuccess = RetrieveEntityMapResponse200;
export type RetrieveEntityMapResponseError =
  RetrieveEntityMapResponse400 | RetrieveEntityMapResponse404;

export type RetrieveEntityMapResponse =
  RetrieveEntityMapResponseSuccess | RetrieveEntityMapResponseError;
export type UpdateEntityMapResponse204 = {
  data: void;
  status: 204;
};

export type UpdateEntityMapResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type UpdateEntityMapResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type UpdateEntityMapResponseSuccess = UpdateEntityMapResponse204;
export type UpdateEntityMapResponseError =
  UpdateEntityMapResponse400 | UpdateEntityMapResponse404;

export type UpdateEntityMapResponse =
  UpdateEntityMapResponseSuccess | UpdateEntityMapResponseError;
export type DeleteEntityMapResponse204 = {
  data: void;
  status: 204;
};

export type DeleteEntityMapResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type DeleteEntityMapResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type DeleteEntityMapResponseSuccess = DeleteEntityMapResponse204;
export type DeleteEntityMapResponseError =
  DeleteEntityMapResponse400 | DeleteEntityMapResponse404;

export type DeleteEntityMapResponse =
  DeleteEntityMapResponseSuccess | DeleteEntityMapResponseError;
export type RetrieveCSIdentityInfoResponse200 = {
  data: MaybeContext<ContextSourceIdentity>;
  status: 200;
};

export type RetrieveCSIdentityInfoResponse501 = {
  data: NotImplementedResponse;
  status: 501;
};

export type RetrieveCSIdentityInfoResponseSuccess =
  RetrieveCSIdentityInfoResponse200;
export type RetrieveCSIdentityInfoResponseError =
  RetrieveCSIdentityInfoResponse501;

export type RetrieveCSIdentityInfoResponse =
  RetrieveCSIdentityInfoResponseSuccess | RetrieveCSIdentityInfoResponseError;
