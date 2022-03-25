// ======================================================================================
//                                      NODE PACKAGE
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
// ======================================================================================
//                                      COMMON
import { RequestContextService } from './common/custom/module/context/context.service';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';
import { RequestContextMiddleware } from './common/middleware/request-context';
import { WinstonCustomModule } from './common/custom/module/winston/winston.module';
// ======================================================================================
//                                      CONFIG
import { appConfig } from './config/app,config';
import { authConfig } from './config/auth.config';
import { databaseConfig } from './config/database.config';
import { redisConfig } from './config/redis.config';
// ======================================================================================
//                                      CONTROLLER
import { ExampleController } from './controller/example.controller';
// ======================================================================================
//                                      EVENT
import { EventsModule } from './event/events.module';
// ======================================================================================
//                                      MODULE
import { JwtAuthGuard } from './module/auth/guards/jwt-auth.guard';
import { ExampleModule } from './module/example/example.module';
// ======================================================================================
import { RedisModule } from './service/redis/redis.module';
import { ExampleSubscription } from './controller/example.subscription';
import { hiController } from './controller/hi.controller';
//                                      SERVICE
//                                      readme
//                When add any module, Please fill it in it's context.
@Module({
    imports: [
        // common modules
        RedisModule,
        WinstonCustomModule,
        ConfigModule.forRoot({
            load: [appConfig, authConfig, redisConfig],
            isGlobal: true,
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('jwtSecret'),
            }),
            inject: [ConfigService],
        }),

        // project modules
        EventsModule,
        ExampleModule,
    ],
    controllers: [ExampleController, ExampleSubscription],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        RequestContextService,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(RequestContextMiddleware).forRoutes('*');
    }
}
