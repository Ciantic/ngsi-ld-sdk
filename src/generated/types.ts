import type {
  MultiStatusBatchOperationResultResponse,
  MultiStatusUpdateResultResponse,
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

export type CreateEntityResponse =
  | {
      data: void;
      status: 201;
      /** URI of the created entity from the Location header. */
      location: string;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type DeleteEntityResponse =
  | {
      data: void;
      status: 204;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type MergeEntityResponse =
  | {
      data: void;
      status: 204;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type ReplaceEntityResponse =
  | {
      data: void;
      status: 204;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type AppendAttrsResponse =
  | {
      data: void;
      status: 204;
    }
  | {
      data: MultiStatusUpdateResultResponse;
      status: 207;
    };

export type UpdateEntityResponse =
  | {
      data: void;
      status: 204;
    }
  | {
      data: MultiStatusUpdateResultResponse;
      status: 207;
    };

export type UpdateAttrsResponse =
  | {
      data: void;
      status: 204;
    }
  | {
      data: MultiStatusUpdateResultResponse;
      status: 207;
    };

export type DeleteAttrsResponse =
  | {
      data: void;
      status: 204;
    }
  | {
      data: MultiStatusUpdateResultResponse;
      status: 207;
    };

export type ReplaceAttrsResponse =
  | {
      data: void;
      status: 204;
    }
  | {
      data: MultiStatusUpdateResultResponse;
      status: 207;
    };

export type CreateBatchResponse =
  | {
      data: string[];
      status: 201;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type UpsertBatchResponse =
  | {
      status: 201;
      location: string;
    }
  | {
      status: 204;
    }
  | {
      status: 207;
      data: MultiStatusBatchOperationResultResponse;
    };

export type UpdateBatchResponse =
  | {
      data: void;
      status: 204;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type DeleteBatchResponse =
  | {
      data: void;
      status: 204;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type MergeBatchResponse =
  | {
      data: void;
      status: 204;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type UpsertTemporalResponse =
  | {
      data: void;
      status: 201;
      /** URI of the created temporal entity from the Location header. */
      location: string;
    }
  | {
      data: void;
      status: 204;
    };
