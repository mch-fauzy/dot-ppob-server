"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPlaceholderPostController = void 0;
const http_status_codes_1 = require("http-status-codes");
const json_placeholder_post_service_1 = require("../../services/externals/json-placeholder-post-service");
const response_1 = require("../../utils/response");
const json_placeholder_post_dto_1 = require("../../models/dto/externals/json-placeholder-post-dto");
class JsonPlaceholderPostController {
    static getList = async (req, res, next) => {
        try {
            const response = await json_placeholder_post_service_1.JsonPlaceholderPostService.getList();
            (0, response_1.responseWithData)(res, http_status_codes_1.StatusCodes.OK, response.data);
        }
        catch (error) {
            next(error);
        }
    };
    static getById = async (req, res, next) => {
        try {
            const request = {
                id: Number(req.params.id),
            };
            const validatedRequest = await json_placeholder_post_dto_1.JsonPlaceholderPostValidator.validateByIdRequest(request);
            const response = await json_placeholder_post_service_1.JsonPlaceholderPostService.getById({
                id: validatedRequest.id,
            });
            (0, response_1.responseWithData)(res, http_status_codes_1.StatusCodes.OK, response.data);
        }
        catch (error) {
            next(error);
        }
    };
    static create = async (req, res, next) => {
        try {
            const request = {
                title: req.body.title,
                body: req.body.body,
                userId: req.body.userId,
            };
            const validatedRequest = await json_placeholder_post_dto_1.JsonPlaceholderPostValidator.validateCreateRequest(request);
            const response = await json_placeholder_post_service_1.JsonPlaceholderPostService.create({
                title: validatedRequest.title,
                body: validatedRequest.body,
                userId: validatedRequest.userId,
            });
            (0, response_1.responseWithData)(res, http_status_codes_1.StatusCodes.OK, response.data);
        }
        catch (error) {
            next(error);
        }
    };
    static updateById = async (req, res, next) => {
        try {
            const request = {
                id: Number(req.params.id),
                title: req.body.title,
                body: req.body.body,
                userId: req.body.userId,
            };
            const validatedRequest = await json_placeholder_post_dto_1.JsonPlaceholderPostValidator.validateUpdateByIdRequest(request);
            const response = await json_placeholder_post_service_1.JsonPlaceholderPostService.updateById({
                id: validatedRequest.id,
                title: validatedRequest.title,
                body: validatedRequest.body,
                userId: validatedRequest.userId,
            });
            (0, response_1.responseWithData)(res, http_status_codes_1.StatusCodes.OK, response.data);
        }
        catch (error) {
            next(error);
        }
    };
    static partialUpdateById = async (req, res, next) => {
        try {
            const request = {
                id: Number(req.params.id),
                title: req.body.title,
                body: req.body.body,
                userId: req.body.userId,
            };
            const validatedRequest = await json_placeholder_post_dto_1.JsonPlaceholderPostValidator.validatePartialUpdateByIdRequest(request);
            const response = await json_placeholder_post_service_1.JsonPlaceholderPostService.partialUpdateById({
                id: validatedRequest.id,
                title: validatedRequest.title,
                body: validatedRequest.body,
                userId: validatedRequest.userId,
            });
            (0, response_1.responseWithData)(res, http_status_codes_1.StatusCodes.OK, response.data);
        }
        catch (error) {
            next(error);
        }
    };
    static deleteById = async (req, res, next) => {
        try {
            const request = {
                id: Number(req.params.id),
            };
            const validatedRequest = await json_placeholder_post_dto_1.JsonPlaceholderPostValidator.validateByIdRequest(request);
            const response = await json_placeholder_post_service_1.JsonPlaceholderPostService.deleteById({
                id: validatedRequest.id,
            });
            (0, response_1.responseWithMessage)(res, http_status_codes_1.StatusCodes.OK, response);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.JsonPlaceholderPostController = JsonPlaceholderPostController;
//# sourceMappingURL=json-placeholder-post-controller.js.map