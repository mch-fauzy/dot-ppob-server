import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

import {Failure} from '../utils/failure';
import {responseWithMessage} from '../utils/response';
import {CONSTANT} from '../utils/constant';
import {logUnknownError} from '../utils/logger';

class ErrorResponseMiddleware {
  // NextFunction must be included to make error response handler middleware to work properly
  static handler = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // Response with known errors
    if (error instanceof Failure && error.name === 'Failure') {
      responseWithMessage(res, error.code, error.message);
      return;
    }

    // Response with validation errors for Joi validator
    if (error instanceof Error && error.name === 'ValidationError') {
      responseWithMessage(res, StatusCodes.BAD_REQUEST, error.message);
      return;
    }

    // Response with unknown errors
    logUnknownError({
      message: CONSTANT.ERROR_MESSAGE.UNKNOWN,
      operationName: 'errorApiResponseHandler',
      error: error,
    });

    responseWithMessage(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      CONSTANT.ERROR_MESSAGE.UNKNOWN,
    );
    next();
  };
}

export {ErrorResponseMiddleware};
