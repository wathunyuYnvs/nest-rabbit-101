import { Injectable, Logger, UseGuards } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsGuard } from 'src/common/guard/ws.guard';

@Injectable()
@WebSocketGateway()
export class LiveChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger('LiveChatGateway');

    @WebSocketServer()
    socket: Server;

    handleConnection(@ConnectedSocket() socket: Socket): void {
        this.logger.debug(`socket.id => ${socket.id}`);
    }

    handleDisconnect(@ConnectedSocket() socket: Socket): void {
        this.logger.debug(`socket.id => ${socket.id}`);
    }

    @UseGuards(WsGuard)
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
        @ConnectedSocket() socket: Socket,
        @MessageBody()
        roomId: string
    ): Promise<void> {
        this.logger.debug(`roomId => ${roomId}`);
        socket.join(`room::${roomId}`);
        socket.emit('joinRoom', roomId); // confirm socket join
    }

    @UseGuards(WsGuard)
    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(
        @ConnectedSocket() socket: Socket,
        @MessageBody()
        roomId: string
    ): void {
        this.logger.debug(`roomId => ${roomId}`);
        socket.leave(`room::${roomId}`);
        socket.emit('leaveRoom', roomId); // confirm socket leave
    }

    @UseGuards(WsGuard)
    @SubscribeMessage('joinSession')
    handleJoinSession(
        @ConnectedSocket() socket: Socket,
        @MessageBody()
        userId: string
    ): void {
        socket.join(`session::${userId}`);
        socket.emit('joinSession', userId); // confirm socket join
    }

    @UseGuards(WsGuard)
    @SubscribeMessage('leaveSession')
    handleLeaveSession(
        @ConnectedSocket() socket: Socket,
        @MessageBody()
        userId: string
    ): void {
        socket.leave(`session::${userId}`);
        socket.emit('leaveSession', userId); // confirm socket leave
    }

    @UseGuards(WsGuard)
    @SubscribeMessage('sendMessage')
    async sendMessage(
        @MessageBody()
        data: any
    ): Promise<void> {
        const messages = '';
        const userIds = [1, 2, 3, 4];
        const roomData = {};
        this.socket.to(`room::${data.roomId}`).emit('receiveMessage', messages);
        for (const userId of userIds) {
            this.socket.to(`session::${userId}`).emit('updateRoom', roomData);
        }
    }

    updateRoom(data: { room: any; userIds: string[] }): void {
        for (const userId of data.userIds) {
            this.socket.to(`session::${userId}`).emit('updateRoom', data.room);
        }
    }

    receiveMessage(data: { payload: any; roomId: string }): void {
        this.socket.to(`room::${data.roomId}`).emit('receiveMessage', data.payload);
    }
}
