import { Module } from '@nestjs/common';
import { LiveChatGateway } from './liveChat.gateway';

@Module({
    imports: [],
    providers: [LiveChatGateway],
    exports: [LiveChatGateway],
})
export class EventsModule {}
