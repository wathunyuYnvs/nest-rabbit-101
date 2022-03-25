import { Controller, Get, Injectable, UseInterceptors } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { LocalInterceptor } from "src/common/interceptor/local.interceptor";
import { Public } from "src/module/auth/decorator/public.decorator";

@Controller()
// @UseInterceptors(LocalInterceptor)
export class ExampleSubscription {
    @MessagePattern({ cmd: 'greeting' })
    getGreetingMessage(@Payload() name, @Ctx() context: RmqContext): string {
        return `Hello ${name}`;
    }

    @Public()
    @Get('/')
    async testGet(): Promise<number> {
        return 0
    }
}