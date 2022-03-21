import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisServiceProvider } from './redis.enum';
import { IRedisConfig } from './redis.interface';
import { RedisService } from './redis.service';

@Module({
    providers: [
        {
            provide: RedisServiceProvider.Redis,
            useClass: RedisService,
        },
        {
            provide: RedisServiceProvider.RedisConfig,
            inject: [ConfigService],
            useFactory: (configService: ConfigService): IRedisConfig => {
                return configService.get<IRedisConfig>(RedisServiceProvider.Redis);
            },
        },
    ],
    exports: [RedisServiceProvider.Redis],
})
export class RedisModule {}
