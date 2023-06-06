import { ErrorReason } from './error-reason';

export class BadRequestError extends Error {
  reason: ErrorReason;

  propName: string;

  constructor(message: string, reason: ErrorReason, propName: string) {
    super(message);
    this.reason = reason;
    this.propName = propName;
  }
}
