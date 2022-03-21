/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { SignedType } from 'src/module/auth/auth-account.interface';

@Injectable()
export class WsGuard implements CanActivate {
    canActivate(context: any): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
        try {
            const bearerToken = context.args[0].handshake.headers.authorization.split(' ')[1];
            jwt.verify(bearerToken, process.env.JWT_SECRET) as any;
            const tokenPayload: any = jwt.decode(bearerToken);
            if (tokenPayload.signedType !== SignedType.SOCKET) {
                return false;
            }
        } catch (ex) {
            console.log(ex);
            return false;
        }
        return true;
    }
}
