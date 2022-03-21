import { registerAs } from '@nestjs/config';
import { RedisServiceProvider } from 'src/service/redis/redis.enum';
import { IRedisConfig } from 'src/service/redis/redis.interface';

export const redisConfig = registerAs(
    RedisServiceProvider.Redis,
    (): IRedisConfig => ({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
    })
);
