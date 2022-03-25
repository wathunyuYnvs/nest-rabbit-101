import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	Logger,
	HttpStatus,
	Inject,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as util from 'util';
import { Reflector } from '@nestjs/core';
import { RequestContextService } from '../custom/module/context/context.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	private readonly logger = new Logger('ResponseInterceptor');
	constructor(
		private reflector: Reflector,

		// @Inject(ContextServiceProvider.RequestContextService)
		// private requestContextProvider: RequestContextService
	) {}

	private formatResponse(requestId: string, result: any) {
		console.log('FORMAT RESPONSE EXECUTE');
		return {
			request_id: requestId,
			status_code: HttpStatus.OK,
			message: 'OK',
			data: result === undefined ? {} : result,
		};
	}

	private formatError(requestId: string, error: any): any {
		console.log('FORMAT ERROR');
		if (!error?.response?.error) {
			this.logger.error('========== UNEXPECTED ERROR [START] ==========');
			this.logger.error(
				`Obj => ${util.inspect(error, {
					colors: true,
					compact: false,
				})}`
			);
			this.logger.error('========== UNEXPECTED ERROR [ END ] ==========');
		}
		return throwError(() => error);
	}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const isIgnored = this.reflector.getAllAndOverride<boolean>(
			false,
			[context.getHandler(), context.getClass()]
		);
		// const requestId = this.requestContextProvider.getRequestId();
		if (isIgnored) {
			return next.handle();
		}
		console.log('INTERCEPTER EXECUTE');

		return next.handle().pipe(
			map((value) => this.formatResponse("requestId", value)),
			catchError((e) => this.formatError("requestId", e))
		);
	}
}