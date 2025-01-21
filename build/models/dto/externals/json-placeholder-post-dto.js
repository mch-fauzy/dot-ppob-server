"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPlaceholderPostValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class JsonPlaceholderPostValidator {
    static byIdRequestValidator = joi_1.default.object({
        id: joi_1.default.number().required(),
    });
    static validateByIdRequest = async (req) => {
        return await this.byIdRequestValidator.validateAsync(req);
    };
    static createRequestValidator = joi_1.default.object({
        title: joi_1.default.string().required(),
        body: joi_1.default.string().required(),
        userId: joi_1.default.number().min(1).required(),
    });
    static validateCreateRequest = async (req) => {
        return await this.createRequestValidator.validateAsync(req);
    };
    static updateByIdRequestValidator = joi_1.default.object({
        id: joi_1.default.number().required(),
        title: joi_1.default.string().required(),
        body: joi_1.default.string().required(),
        userId: joi_1.default.number().min(1).required(),
    });
    static validateUpdateByIdRequest = async (req) => {
        return await this.updateByIdRequestValidator.validateAsync(req);
    };
    static partialUpdateByIdRequestValidator = joi_1.default.object({
        id: joi_1.default.number().optional(),
        title: joi_1.default.string().optional(),
        body: joi_1.default.string().optional(),
        userId: joi_1.default.number().min(1).optional(),
    }).or('title', 'body', 'userId');
    static validatePartialUpdateByIdRequest = async (req) => {
        return await this.partialUpdateByIdRequestValidator.validateAsync(req);
    };
}
exports.JsonPlaceholderPostValidator = JsonPlaceholderPostValidator;
//# sourceMappingURL=json-placeholder-post-dto.js.map