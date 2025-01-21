import Redis from 'ioredis';

import {CONFIG} from './config';
import {handleError} from '../utils/error-handler';

// ! is Non-null assertion operator
const redis = new Redis(CONFIG.REDIS.URL!, {
  maxRetriesPerRequest: 5,
});

redis.on('error', error => {
  throw handleError({
    operationName: 'redis',
    error,
  });
});

export {redis};
