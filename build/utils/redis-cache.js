"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisUtils = void 0;
const redis_1 = require("../configs/redis");
const crypto_1 = require("crypto");
class RedisUtils {
    // Generate a hashed key
    static generateHashedCacheKey = (keyIdentifier, data) => {
        return `${keyIdentifier}:${(0, crypto_1.createHash)('md5').update(JSON.stringify(data)).digest('hex')}`;
    };
    // Retrieve cached data
    static getCacheByKey = async (key) => {
        const cacheData = await redis_1.redis.get(key);
        return cacheData;
    };
    // Store the cache data
    static storeCacheWithExpiry = async (key, expiry, data) => {
        await redis_1.redis.setex(key, expiry, data);
    };
    // Delete a single cache (used for operations like getProductById)
    static deleteCacheByKey = async (key) => {
        await redis_1.redis.del(key);
    };
    /* Used for operations related for complex key like getAllProducts, getProductsByFilter */
    // Add the stored cache in a Redis set for easy invalidation (THIS IS NOT STORE THE CACHE DATA)
    static addCacheToSet = async (setKey, key) => {
        await redis_1.redis.sadd(setKey, key);
    };
    // Delete all cache related to set
    static deleteCacheFromSet = async (setKey) => {
        const keys = await redis_1.redis.smembers(setKey);
        if (keys && keys.length > 0) {
            await Promise.all([
                // Delete all cache related to set
                redis_1.redis.del(...keys),
                // Clear the tracking set/set
                redis_1.redis.del(setKey),
            ]);
        }
    };
}
exports.RedisUtils = RedisUtils;
//# sourceMappingURL=redis-cache.js.map