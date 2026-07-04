import type {
  MultiStatusBatchOperationResultResponse,
  MultiStatusUpdateResultResponse,
} from "./schemas";

export type NonReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};

export type CreateEntityResponse =
  | {
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
      status: 204;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type MergeEntityResponse =
  | {
      status: 204;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type ReplaceEntityResponse =
  | {
      status: 204;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type AppendAttrsResponse =
  | {
      status: 204;
    }
  | {
      data: MultiStatusUpdateResultResponse;
      status: 207;
    };

export type UpdateEntityResponse =
  | {
      status: 204;
    }
  | {
      data: MultiStatusUpdateResultResponse;
      status: 207;
    };

export type UpdateAttrsResponse =
  | {
      status: 204;
    }
  | {
      data: MultiStatusUpdateResultResponse;
      status: 207;
    };

export type DeleteAttrsResponse =
  | {
      status: 204;
    }
  | {
      data: MultiStatusUpdateResultResponse;
      status: 207;
    };

export type ReplaceAttrsResponse =
  | {
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
      status: 204;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type DeleteBatchResponse =
  | {
      status: 204;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type MergeBatchResponse =
  | {
      status: 204;
    }
  | {
      data: MultiStatusBatchOperationResultResponse;
      status: 207;
    };

export type UpsertTemporalResponse =
  | {
      status: 201;
      /** URI of the created temporal entity from the Location header. */
      location: string;
    }
  | {
      status: 204;
    };
