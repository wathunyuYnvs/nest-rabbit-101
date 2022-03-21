/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import * as httpContext from 'express-http-context';

@Injectable()
export class RequestContextService {
    public readonly REQUEST_ID = 'requestid';
    public readonly AUTHORIZATION = 'authorization';

    get(key) {
        return httpContext.get(key);
    }

    set(key, value) {
        return httpContext.set(key, value);
    }
}
