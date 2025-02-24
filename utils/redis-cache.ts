import {redis} from '../configs/redis';

import {createHash} from 'crypto';

class RedisUtils {
  // Generate a hashed key
  static generateHashedCacheKey = (
    keyIdentifier: string,
    data: string | object,
  ) => {
    return `${keyIdentifier}:${createHash('md5').update(JSON.stringify(data)).digest('hex')}`;
  };

  // Retrieve cached data
  static getCacheByKey = async (key: string) => {
    const cacheData = await redis.get(key);
    return cacheData;
  };

  // Store the cache data
  static storeCacheWithExpiry = async (
    key: string,
    expiry: number,
    data: string,
  ) => {
    await redis.setex(key, expiry, data);
  };

  // Delete a single cache (used for operations like getProductById)
  static deleteCacheByKey = async (key: string) => {
    await redis.del(key);
  };

  /* Used for operations related for complex key like getAllProducts, getProductsByFilter */
  // Add the stored cache in a Redis set for easy invalidation (THIS IS NOT STORE THE CACHE DATA)
  static addCacheToSet = async (setKey: string, key: string) => {
    await redis.sadd(setKey, key);
  };

  // Delete all cache related to set
  static deleteCacheFromSet = async (setKey: string) => {
    const keys = await redis.smembers(setKey);
    if (keys && keys.length > 0) {
      await Promise.all([
        // Delete all cache related to set
        redis.del(...keys),

        // Clear the tracking set/set
        redis.del(setKey),
      ]);
    }
  };
}

export {RedisUtils};
