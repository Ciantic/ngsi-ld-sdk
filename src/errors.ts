import type { ProblemDetails } from "./api/schemas";

/**
 * Base error for all NGSI-LD HTTP errors (non-2xx responses).
 *
 * Wraps the RFC 7807 {@link ProblemDetails} body returned by the broker,
 * along with the HTTP status code and the original {@link Response}.
 */
export class NgsiLdHttpError extends Error {
  /** HTTP status code. */
  readonly status: number;
  /** Parsed RFC 7807 ProblemDetails body. */
  readonly body: ProblemDetails;
  /** The original fetch {@link Response} object. */
  readonly response: Response;

  constructor(status: number, body: ProblemDetails, response: Response) {
    const detail = body.detail ?? body.title ?? JSON.stringify(body);
    super(`NGSI-LD ${status}: ${detail}`);
    this.name = "NgsiLdHttpError";
    this.status = status;
    this.body = body;
    this.response = response;
  }
}

/** 400 Bad Request — the request or its content is incorrect. */
export class NgsiLdBadRequest extends NgsiLdHttpError {
  constructor(body: ProblemDetails, response: Response) {
    super(400, body, response);
    this.name = "NgsiLdBadRequest";
  }
}

/** 404 Not Found — the requested resource (entity, subscription, etc.) does not exist. */
export class NgsiLdNotFound extends NgsiLdHttpError {
  constructor(body: ProblemDetails, response: Response) {
    super(404, body, response);
    this.name = "NgsiLdNotFound";
  }
}

/** 409 Conflict — the resource already exists or there is a registration conflict. */
export class NgsiLdConflict extends NgsiLdHttpError {
  constructor(body: ProblemDetails, response: Response) {
    super(409, body, response);
    this.name = "NgsiLdConflict";
  }
}

/** 422 Unprocessable Entity — the operation is not available or the request is semantically invalid. */
export class NgsiLdUnprocessable extends NgsiLdHttpError {
  constructor(body: ProblemDetails, response: Response) {
    super(422, body, response);
    this.name = "NgsiLdUnprocessable";
  }
}

/** 500 Internal Server Error — an unexpected error occurred on the broker. */
export class NgsiLdInternalServerError extends NgsiLdHttpError {
  constructor(body: ProblemDetails, response: Response) {
    super(500, body, response);
    this.name = "NgsiLdInternalServerError";
  }
}

/** 501 Not Implemented — the operation is not supported by this broker. */
export class NgsiLdNotImplemented extends NgsiLdHttpError {
  constructor(body: ProblemDetails, response: Response) {
    super(501, body, response);
    this.name = "NgsiLdNotImplemented";
  }
}

/** 504 Gateway Timeout — a distributed operation or context re-download timed out. */
export class NgsiLdGatewayTimeout extends NgsiLdHttpError {
  constructor(body: ProblemDetails, response: Response) {
    super(504, body, response);
    this.name = "NgsiLdGatewayTimeout";
  }
}

/**
 * Map from HTTP status code to the appropriate error class.
 * Extend this with additional status codes as needed.
 */
export const NGSILD_STATUS_TO_ERROR: Record<
  number,
  new (body: ProblemDetails, response: Response) => NgsiLdHttpError
> = {
  400: NgsiLdBadRequest,
  404: NgsiLdNotFound,
  409: NgsiLdConflict,
  422: NgsiLdUnprocessable,
  500: NgsiLdInternalServerError,
  501: NgsiLdNotImplemented,
  504: NgsiLdGatewayTimeout,
};
