import { Injectable } from '@nestjs/common';
import { Message } from './entities/message';

@Injectable()
export class ChatService {
  messages: Message[] = [];

  getMessages(): Message[] {
    return this.messages;
  }

  storeMessage(message: Message) {
    this.messages.push(message);
  }
}
