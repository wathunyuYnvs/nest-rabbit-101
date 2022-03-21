import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { RequestContextService } from '../context/context.service';
import * as winston from 'winston';
// import * as WinstonCloudWatch from 'winston-cloudwatch';
import { ContextModule } from '../context/context.module';
import { isEmpty } from 'lodash';

@Module({
    imports: [
        WinstonModule.forRootAsync({
            imports: [ContextModule],
            useFactory: (requestContextService: RequestContextService) => ({
                exitOnError: false,
                level: process.env.LOG_LEVEL,
                format: winston.format.combine(
                    winston.format.label({ label: 'main' }),
                    winston.format.timestamp(),
                    winston.format.json()
                ),
                transports: [
                    new winston.transports.Console({
                        format: winston.format.combine(
                            winston.format.label({ label: 'main' }),
                            winston.format.timestamp(),
                            winston.format.printf((info) => {
                                let str = `${
                                    info.timestamp
                                } [Request ID - ${requestContextService.get(
                                    requestContextService.REQUEST_ID
                                )}] [${info.context}] [${info.level}]: ${info.message}`;
                                if (info.headers)
                                    str += `\n[Header]: ${JSON.stringify(info.headers)}`;
                                if (info.body && !isEmpty(info.body))
                                    str += `\n[Body]: ${JSON.stringify(info.body)}`;
                                return str;
                            })
                        ),
                    }),
                    // new WinstonCloudWatch({
                    //     name: 'Cloudwatch Logs',
                    //     silent: process.env.NODE_ENV === 'local',
                    //     level: process.env.LOG_LEVEL,
                    //     logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
                    //     logStreamName: process.env.CLOUDWATCH_STREAM_NAME,
                    //     awsRegion: process.env.AWS_REGION,
                    //     awsAccessKeyId: process.env.AWS_ACCESS_KEY,
                    //     awsSecretKey: process.env.AWS_SECRET_KEY,
                    //     messageFormatter: (info): string => {
                    //         let str = `${info.timestamp} [Request ID - ${httpContextService.get(
                    //             httpContextService.REQUEST_ID
                    //         )}] [${info.context}] [${info.level}]: ${info.message}`;
                    //         if (info.headers) str += `\n[Header]: ${JSON.stringify(info.headers)}`;
                    //         if (info.body && !isEmpty(info.body))
                    //             str += `\n[Body]: ${JSON.stringify(info.body)}`;
                    //         return str;
                    //     },
                    // }),
                ],
            }),
            inject: [RequestContextService],
        }),
    ],
})
export class WinstonCustomModule {}
