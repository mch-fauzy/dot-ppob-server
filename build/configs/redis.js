"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = require("./config");
const error_handler_1 = require("../utils/error-handler");
// ! is Non-null assertion operator
const redis = new ioredis_1.default(config_1.CONFIG.REDIS.URL, {
    maxRetriesPerRequest: 5,
});
exports.redis = redis;
redis.on('error', error => {
    throw (0, error_handler_1.handleError)({
        operationName: 'redis',
        error,
    });
});
//# sourceMappingURL=redis.js.map