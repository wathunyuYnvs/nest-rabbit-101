/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestContextService } from '../custom/module/context/context.service';
import * as httpContext from 'express-http-context';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    constructor(private requestContextService: RequestContextService) {}

    use(req: Request, res: Response, next: NextFunction) {
        httpContext.middleware(req, res, () => {
            const uuid = req.headers['requestid'] || uuidv4();
            req.headers['requestid'] = uuid;
            this.requestContextService.set(this.requestContextService.REQUEST_ID, uuid);
            this.requestContextService.set(
                this.requestContextService.AUTHORIZATION,
                req.headers['authorization']
            );
            res.setHeader('requestid', uuid);
            next();
        });
    }
}
