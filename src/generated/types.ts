import type {
  MultiStatusBatchOperationResultResponse,
  MultiStatusUpdateResultResponse,
} from "./schemas";

export type NonReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};

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
