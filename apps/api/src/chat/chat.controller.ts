import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { ChatService } from './chat.service';

@ApiTags('Chat')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('conversations')
  @ApiOperation({ summary: 'Get all conversations for the current user' })
  async getConversations(@GetCurrentUser('sub') userId: string) {
    return this.chatService.getConversations(userId);
  }

  @Get('conversations/:id/messages')
  @ApiOperation({ summary: 'Get all messages for a specific conversation' })
  async getMessages(@Param('id') id: string) {
    return this.chatService.getMessages(id);
  }

  @Post('conversations/:id/messages')
  @ApiOperation({ summary: 'Send a message' })
  async sendMessage(
    @GetCurrentUser('sub') userId: string,
    @Param('id') id: string,
    @Body() data: { text: string; attachments?: any[] }
  ) {
    return this.chatService.sendMessage(userId, id, data.text, data.attachments);
  }

  @Put('conversations/:id/read')
  @ApiOperation({ summary: 'Mark conversation as read' })
  async markAsRead(
    @GetCurrentUser('sub') userId: string,
    @Param('id') id: string
  ) {
    return this.chatService.markAsRead(id, userId);
  }
}
