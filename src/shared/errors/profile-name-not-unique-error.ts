import { BadRequestError } from './bad-request-error';
import { ErrorReason } from './error-reason';

export class ProfileNameNotUniqueError extends BadRequestError {
  constructor() {
    super('Profile name should be unique', ErrorReason.NotUnique, 'name');
  }
}
