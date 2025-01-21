import {Request, Response, NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';

import {JsonPlaceholderPostService} from '../../services/externals/json-placeholder-post-service';
import {responseWithData, responseWithMessage} from '../../utils/response';
import {
  JsonPlaceholderPostCreateRequest,
  JsonPlaceholderPostByIdRequest,
  JsonPlaceholderPostPartialUpdateByIdRequest,
  JsonPlaceholderPostUpdateByIdRequest,
  JsonPlaceholderPostValidator,
} from '../../models/dto/externals/json-placeholder-post-dto';

class JsonPlaceholderPostController {
  static getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await JsonPlaceholderPostService.getList();
      responseWithData(res, StatusCodes.OK, response.data);
    } catch (error) {
      next(error);
    }
  };

  static getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: JsonPlaceholderPostByIdRequest = {
        id: Number(req.params.id),
      };
      const validatedRequest =
        await JsonPlaceholderPostValidator.validateByIdRequest(request);

      const response = await JsonPlaceholderPostService.getById({
        id: validatedRequest.id,
      });
      responseWithData(res, StatusCodes.OK, response.data);
    } catch (error) {
      next(error);
    }
  };

  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: JsonPlaceholderPostCreateRequest = {
        title: req.body.title,
        body: req.body.body,
        userId: req.body.userId,
      };
      const validatedRequest =
        await JsonPlaceholderPostValidator.validateCreateRequest(request);

      const response = await JsonPlaceholderPostService.create({
        title: validatedRequest.title,
        body: validatedRequest.body,
        userId: validatedRequest.userId,
      });
      responseWithData(res, StatusCodes.OK, response.data);
    } catch (error) {
      next(error);
    }
  };

  static updateById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const request: JsonPlaceholderPostUpdateByIdRequest = {
        id: Number(req.params.id),
        title: req.body.title,
        body: req.body.body,
        userId: req.body.userId,
      };
      const validatedRequest =
        await JsonPlaceholderPostValidator.validateUpdateByIdRequest(request);

      const response = await JsonPlaceholderPostService.updateById({
        id: validatedRequest.id,
        title: validatedRequest.title,
        body: validatedRequest.body,
        userId: validatedRequest.userId,
      });
      responseWithData(res, StatusCodes.OK, response.data);
    } catch (error) {
      next(error);
    }
  };

  static partialUpdateById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const request: JsonPlaceholderPostPartialUpdateByIdRequest = {
        id: Number(req.params.id),
        title: req.body.title,
        body: req.body.body,
        userId: req.body.userId,
      };
      const validatedRequest =
        await JsonPlaceholderPostValidator.validatePartialUpdateByIdRequest(
          request,
        );

      const response = await JsonPlaceholderPostService.partialUpdateById({
        id: validatedRequest.id,
        title: validatedRequest.title,
        body: validatedRequest.body,
        userId: validatedRequest.userId,
      });
      responseWithData(res, StatusCodes.OK, response.data);
    } catch (error) {
      next(error);
    }
  };

  static deleteById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const request: JsonPlaceholderPostByIdRequest = {
        id: Number(req.params.id),
      };
      const validatedRequest =
        await JsonPlaceholderPostValidator.validateByIdRequest(request);

      const response = await JsonPlaceholderPostService.deleteById({
        id: validatedRequest.id,
      });

      responseWithMessage(res, StatusCodes.OK, response);
    } catch (error) {
      next(error);
    }
  };
}

export {JsonPlaceholderPostController};
