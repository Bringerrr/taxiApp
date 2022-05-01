import { Controller, Get } from '@nestjs/common';
import { ChatEntity } from './chat.entity';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get()
  async getChats(): Promise<ChatEntity[]> {
    return await this.chatService.getAllChats();
  }
}
