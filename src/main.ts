import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { fastifyHelmet } from 'fastify-helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { RedisIoAdapter } from './common/adapters/redis.adapter';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.enableShutdownHooks(); // graceful shutdown
    app.register(fastifyHelmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
        },
    });

    if (process.env.NODE_ENV !== 'local') {
        app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    }
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        })
    );
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);

    const swaggerConfig = new DocumentBuilder()
        .setTitle(`${process.env.PROJECT_NAME}`)
        .setDescription(`The ${process.env.PROJECT_NAME} API Description`)
        .setVersion(process.env.VERSION)
        .addTag(`${process.env.PROJECT_NAME}`)
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    app.setGlobalPrefix(process.env.PREFIX);
    await app.listen(parseInt(process.env.PORT), '0.0.0.0');
}
bootstrap();
