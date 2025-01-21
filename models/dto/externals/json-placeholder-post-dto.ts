import Joi from 'joi';

interface JsonPlaceholderPostByIdRequest {
  id: number;
}

interface JsonPlaceholderPostCreateRequest {
  title: string;
  body: string;
  userId: number;
}

interface JsonPlaceholderPostUpdateByIdRequest
  extends JsonPlaceholderPostByIdRequest {
  title: string;
  body: string;
  userId: number;
}

export interface JsonPlaceholderPostPartialUpdateByIdRequest
  extends JsonPlaceholderPostByIdRequest {
  title?: string;
  body?: string;
  userId?: number;
}

class JsonPlaceholderPostValidator {
  private static byIdRequestValidator = Joi.object({
    id: Joi.number().required(),
  });

  static validateByIdRequest = async (
    req: JsonPlaceholderPostByIdRequest,
  ): Promise<JsonPlaceholderPostByIdRequest> => {
    return await this.byIdRequestValidator.validateAsync(req);
  };

  private static createRequestValidator = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    userId: Joi.number().min(1).required(),
  });

  static validateCreateRequest = async (
    req: JsonPlaceholderPostCreateRequest,
  ): Promise<JsonPlaceholderPostCreateRequest> => {
    return await this.createRequestValidator.validateAsync(req);
  };

  private static updateByIdRequestValidator = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    userId: Joi.number().min(1).required(),
  });

  static validateUpdateByIdRequest = async (
    req: JsonPlaceholderPostUpdateByIdRequest,
  ): Promise<JsonPlaceholderPostUpdateByIdRequest> => {
    return await this.updateByIdRequestValidator.validateAsync(req);
  };

  private static partialUpdateByIdRequestValidator = Joi.object({
    id: Joi.number().optional(),
    title: Joi.string().optional(),
    body: Joi.string().optional(),
    userId: Joi.number().min(1).optional(),
  }).or('title', 'body', 'userId');

  static validatePartialUpdateByIdRequest = async (
    req: JsonPlaceholderPostPartialUpdateByIdRequest,
  ): Promise<JsonPlaceholderPostPartialUpdateByIdRequest> => {
    return await this.partialUpdateByIdRequestValidator.validateAsync(req);
  };
}

export {
  JsonPlaceholderPostValidator,
  JsonPlaceholderPostByIdRequest,
  JsonPlaceholderPostCreateRequest,
  JsonPlaceholderPostUpdateByIdRequest,
};
