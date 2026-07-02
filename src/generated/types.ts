import type {
  BadRequestResponse,
  ConflictResponse,
  CsourceRegistration,
  Entity,
  EntityTemporal,
  Feature,
  FeatureCollection,
  GatewayTimeoutResponse,
  JsonLdContext,
  LdContextMetadata,
  MultiStatusBatchOperationResultResponse,
  MultiStatusUpdateResultResponse,
  NotFoundResponse,
  NotImplementedResponse,
  RetrieveAttrTypeInfo200,
  RetrieveAttrTypes200,
  RetrieveCSIdentityInfo200,
  RetrieveCSR200,
  RetrieveCSRSubscription200,
  RetrieveContext200,
  RetrieveEntity200,
  RetrieveEntityMap200,
  RetrieveEntityTypeInfo200,
  RetrieveEntityTypes200,
  RetrieveSubscription200,
  RetrieveTemporal200,
  Subscription,
  UnprocessableResponse,
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

export type CreateEntityResponseSuccess = (
  CreateEntityResponse201 | CreateEntityResponse207
) & {
  headers: Headers;
};
export type CreateEntityResponseError = (
  CreateEntityResponse400 | CreateEntityResponse409 | CreateEntityResponse422
) & {
  headers: Headers;
};

export type CreateEntityResponse =
  CreateEntityResponseSuccess | CreateEntityResponseError;
export type QueryEntityResponse200ApplicationLdJson = {
  data: (Entity & JsonLdContext)[];
  status: 200;
};

export type QueryEntityResponse200ApplicationGeoJson = {
  data: FeatureCollection;
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

export type QueryEntityResponseSuccess = (
  | QueryEntityResponse200ApplicationLdJson
  | QueryEntityResponse200ApplicationGeoJson
) & {
  headers: Headers;
};
export type QueryEntityResponseError = (
  QueryEntityResponse400 | QueryEntityResponse501
) & {
  headers: Headers;
};

export type QueryEntityResponse =
  QueryEntityResponseSuccess | QueryEntityResponseError;
export type RetrieveEntityResponse200ApplicationLdJson = {
  data: RetrieveEntity200;
  status: 200;
};

export type RetrieveEntityResponse200ApplicationGeoJson = {
  data: Feature;
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

export type RetrieveEntityResponseSuccess = (
  | RetrieveEntityResponse200ApplicationLdJson
  | RetrieveEntityResponse200ApplicationGeoJson
) & {
  headers: Headers;
};
export type RetrieveEntityResponseError = (
  | RetrieveEntityResponse400
  | RetrieveEntityResponse404
  | RetrieveEntityResponse501
) & {
  headers: Headers;
};

export type RetrieveEntityResponse =
  RetrieveEntityResponseSuccess | RetrieveEntityResponseError;
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

export type DeleteEntityResponseSuccess = (
  DeleteEntityResponse204 | DeleteEntityResponse207
) & {
  headers: Headers;
};
export type DeleteEntityResponseError = (
  DeleteEntityResponse400 | DeleteEntityResponse404
) & {
  headers: Headers;
};

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

export type MergeEntityResponseSuccess = (
  MergeEntityResponse204 | MergeEntityResponse207
) & {
  headers: Headers;
};
export type MergeEntityResponseError = (
  MergeEntityResponse400 | MergeEntityResponse404
) & {
  headers: Headers;
};

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

export type ReplaceEntityResponseSuccess = (
  ReplaceEntityResponse204 | ReplaceEntityResponse207
) & {
  headers: Headers;
};
export type ReplaceEntityResponseError = (
  ReplaceEntityResponse400 | ReplaceEntityResponse404
) & {
  headers: Headers;
};

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

export type AppendAttrsResponseSuccess = (
  AppendAttrsResponse204 | AppendAttrsResponse207
) & {
  headers: Headers;
};
export type AppendAttrsResponseError = (
  AppendAttrsResponse400 | AppendAttrsResponse404
) & {
  headers: Headers;
};

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

export type UpdateEntityResponseSuccess = (
  UpdateEntityResponse204 | UpdateEntityResponse207
) & {
  headers: Headers;
};
export type UpdateEntityResponseError = (
  UpdateEntityResponse400 | UpdateEntityResponse404
) & {
  headers: Headers;
};

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

export type UpdateAttrsResponseSuccess = (
  UpdateAttrsResponse204 | UpdateAttrsResponse207
) & {
  headers: Headers;
};
export type UpdateAttrsResponseError = (
  UpdateAttrsResponse400 | UpdateAttrsResponse404
) & {
  headers: Headers;
};

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

export type DeleteAttrsResponseSuccess = (
  DeleteAttrsResponse204 | DeleteAttrsResponse207
) & {
  headers: Headers;
};
export type DeleteAttrsResponseError = (
  DeleteAttrsResponse400 | DeleteAttrsResponse404
) & {
  headers: Headers;
};

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

export type ReplaceAttrsResponseSuccess = (
  ReplaceAttrsResponse204 | ReplaceAttrsResponse207
) & {
  headers: Headers;
};
export type ReplaceAttrsResponseError = (
  ReplaceAttrsResponse400 | ReplaceAttrsResponse404
) & {
  headers: Headers;
};

export type ReplaceAttrsResponse =
  ReplaceAttrsResponseSuccess | ReplaceAttrsResponseError;
export type CreateCSRResponse201 = {
  data: void;
  status: 201;
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

export type CreateCSRResponseSuccess = CreateCSRResponse201 & {
  headers: Headers;
};
export type CreateCSRResponseError = (
  CreateCSRResponse400 | CreateCSRResponse409 | CreateCSRResponse422
) & {
  headers: Headers;
};

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

export type QueryCSRResponseSuccess = QueryCSRResponse200 & {
  headers: Headers;
};
export type QueryCSRResponseError = QueryCSRResponse400 & {
  headers: Headers;
};

export type QueryCSRResponse = QueryCSRResponseSuccess | QueryCSRResponseError;
export type RetrieveCSRResponse200 = {
  data: RetrieveCSR200;
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

export type RetrieveCSRResponseSuccess = RetrieveCSRResponse200 & {
  headers: Headers;
};
export type RetrieveCSRResponseError = (
  RetrieveCSRResponse400 | RetrieveCSRResponse404
) & {
  headers: Headers;
};

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

export type UpdateCSRResponseSuccess = UpdateCSRResponse204 & {
  headers: Headers;
};
export type UpdateCSRResponseError = (
  UpdateCSRResponse400 | UpdateCSRResponse404
) & {
  headers: Headers;
};

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

export type DeleteCSRResponseSuccess = DeleteCSRResponse204 & {
  headers: Headers;
};
export type DeleteCSRResponseError = (
  DeleteCSRResponse400 | DeleteCSRResponse404
) & {
  headers: Headers;
};

export type DeleteCSRResponse =
  DeleteCSRResponseSuccess | DeleteCSRResponseError;
export type CreateSubscriptionResponse201 = {
  data: void;
  status: 201;
};

export type CreateSubscriptionResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type CreateSubscriptionResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type CreateSubscriptionResponseSuccess =
  CreateSubscriptionResponse201 & {
    headers: Headers;
  };
export type CreateSubscriptionResponseError = (
  CreateSubscriptionResponse400 | CreateSubscriptionResponse409
) & {
  headers: Headers;
};

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

export type QuerySubscriptionResponseSuccess = QuerySubscriptionResponse200 & {
  headers: Headers;
};
export type QuerySubscriptionResponseError = QuerySubscriptionResponse400 & {
  headers: Headers;
};

export type QuerySubscriptionResponse =
  QuerySubscriptionResponseSuccess | QuerySubscriptionResponseError;
export type RetrieveSubscriptionResponse200 = {
  data: RetrieveSubscription200;
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
  RetrieveSubscriptionResponse200 & {
    headers: Headers;
  };
export type RetrieveSubscriptionResponseError = (
  RetrieveSubscriptionResponse400 | RetrieveSubscriptionResponse404
) & {
  headers: Headers;
};

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

export type UpdateSubscriptionResponseSuccess =
  UpdateSubscriptionResponse204 & {
    headers: Headers;
  };
export type UpdateSubscriptionResponseError = (
  UpdateSubscriptionResponse400 | UpdateSubscriptionResponse404
) & {
  headers: Headers;
};

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

export type DeleteSubscriptionResponseSuccess =
  DeleteSubscriptionResponse204 & {
    headers: Headers;
  };
export type DeleteSubscriptionResponseError = (
  DeleteSubscriptionResponse400 | DeleteSubscriptionResponse404
) & {
  headers: Headers;
};

export type DeleteSubscriptionResponse =
  DeleteSubscriptionResponseSuccess | DeleteSubscriptionResponseError;
export type CreateCSRSubscriptionResponse201 = {
  data: void;
  status: 201;
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
  CreateCSRSubscriptionResponse201 & {
    headers: Headers;
  };
export type CreateCSRSubscriptionResponseError = (
  CreateCSRSubscriptionResponse400 | CreateCSRSubscriptionResponse409
) & {
  headers: Headers;
};

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
  QueryCSRSubscriptionResponse200 & {
    headers: Headers;
  };
export type QueryCSRSubscriptionResponseError =
  QueryCSRSubscriptionResponse400 & {
    headers: Headers;
  };

export type QueryCSRSubscriptionResponse =
  QueryCSRSubscriptionResponseSuccess | QueryCSRSubscriptionResponseError;
export type RetrieveCSRSubscriptionResponse200 = {
  data: RetrieveCSRSubscription200;
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
  RetrieveCSRSubscriptionResponse200 & {
    headers: Headers;
  };
export type RetrieveCSRSubscriptionResponseError = (
  RetrieveCSRSubscriptionResponse400 | RetrieveCSRSubscriptionResponse404
) & {
  headers: Headers;
};

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
  UpdateCSRSubscriptionResponse204 & {
    headers: Headers;
  };
export type UpdateCSRSubscriptionResponseError = (
  UpdateCSRSubscriptionResponse400 | UpdateCSRSubscriptionResponse404
) & {
  headers: Headers;
};

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
  DeleteCSRSubscriptionResponse204 & {
    headers: Headers;
  };
export type DeleteCSRSubscriptionResponseError = (
  DeleteCSRSubscriptionResponse400 | DeleteCSRSubscriptionResponse404
) & {
  headers: Headers;
};

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

export type CreateBatchResponseSuccess = (
  CreateBatchResponse201 | CreateBatchResponse207
) & {
  headers: Headers;
};
export type CreateBatchResponseError = CreateBatchResponse400 & {
  headers: Headers;
};

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

export type UpsertBatchResponseSuccess = (
  UpsertBatchResponse201 | UpsertBatchResponse204 | UpsertBatchResponse207
) & {
  headers: Headers;
};
export type UpsertBatchResponseError = UpsertBatchResponse400 & {
  headers: Headers;
};

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

export type UpdateBatchResponseSuccess = (
  UpdateBatchResponse204 | UpdateBatchResponse207
) & {
  headers: Headers;
};
export type UpdateBatchResponseError = UpdateBatchResponse400 & {
  headers: Headers;
};

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

export type DeleteBatchResponseSuccess = (
  DeleteBatchResponse204 | DeleteBatchResponse207
) & {
  headers: Headers;
};
export type DeleteBatchResponseError = DeleteBatchResponse400 & {
  headers: Headers;
};

export type DeleteBatchResponse =
  DeleteBatchResponseSuccess | DeleteBatchResponseError;
export type QueryBatchResponse200ApplicationLdJson = {
  data: (Entity & JsonLdContext)[];
  status: 200;
};

export type QueryBatchResponse200ApplicationGeoJson = {
  data: FeatureCollection;
  status: 200;
};

export type QueryBatchResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type QueryBatchResponseSuccess = (
  | QueryBatchResponse200ApplicationLdJson
  | QueryBatchResponse200ApplicationGeoJson
) & {
  headers: Headers;
};
export type QueryBatchResponseError = QueryBatchResponse400 & {
  headers: Headers;
};

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

export type MergeBatchResponseSuccess = (
  MergeBatchResponse204 | MergeBatchResponse207
) & {
  headers: Headers;
};
export type MergeBatchResponseError = MergeBatchResponse400 & {
  headers: Headers;
};

export type MergeBatchResponse =
  MergeBatchResponseSuccess | MergeBatchResponseError;
export type UpsertTemporalResponse201 = {
  data: void;
  status: 201;
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

export type UpsertTemporalResponseSuccess = (
  UpsertTemporalResponse201 | UpsertTemporalResponse204
) & {
  headers: Headers;
};
export type UpsertTemporalResponseError = (
  UpsertTemporalResponse400 | UpsertTemporalResponse422
) & {
  headers: Headers;
};

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

export type QueryTemporalResponseSuccess = QueryTemporalResponse200 & {
  headers: Headers;
};
export type QueryTemporalResponseError = QueryTemporalResponse400 & {
  headers: Headers;
};

export type QueryTemporalResponse =
  QueryTemporalResponseSuccess | QueryTemporalResponseError;
export type RetrieveTemporalResponse200 = {
  data: RetrieveTemporal200;
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

export type RetrieveTemporalResponseSuccess = RetrieveTemporalResponse200 & {
  headers: Headers;
};
export type RetrieveTemporalResponseError = (
  RetrieveTemporalResponse400 | RetrieveTemporalResponse404
) & {
  headers: Headers;
};

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

export type DeleteTemporalResponseSuccess = DeleteTemporalResponse204 & {
  headers: Headers;
};
export type DeleteTemporalResponseError = (
  DeleteTemporalResponse400 | DeleteTemporalResponse404
) & {
  headers: Headers;
};

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

export type AppendAttrsTemporalResponseSuccess =
  AppendAttrsTemporalResponse204 & {
    headers: Headers;
  };
export type AppendAttrsTemporalResponseError = (
  AppendAttrsTemporalResponse400 | AppendAttrsTemporalResponse404
) & {
  headers: Headers;
};

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

export type DeleteAttrsTemporalResponseSuccess =
  DeleteAttrsTemporalResponse204 & {
    headers: Headers;
  };
export type DeleteAttrsTemporalResponseError = (
  DeleteAttrsTemporalResponse400 | DeleteAttrsTemporalResponse404
) & {
  headers: Headers;
};

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

export type UpdateAttrsTemporalResponseSuccess =
  UpdateAttrsTemporalResponse204 & {
    headers: Headers;
  };
export type UpdateAttrsTemporalResponseError = (
  UpdateAttrsTemporalResponse400 | UpdateAttrsTemporalResponse404
) & {
  headers: Headers;
};

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
  DeleteAttrInstanceTemporalResponse204 & {
    headers: Headers;
  };
export type DeleteAttrInstanceTemporalResponseError = (
  DeleteAttrInstanceTemporalResponse400 | DeleteAttrInstanceTemporalResponse404
) & {
  headers: Headers;
};

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

export type TemporalQueryBatchResponseSuccess =
  TemporalQueryBatchResponse200 & {
    headers: Headers;
  };
export type TemporalQueryBatchResponseError = TemporalQueryBatchResponse400 & {
  headers: Headers;
};

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

export type RetrieveEntityTypesResponseSuccess =
  RetrieveEntityTypesResponse200 & {
    headers: Headers;
  };
export type RetrieveEntityTypesResponseError =
  RetrieveEntityTypesResponse400 & {
    headers: Headers;
  };

export type RetrieveEntityTypesResponse =
  RetrieveEntityTypesResponseSuccess | RetrieveEntityTypesResponseError;
export type RetrieveEntityTypeInfoResponse200 = {
  data: RetrieveEntityTypeInfo200;
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
  RetrieveEntityTypeInfoResponse200 & {
    headers: Headers;
  };
export type RetrieveEntityTypeInfoResponseError = (
  RetrieveEntityTypeInfoResponse400 | RetrieveEntityTypeInfoResponse404
) & {
  headers: Headers;
};

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

export type RetrieveAttrTypesResponseSuccess = RetrieveAttrTypesResponse200 & {
  headers: Headers;
};
export type RetrieveAttrTypesResponseError = RetrieveAttrTypesResponse400 & {
  headers: Headers;
};

export type RetrieveAttrTypesResponse =
  RetrieveAttrTypesResponseSuccess | RetrieveAttrTypesResponseError;
export type RetrieveAttrTypeInfoResponse200 = {
  data: RetrieveAttrTypeInfo200;
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
  RetrieveAttrTypeInfoResponse200 & {
    headers: Headers;
  };
export type RetrieveAttrTypeInfoResponseError = (
  RetrieveAttrTypeInfoResponse400 | RetrieveAttrTypeInfoResponse404
) & {
  headers: Headers;
};

export type RetrieveAttrTypeInfoResponse =
  RetrieveAttrTypeInfoResponseSuccess | RetrieveAttrTypeInfoResponseError;
export type CreateContextResponse201 = {
  data: void;
  status: 201;
};

export type CreateContextResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type CreateContextResponseSuccess = CreateContextResponse201 & {
  headers: Headers;
};
export type CreateContextResponseError = CreateContextResponse400 & {
  headers: Headers;
};

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

export type ListContextsResponseSuccess = ListContextsResponse200 & {
  headers: Headers;
};
export type ListContextsResponseError = ListContextsResponse400 & {
  headers: Headers;
};

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

export type RetrieveContextResponseSuccess = RetrieveContextResponse200 & {
  headers: Headers;
};
export type RetrieveContextResponseError = (
  | RetrieveContextResponse400
  | RetrieveContextResponse404
  | RetrieveContextResponse422
) & {
  headers: Headers;
};

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

export type DeleteContextResponseSuccess = DeleteContextResponse204 & {
  headers: Headers;
};
export type DeleteContextResponseError = (
  DeleteContextResponse400 | DeleteContextResponse404 | DeleteContextResponse504
) & {
  headers: Headers;
};

export type DeleteContextResponse =
  DeleteContextResponseSuccess | DeleteContextResponseError;
export type RetrieveEntityMapResponse200 = {
  data: RetrieveEntityMap200;
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

export type RetrieveEntityMapResponseSuccess = RetrieveEntityMapResponse200 & {
  headers: Headers;
};
export type RetrieveEntityMapResponseError = (
  RetrieveEntityMapResponse400 | RetrieveEntityMapResponse404
) & {
  headers: Headers;
};

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

export type UpdateEntityMapResponseSuccess = UpdateEntityMapResponse204 & {
  headers: Headers;
};
export type UpdateEntityMapResponseError = (
  UpdateEntityMapResponse400 | UpdateEntityMapResponse404
) & {
  headers: Headers;
};

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

export type DeleteEntityMapResponseSuccess = DeleteEntityMapResponse204 & {
  headers: Headers;
};
export type DeleteEntityMapResponseError = (
  DeleteEntityMapResponse400 | DeleteEntityMapResponse404
) & {
  headers: Headers;
};

export type DeleteEntityMapResponse =
  DeleteEntityMapResponseSuccess | DeleteEntityMapResponseError;
export type RetrieveCSIdentityInfoResponse200 = {
  data: RetrieveCSIdentityInfo200;
  status: 200;
};

export type RetrieveCSIdentityInfoResponse501 = {
  data: NotImplementedResponse;
  status: 501;
};

export type RetrieveCSIdentityInfoResponseSuccess =
  RetrieveCSIdentityInfoResponse200 & {
    headers: Headers;
  };
export type RetrieveCSIdentityInfoResponseError =
  RetrieveCSIdentityInfoResponse501 & {
    headers: Headers;
  };

export type RetrieveCSIdentityInfoResponse =
  RetrieveCSIdentityInfoResponseSuccess | RetrieveCSIdentityInfoResponseError;
