"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPlaceholderPostService = void 0;
const axios_1 = require("../../configs/axios");
const error_handler_1 = require("../../utils/error-handler");
class JsonPlaceholderPostService {
    static getList = async () => {
        try {
            const response = await axios_1.axiosInstance.get('/posts');
            return response;
        }
        catch (error) {
            throw (0, error_handler_1.handleError)({
                operationName: 'JsonPlaceholderPostService.getList',
                error,
            });
        }
    };
    static getById = async (req) => {
        try {
            const response = await axios_1.axiosInstance.get(`/posts/${req.id}`);
            return response;
        }
        catch (error) {
            throw (0, error_handler_1.handleError)({
                operationName: 'JsonPlaceholderPostService.getById',
                error,
            });
        }
    };
    static create = async (req) => {
        try {
            const response = await axios_1.axiosInstance.post('/posts', req);
            return response;
        }
        catch (error) {
            throw (0, error_handler_1.handleError)({
                operationName: 'JsonPlaceholderPostService.create',
                error,
            });
        }
    };
    static updateById = async (req) => {
        try {
            const response = await axios_1.axiosInstance.put(`/posts/${req.id}`, {
                title: req.title,
                body: req.body,
                userId: req.userId,
            });
            return response;
        }
        catch (error) {
            throw (0, error_handler_1.handleError)({
                operationName: 'JsonPlaceholderPostService.updateById',
                error,
            });
        }
    };
    static partialUpdateById = async (req) => {
        try {
            const response = await axios_1.axiosInstance.patch(`/posts/${req.id}`, {
                title: req.title,
                body: req.body,
                userId: req.userId,
            });
            return response;
        }
        catch (error) {
            throw (0, error_handler_1.handleError)({
                operationName: 'JsonPlaceholderPostService.partialUpdateById',
                error,
            });
        }
    };
    static deleteById = async (req) => {
        try {
            await axios_1.axiosInstance.delete(`/posts/${req.id}`);
            return 'Success';
        }
        catch (error) {
            throw (0, error_handler_1.handleError)({
                operationName: 'JsonPlaceholderPostService.deleteById',
                error,
            });
        }
    };
}
exports.JsonPlaceholderPostService = JsonPlaceholderPostService;
//# sourceMappingURL=json-placeholder-post-service.js.map