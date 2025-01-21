"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
const axiosInstance = axios_1.default.create({
    baseURL: config_1.CONFIG.AXIOS.URL,
    timeout: Number(config_1.CONFIG.AXIOS.TIMEOUT),
    headers: {
        'Content-Type': 'application/json',
    },
});
exports.axiosInstance = axiosInstance;
//# sourceMappingURL=axios.js.map