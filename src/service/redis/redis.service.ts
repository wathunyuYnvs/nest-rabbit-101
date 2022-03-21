import { Inject, Injectable, Logger } from '@nestjs/common';
import { createClient } from 'redis';
import { inspect, promisify } from 'util';
import { RedisServiceProvider } from './redis.enum';
import { IRedisConfig, IRedisService } from './redis.interface';

@Injectable()
export class RedisService implements IRedisService {
    private readonly logger = new Logger('RedisService');
    private client;

    constructor(
        @Inject(RedisServiceProvider.RedisConfig)
        private readonly redisConfig: IRedisConfig
    ) {
        this.client = createClient({
            url: `redis://${this.redisConfig.host}:${this.redisConfig.port}`,
        });
        this.client.connect();
        const logger = this.logger;
        this.client.on('ready', function () {
            logger.debug('ready');
        });
        this.client.on('connect', function () {
            logger.debug('connected');
        });
        this.client.on('reconnecting', function () {
            logger.debug('reconnecting');
        });
        this.client.on('error', function (error) {
            logger.error(error);
        });
        this.client.on('end', function () {
            logger.debug('end');
        });
    }

    async getAsync(key: string): Promise<string> {
        const get = promisify(this.client.get).bind(this.client);
        const res = await get(key);
        if (res) {
            this.logger.debug(
                `GET ${key} :: ${inspect(res, {
                    depth: null,
                    colors: true,
                    compact: false,
                })}`
            );
        } else {
            this.logger.debug(`GET ${key} :: null`);
        }
        return res;
    }

    async setAsync(key: string, value: string): Promise<void> {
        const keyArr = key.split('/');
        const source = keyArr[0];
        const id = keyArr[1];
        const set = promisify(this.client.set).bind(this.client);
        if (id) {
            await set(`${source}/${id}`, value);
            this.logger.debug(
                `SET ${source}/${id} :: ${inspect(value, {
                    depth: null,
                    colors: true,
                    compact: false,
                })}`
            );
        } else {
            await set(`${source}`, value);
            this.logger.debug(
                `SET ${source} :: ${inspect(value, {
                    depth: null,
                    colors: true,
                    compact: false,
                })}`
            );
        }
    }

    async delAsync(key: string): Promise<void> {
        const keyArr = key.split('/');
        const source = keyArr[0];
        const id = keyArr[1];
        const del = promisify(this.client.del).bind(this.client);
        await del(`${source}/${id}`);
        if (id) {
            await del(`${source}/${id}`);
            this.logger.debug(`DEL ${source}/${id}`);
        } else {
            await del(`${source}`);
            this.logger.debug(`DEL ${source}`);
        }
    }
}
