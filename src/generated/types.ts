import type {
  Attribute,
  ContextSourceIdentity,
  CsourceRegistration,
  Entity,
  EntityMap,
  EntityTypeInfo,
  LdContextMetadata,
  MaybeContext,
  MultiStatusBatchOperationResultResponse,
  MultiStatusUpdateResultResponse,
  RetrieveAttrTypes200,
  RetrieveContext200,
  RetrieveEntityTypes200,
  Subscription,
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

export type CreateEntityResponseSuccess =
  CreateEntityResponse201 | CreateEntityResponse207;

export type CreateEntityResponse = CreateEntityResponseSuccess;

export type DeleteEntityResponse204 = {
  data: void;
  status: 204;
};

export type DeleteEntityResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type DeleteEntityResponseSuccess =
  DeleteEntityResponse204 | DeleteEntityResponse207;

export type DeleteEntityResponse = DeleteEntityResponseSuccess;
export type MergeEntityResponse204 = {
  data: void;
  status: 204;
};

export type MergeEntityResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type MergeEntityResponseSuccess =
  MergeEntityResponse204 | MergeEntityResponse207;

export type MergeEntityResponse = MergeEntityResponseSuccess;
export type ReplaceEntityResponse204 = {
  data: void;
  status: 204;
};

export type ReplaceEntityResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type ReplaceEntityResponseSuccess =
  ReplaceEntityResponse204 | ReplaceEntityResponse207;

export type ReplaceEntityResponse = ReplaceEntityResponseSuccess;
export type AppendAttrsResponse204 = {
  data: void;
  status: 204;
};

export type AppendAttrsResponse207 = {
  data: MultiStatusUpdateResultResponse;
  status: 207;
};

export type AppendAttrsResponseSuccess =
  AppendAttrsResponse204 | AppendAttrsResponse207;

export type AppendAttrsResponse = AppendAttrsResponseSuccess;
export type UpdateEntityResponse204 = {
  data: void;
  status: 204;
};

export type UpdateEntityResponse207 = {
  data: MultiStatusUpdateResultResponse;
  status: 207;
};

export type UpdateEntityResponseSuccess =
  UpdateEntityResponse204 | UpdateEntityResponse207;

export type UpdateEntityResponse = UpdateEntityResponseSuccess;
export type UpdateAttrsResponse204 = {
  data: void;
  status: 204;
};

export type UpdateAttrsResponse207 = {
  data: MultiStatusUpdateResultResponse;
  status: 207;
};

export type UpdateAttrsResponseSuccess =
  UpdateAttrsResponse204 | UpdateAttrsResponse207;

export type UpdateAttrsResponse = UpdateAttrsResponseSuccess;
export type DeleteAttrsResponse204 = {
  data: void;
  status: 204;
};

export type DeleteAttrsResponse207 = {
  data: MultiStatusUpdateResultResponse;
  status: 207;
};

export type DeleteAttrsResponseSuccess =
  DeleteAttrsResponse204 | DeleteAttrsResponse207;

export type DeleteAttrsResponse = DeleteAttrsResponseSuccess;
export type ReplaceAttrsResponse204 = {
  data: void;
  status: 204;
};

export type ReplaceAttrsResponse207 = {
  data: MultiStatusUpdateResultResponse;
  status: 207;
};

export type ReplaceAttrsResponseSuccess =
  ReplaceAttrsResponse204 | ReplaceAttrsResponse207;

export type ReplaceAttrsResponse = ReplaceAttrsResponseSuccess;
export type CreateCSRResponse201 = {
  data: void;
  status: 201;
  /** URI of the created CSR from the Location header. */
  location: string;
};

export type CreateCSRResponseSuccess = CreateCSRResponse201;

export type CreateCSRResponse = CreateCSRResponseSuccess;
export type QueryCSRResponse200 = {
  data: MaybeContext<CsourceRegistration>[];
  status: 200;
};

export type QueryCSRResponseSuccess = QueryCSRResponse200;

export type QueryCSRResponse = QueryCSRResponseSuccess;
export type RetrieveCSRResponse200 = {
  data: MaybeContext<CsourceRegistration>;
  status: 200;
};

export type RetrieveCSRResponseSuccess = RetrieveCSRResponse200;

export type RetrieveCSRResponse = RetrieveCSRResponseSuccess;
export type UpdateCSRResponse204 = {
  data: void;
  status: 204;
};

export type UpdateCSRResponseSuccess = UpdateCSRResponse204;

export type UpdateCSRResponse = UpdateCSRResponseSuccess;
export type DeleteCSRResponse204 = {
  data: void;
  status: 204;
};

export type DeleteCSRResponseSuccess = DeleteCSRResponse204;

export type DeleteCSRResponse = DeleteCSRResponseSuccess;
export type CreateSubscriptionResponse201 = {
  data: void;
  status: 201;
  /** URI of the created subscription from the Location header. */
  location: string;
};

export type CreateSubscriptionResponseSuccess = CreateSubscriptionResponse201;

export type CreateSubscriptionResponse = CreateSubscriptionResponseSuccess;
export type QuerySubscriptionResponse200 = {
  data: MaybeContext<Subscription>[];
  status: 200;
};

export type QuerySubscriptionResponseSuccess = QuerySubscriptionResponse200;

export type QuerySubscriptionResponse = QuerySubscriptionResponseSuccess;
export type RetrieveSubscriptionResponse200 = {
  data: MaybeContext<Subscription>;
  status: 200;
};

export type RetrieveSubscriptionResponseSuccess =
  RetrieveSubscriptionResponse200;

export type RetrieveSubscriptionResponse = RetrieveSubscriptionResponseSuccess;
export type UpdateSubscriptionResponse204 = {
  data: void;
  status: 204;
};

export type UpdateSubscriptionResponseSuccess = UpdateSubscriptionResponse204;

export type UpdateSubscriptionResponse = UpdateSubscriptionResponseSuccess;
export type DeleteSubscriptionResponse204 = {
  data: void;
  status: 204;
};

export type DeleteSubscriptionResponseSuccess = DeleteSubscriptionResponse204;

export type DeleteSubscriptionResponse = DeleteSubscriptionResponseSuccess;
export type CreateCSRSubscriptionResponse201 = {
  data: void;
  status: 201;
  /** URI of the created CSR subscription from the Location header. */
  location: string;
};

export type CreateCSRSubscriptionResponseSuccess =
  CreateCSRSubscriptionResponse201;

export type CreateCSRSubscriptionResponse =
  CreateCSRSubscriptionResponseSuccess;
export type QueryCSRSubscriptionResponse200 = {
  data: MaybeContext<Subscription>[];
  status: 200;
};

export type QueryCSRSubscriptionResponseSuccess =
  QueryCSRSubscriptionResponse200;

export type QueryCSRSubscriptionResponse = QueryCSRSubscriptionResponseSuccess;
export type RetrieveCSRSubscriptionResponse200 = {
  data: MaybeContext<Subscription>;
  status: 200;
};

export type RetrieveCSRSubscriptionResponseSuccess =
  RetrieveCSRSubscriptionResponse200;

export type RetrieveCSRSubscriptionResponse =
  RetrieveCSRSubscriptionResponseSuccess;
export type UpdateCSRSubscriptionResponse204 = {
  data: void;
  status: 204;
};

export type UpdateCSRSubscriptionResponseSuccess =
  UpdateCSRSubscriptionResponse204;

export type UpdateCSRSubscriptionResponse =
  UpdateCSRSubscriptionResponseSuccess;
export type DeleteCSRSubscriptionResponse204 = {
  data: void;
  status: 204;
};

export type DeleteCSRSubscriptionResponseSuccess =
  DeleteCSRSubscriptionResponse204;

export type DeleteCSRSubscriptionResponse =
  DeleteCSRSubscriptionResponseSuccess;
export type CreateBatchResponse201 = {
  data: string[];
  status: 201;
};

export type CreateBatchResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type CreateBatchResponseSuccess =
  CreateBatchResponse201 | CreateBatchResponse207;

export type CreateBatchResponse = CreateBatchResponseSuccess;
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

export type UpsertBatchResponseSuccess =
  UpsertBatchResponse201 | UpsertBatchResponse204 | UpsertBatchResponse207;

export type UpsertBatchResponse = UpsertBatchResponseSuccess;
export type UpdateBatchResponse204 = {
  data: void;
  status: 204;
};

export type UpdateBatchResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type UpdateBatchResponseSuccess =
  UpdateBatchResponse204 | UpdateBatchResponse207;

export type UpdateBatchResponse = UpdateBatchResponseSuccess;
export type DeleteBatchResponse204 = {
  data: void;
  status: 204;
};

export type DeleteBatchResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type DeleteBatchResponseSuccess =
  DeleteBatchResponse204 | DeleteBatchResponse207;

export type DeleteBatchResponse = DeleteBatchResponseSuccess;
export type MergeBatchResponse204 = {
  data: void;
  status: 204;
};

export type MergeBatchResponse207 = {
  data: MultiStatusBatchOperationResultResponse;
  status: 207;
};

export type MergeBatchResponseSuccess =
  MergeBatchResponse204 | MergeBatchResponse207;

export type MergeBatchResponse = MergeBatchResponseSuccess;
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

export type UpsertTemporalResponseSuccess =
  UpsertTemporalResponse201 | UpsertTemporalResponse204;

export type UpsertTemporalResponse = UpsertTemporalResponseSuccess;
export type RetrieveEntityTypesResponse200 = {
  data: RetrieveEntityTypes200;
  status: 200;
};

export type RetrieveEntityTypesResponseSuccess = RetrieveEntityTypesResponse200;

export type RetrieveEntityTypesResponse = RetrieveEntityTypesResponseSuccess;
export type RetrieveEntityTypeInfoResponse200 = {
  data: WithContext<EntityTypeInfo>;
  status: 200;
};

export type RetrieveEntityTypeInfoResponseSuccess =
  RetrieveEntityTypeInfoResponse200;

export type RetrieveEntityTypeInfoResponse =
  RetrieveEntityTypeInfoResponseSuccess;
export type RetrieveAttrTypesResponse200 = {
  data: RetrieveAttrTypes200;
  status: 200;
};

export type RetrieveAttrTypesResponseSuccess = RetrieveAttrTypesResponse200;

export type RetrieveAttrTypesResponse = RetrieveAttrTypesResponseSuccess;
export type RetrieveAttrTypeInfoResponse200 = {
  data: WithContext<Attribute>;
  status: 200;
};

export type RetrieveAttrTypeInfoResponseSuccess =
  RetrieveAttrTypeInfoResponse200;

export type RetrieveAttrTypeInfoResponse = RetrieveAttrTypeInfoResponseSuccess;
export type CreateContextResponse201 = {
  data: void;
  status: 201;
  /** URI of the created @context from the Location header. */
  location: string;
};

export type CreateContextResponseSuccess = CreateContextResponse201;

export type CreateContextResponse = CreateContextResponseSuccess;
export type ListContextsResponse200 = {
  data: string[] | LdContextMetadata[];
  status: 200;
};

export type ListContextsResponseSuccess = ListContextsResponse200;

export type ListContextsResponse = ListContextsResponseSuccess;
export type RetrieveContextResponse200 = {
  data: RetrieveContext200;
  status: 200;
};

export type RetrieveContextResponseSuccess = RetrieveContextResponse200;

export type RetrieveContextResponse = RetrieveContextResponseSuccess;
export type DeleteContextResponse204 = {
  data: void;
  status: 204;
};

export type DeleteContextResponseSuccess = DeleteContextResponse204;

export type DeleteContextResponse = DeleteContextResponseSuccess;
export type RetrieveEntityMapResponse200 = {
  data: MaybeContext<EntityMap>;
  status: 200;
};

export type RetrieveEntityMapResponseSuccess = RetrieveEntityMapResponse200;

export type RetrieveEntityMapResponse = RetrieveEntityMapResponseSuccess;
export type UpdateEntityMapResponse204 = {
  data: void;
  status: 204;
};

export type UpdateEntityMapResponseSuccess = UpdateEntityMapResponse204;

export type UpdateEntityMapResponse = UpdateEntityMapResponseSuccess;
export type DeleteEntityMapResponse204 = {
  data: void;
  status: 204;
};

export type DeleteEntityMapResponseSuccess = DeleteEntityMapResponse204;

export type DeleteEntityMapResponse = DeleteEntityMapResponseSuccess;
export type RetrieveCSIdentityInfoResponse200 = {
  data: MaybeContext<ContextSourceIdentity>;
  status: 200;
};

export type RetrieveCSIdentityInfoResponseSuccess =
  RetrieveCSIdentityInfoResponse200;

export type RetrieveCSIdentityInfoResponse =
  RetrieveCSIdentityInfoResponseSuccess;
