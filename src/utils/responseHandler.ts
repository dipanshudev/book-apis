import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  validationErrors?: Record<string, string[]>;
}

export function sendApiResponse<T = any>(
  res: Response,
  statusCode: StatusCodes,
  data?: T,
  message?: string,
  error?: string,
  validationErrors?: Record<string, string[]>
): void {
  const response: ApiResponse<T> = {
    success: statusCode >= 200 && statusCode < 400,
  };

  if (message) {
    response.message = message;
  }

  if (data) {
    response.data = data;
  }

  if (error) {
    response.error = error;
  }

  if (validationErrors) {
    response.validationErrors = validationErrors;
  }

  res.status(statusCode).json(response);
}
