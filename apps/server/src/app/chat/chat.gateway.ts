import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { User } from './../users/entities/user';
import { Message } from './entities/message';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements NestGateway {
  socket: Socket;

  constructor(private readonly chatService: ChatService) {}

  afterInit(server) {}

  handleConnection(socket) {
    this.socket = socket;
    process.nextTick(() => {
      socket.emit('allMessages', this.chatService.getMessages());
    });
  }

  handleDisconnect(socket) {}

  @SubscribeMessage({ value: 'data' })
  handleGetAddMessage(sender, message: Message) {
    this.chatService.storeMessage(message);
    sender.emit('newMessage', message);
    sender.broadcast.emit('newMessage', message);
  }

  @SubscribeMessage({ value: 'isWriting' })
  handleIsWriting(sender, user: User) {
    sender.broadcast.emit('isWriting', user);
  }

  @SubscribeMessage({ value: 'isNotWriting' })
  handleIsNotWriting(sender) {
    sender.broadcast.emit('isNotWriting');
  }
}
