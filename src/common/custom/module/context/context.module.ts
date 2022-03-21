import { Module } from '@nestjs/common';
import { RequestContextService } from './context.service';

@Module({
    providers: [RequestContextService],
    exports: [RequestContextService],
})
export class ContextModule {}
