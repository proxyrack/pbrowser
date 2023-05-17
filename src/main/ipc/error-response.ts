import { BadRequestError } from '../../shared/errors/bad-request-error';
import { ErrorReason } from '../../shared/errors/error-reason';

export class ErrorResponse {
  public error;

  constructor(message: string, reason: ErrorReason, propName: string) {
    this.error = {
      message,
      reason,
      propName,
    };
  }

  public static fromError(error: BadRequestError): ErrorResponse {
    return new ErrorResponse(error.message, error?.reason, error?.propName);
  }
}
