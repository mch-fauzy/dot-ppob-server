declare const CONSTANT: {
    readonly JWT: {
        readonly EXPIRATION_TIME: number;
    };
    readonly LOCAL: {
        readonly EMAIL: "email";
        readonly IAT: "iat";
        readonly EXP: "exp";
    };
    readonly QUERY: {
        readonly DEFAULT_PAGE: 1;
        readonly DEFAULT_PAGE_SIZE: 10;
        readonly DEFAULT_ORDER: "desc";
    };
    readonly MULTER: {
        readonly IMAGE_SIZE_LIMIT: number;
        readonly IMAGE_FIELD_NAME: "image";
        readonly ALLOWED_IMAGE_FORMATS: string[];
    };
    readonly REGEX: {
        readonly NOT_ALPHANUMERIC: RegExp;
        readonly NEW_LINE: RegExp;
    };
    readonly ERROR_MESSAGE: {
        readonly UNKNOWN: "Unknown error occurs while processing the request";
        readonly UNRECOGNIZED: "Unrecognized error occurs while processing the request";
    };
    readonly REDIS: {
        readonly CACHE_EXPIRY: number;
        readonly TRANSACTION_KEY: "transaction";
        readonly TRANSACTION_SET_KEY: "transaction_set";
        readonly MEMBERSHIP_KEY: "membership";
    };
};
export { CONSTANT };
