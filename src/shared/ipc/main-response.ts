import { BadRequestError } from 'shared/errors/bad-request-error';
import { MainError } from './main-error';

export class MainResponse<TData = {}> {
  success: boolean;
  data: TData | null;
  error: MainError | null;

  private constructor(data: TData | null, error: MainError | null = null) {
    this.success = error === null;
    this.data = data;
    this.error = error;
  }

  public static success<TData = {}>(data: TData | null = null): MainResponse<TData> {
    return new MainResponse<TData>(data);
  }

  public static error(error: Error | MainError): MainResponse<null> {
    if (error instanceof BadRequestError) {
      const errorDetails = new MainError(error.message, error?.reason, error?.propName);
      return new MainResponse<null>(null, errorDetails);
    }
    if (error instanceof Error) {
      const errorDetails = new MainError(error.message);
      return new MainResponse<null>(null, errorDetails);
    }

    return new MainResponse<null>(null, error);
  }
}
