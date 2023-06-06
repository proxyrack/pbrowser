import { ErrorReason } from 'shared/errors/error-reason';

export class MainError {
  message: string;
  reason: ErrorReason;
  propName: string | null;

  constructor(
    message: string,
    reason: ErrorReason = ErrorReason.NotSpecified,
    propName: string | null = null
  ) {
    this.message = message;
    this.reason = reason;
    this.propName = propName;
  }
}
