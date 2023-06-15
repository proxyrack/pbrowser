import { BadRequestError } from './bad-request-error';
import { ErrorReason } from './error-reason';

export class ProfileNotFoundError extends BadRequestError {
  constructor() {
    super('Profile not found', ErrorReason.NotFound, 'id');
  }
}
