import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from 'src/module/auth/auth-account.interface';

export const Auth = createParamDecorator((data: unknown, ctx: ExecutionContext): AuthPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
