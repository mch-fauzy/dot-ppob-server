import {Request, Response, NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';

import {MembershipService} from '../services/membership-service';
import {
  MembershipGetByEmailRequest,
  MembershipLoginRequest,
  MembershipRegisterRequest,
  MembershipUpdateProfileByEmailRequest,
  MembershipUpdateProfileImageByEmailRequest,
  MembershipUpdateProfileImageCloudinaryByEmailRequest,
  MembershipValidator,
} from '../models/dto/membership-dto';
import {CONSTANT} from '../utils/constant';
import {
  responseWithData,
  responseWithMessage,
  responseWithMetadata,
} from '../utils/response';
import {CONFIG} from '../configs/config';
import {Failure} from '../utils/failure';
import {AuthMiddleware} from '../middlewares/auth-middleware';
import {MulterMiddleware} from '../middlewares/multer-middleware';

class MembershipController {
  static register = async (
    {body}: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const request: MembershipRegisterRequest = {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
      };
      const validatedRequest =
        await MembershipValidator.validateRegisterRequest(request);

      const response = await MembershipService.register({
        email: validatedRequest.email,
        firstName: validatedRequest.firstName,
        lastName: validatedRequest.lastName,
        password: validatedRequest.password,
      });

      responseWithMessage(res, StatusCodes.OK, response);
    } catch (error) {
      next(error);
    }
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: MembershipLoginRequest = {
        email: req.body.email,
        password: req.body.password,
      };
      const validatedRequest =
        await MembershipValidator.validateLoginRequest(request);

      const response = await MembershipService.login({
        email: validatedRequest.email,
        password: validatedRequest.password,
      });

      responseWithData(res, StatusCodes.OK, response);
    } catch (error) {
      next(error);
    }
  };

  static getProfileForCurrentUser = [
    AuthMiddleware.authenticateToken,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const request: MembershipGetByEmailRequest = {
          email: req.res?.locals[CONSTANT.LOCAL.EMAIL],
        };
        const validatedRequest =
          await MembershipValidator.validateGetByEmailRequest(request);

        const response = await MembershipService.getByEmail({
          email: validatedRequest.email,
        });

        responseWithMetadata(
          res,
          StatusCodes.OK,
          response.data,
          response.metadata,
        );
      } catch (error) {
        next(error);
      }
    },
  ];

  static updateProfileForCurrentUser = [
    AuthMiddleware.authenticateToken,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const request: MembershipUpdateProfileByEmailRequest = {
          email: req.res?.locals[CONSTANT.LOCAL.EMAIL],
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        };
        const validatedRequest =
          await MembershipValidator.validateUpdateProfileByEmailRequest(
            request,
          );

        const response = await MembershipService.updateProfileByEmail({
          email: validatedRequest.email,
          firstName: validatedRequest.firstName,
          lastName: validatedRequest.lastName,
        });

        responseWithMessage(res, StatusCodes.OK, response);
      } catch (error) {
        next(error);
      }
    },
  ];

  static updateProfileImageForCurrentUser = [
    AuthMiddleware.authenticateToken,
    MulterMiddleware.saveProfileImageToLocal,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.file) throw Failure.badRequest('File is not found');

        const request: MembershipUpdateProfileImageByEmailRequest = {
          email: req.res?.locals[CONSTANT.LOCAL.EMAIL],
          imageUrl: `${CONFIG.APP.IMAGE_STATIC_URL}/${req.file.filename}`,
        };
        const validatedRequest =
          await MembershipValidator.validateUpdateProfileImageByEmailRequest(
            request,
          );

        const response = await MembershipService.updateProfileImageByEmail({
          email: validatedRequest.email,
          imageUrl: validatedRequest.imageUrl,
        });

        responseWithMessage(res, StatusCodes.OK, response);
      } catch (error) {
        next(error);
      }
    },
  ];

  static updateProfileImageCloudinaryForCurrentUser = [
    AuthMiddleware.authenticateToken,
    MulterMiddleware.uploadProfileImageToCloud,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.file) throw Failure.badRequest('File is not found');

        const request: MembershipUpdateProfileImageCloudinaryByEmailRequest = {
          email: req.res?.locals[CONSTANT.LOCAL.EMAIL],
          fileName: req.file.filename,
          buffer: req.file.buffer,
          mimeType: req.file.mimetype,
        };
        const validatedRequest =
          await MembershipValidator.validateUpdateProfileImageCloudinaryByEmailRequest(
            request,
          );

        const response =
          await MembershipService.updateProfileImageCloudinaryByEmail({
            email: validatedRequest.email,
            fileName: validatedRequest.fileName,
            buffer: validatedRequest.buffer,
            mimeType: validatedRequest.mimeType,
          });

        responseWithMessage(res, StatusCodes.OK, response);
      } catch (error) {
        next(error);
      }
    },
  ];
}

export {MembershipController};
