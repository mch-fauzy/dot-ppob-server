"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Failure = void 0;
const http_status_codes_1 = require("http-status-codes");
class Failure extends Error {
    // Custom properties
    code;
    constructor(message, code) {
        super(message); // Call the constructor of its parent class to access the parent's properties and methods
        this.code = code;
        this.name = 'Failure';
        // Showing only the relevant function calls leading to the error
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Failure);
        }
    }
    static notFound = (message) => {
        return new Failure(message, http_status_codes_1.StatusCodes.NOT_FOUND);
    };
    static unauthorized = (message) => {
        return new Failure(message, http_status_codes_1.StatusCodes.UNAUTHORIZED);
    };
    static forbidden = (message) => {
        return new Failure(message, http_status_codes_1.StatusCodes.FORBIDDEN);
    };
    static internalServer = (message) => {
        return new Failure(message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    };
    static badRequest = (message) => {
        return new Failure(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    };
    static conflict = (message) => {
        return new Failure(message, http_status_codes_1.StatusCodes.CONFLICT);
    };
}
exports.Failure = Failure;
//# sourceMappingURL=failure.js.map