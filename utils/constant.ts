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
    IMAGE_SIZE_LIMIT: 2 * 1024 * 1024, // 2MB file size limit mb = bytes * bytes
    IMAGE_FIELD_NAME: 'image', // Field named 'image' is expected in the request
    ALLOWED_IMAGE_FORMATS: ['image/jpeg', 'image/png'] as string[],
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
    CACHE_EXPIRY: 60 * 60, // In seconds
    TRANSACTION_KEY: 'transaction',
    TRANSACTION_SET_KEY: 'transaction_set',
    MEMBERSHIP_KEY: 'membership',
  },
} as const;

export {CONSTANT};
