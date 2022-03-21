/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { RequestContextService } from '../custom/module/context/context.service';
import * as util from 'util';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    private readonly logger = new Logger('ResponseInterceptor');
    constructor(private requestContextService: RequestContextService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(
                (result: {
                    data?: any;
                    rows?: any;
                    count?: number;
                    limit?: number;
                    page?: number;
                }) => {
                    const requestId = this.requestContextService.get('requestid');
                    if (result?.limit && result?.page) {
                        return {
                            requestId: requestId,
                            statusCode: StatusCodes.OK,
                            message: getReasonPhrase(StatusCodes.OK),
                            data: {
                                total: result.count,
                                perPage: result.limit,
                                currentPage: result.page,
                                totalPages: parseInt((result.count / result.limit).toString()) + 1,
                                next: result.page * result.limit < result.count,
                                prev: !!(result.page - 1),
                                docs: result.rows,
                            },
                        };
                    }
                    return {
                        requestId: requestId,
                        statusCode: StatusCodes.OK,
                        message: getReasonPhrase(StatusCodes.OK),
                        data: result === undefined ? {} : result,
                    };
                }
            ),
            catchError((e) => {
                if (!e?.response?.error) {
                    this.logger.error('========== UNEXPECTED ERROR [START] ==========');
                    this.logger.error(
                        `Obj => ${util.inspect(e, {
                            colors: true,
                            compact: false,
                        })}`
                    );
                    this.logger.error('========== UNEXPECTED ERROR [ END ] ==========');
                }
                return throwError(() => e);
            })
        );
    }
}
