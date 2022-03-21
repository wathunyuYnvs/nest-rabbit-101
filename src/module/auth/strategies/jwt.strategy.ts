import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPayload, SignedType } from '../auth-account.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(jwtPayload: AuthPayload): Promise<AuthPayload> {
        switch (jwtPayload.signedType) {
            case SignedType.RESTFUL:
                // do something for RESTFUL action
                break;
            case SignedType.REFRESH:
                // do something for REFRESH action
                break;
            case SignedType.ACTIVATE:
                // do something for ACTIVATE action
                break;
            default:
                break;
        }
        return jwtPayload;
    }
}
