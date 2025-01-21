"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANT = void 0;
const CONSTANT = {
    JWT: {
        EXPIRATION_TIME: 60 * 60 * 12, // Token expiration time in seconds (12 hours)
    },
    LOCAL: {
        EMAIL: 'email',
        IAT: 'iat',
        EXP: 'exp',
    },
    QUERY: {
        DEFAULT_PAGE: 1,
        DEFAULT_PAGE_SIZE: 10,
        DEFAULT_ORDER: 'desc',
    },
    MULTER: {
        IMAGE_SIZE_LIMIT: 2 * 1024 * 1024,
        IMAGE_FIELD_NAME: 'image',
        ALLOWED_IMAGE_FORMATS: ['image/jpeg', 'image/png'],
    },
    REGEX: {
        NOT_ALPHANUMERIC: /[^a-zA-Z0-9]/g,
        NEW_LINE: /[\n]+/g,
    },
    ERROR_MESSAGE: {
        UNKNOWN: 'Unknown error occurs while processing the request',
        UNRECOGNIZED: 'Unrecognized error occurs while processing the request',
    },
    REDIS: {
        CACHE_EXPIRY: 60 * 60,
        TRANSACTION_KEY: 'transaction',
        TRANSACTION_SET_KEY: 'transaction_set',
        MEMBERSHIP_KEY: 'membership',
    },
};
exports.CONSTANT = CONSTANT;
//# sourceMappingURL=constant.js.map