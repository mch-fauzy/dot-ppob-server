declare class RedisUtils {
    static generateHashedCacheKey: (keyIdentifier: string, data: string | object) => string;
    static getCacheByKey: (key: string) => Promise<string | null>;
    static storeCacheWithExpiry: (key: string, expiry: number, data: string) => Promise<void>;
    static deleteCacheByKey: (key: string) => Promise<void>;
    static addCacheToSet: (setKey: string, key: string) => Promise<void>;
    static deleteCacheFromSet: (setKey: string) => Promise<void>;
}
export { RedisUtils };
