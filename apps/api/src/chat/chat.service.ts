import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(ChatMessage)
    private readonly messageRepository: Repository<ChatMessage>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getConversations(userId: string) {
    const conversations = await this.conversationRepository.find({
      where: { participants: { id: userId } },
      relations: ['participants', 'lastMessage'],
    });

    const enrichedConversations = await Promise.all(
      conversations.map(async (conv) => {
        const unreadCount = await this.messageRepository.count({
          where: { conversationId: conv.id, isRead: false },
        //   senderId: Not(userId) // Add Not from typeorm if needed
        });

        return {
          ...conv,
          unreadCount,
          // Adapting for frontend expectation
          participants: conv.participants.map(p => ({
            id: p.id,
            name: `${p.firstName} ${p.lastName}`,
            email: p.email,
            role: (p as any).roles[0] // Mocking role from roles array
          }))
        };
      })
    );

    return enrichedConversations;
  }

  async getMessages(conversationId: string) {
    return this.messageRepository.find({
      where: { conversationId },
      order: { createdAt: 'ASC' },
    });
  }

  async sendMessage(userId: string, conversationId: string, text: string, attachments?: any[]) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const conversation = await this.conversationRepository.findOne({ 
      where: { id: conversationId },
      relations: ['participants']
    });
    if (!conversation) throw new NotFoundException('Conversation not found');

    const message = this.messageRepository.create({
      conversationId,
      senderId: userId,
      senderName: `${user.firstName} ${user.lastName}`,
      senderRole: (user as any).roles[0], // Simplified
      text,
      type: 'text',
      attachments,
      isRead: false,
    });

    const savedMessage = await this.messageRepository.save(message);

    // Update conversation last message
    conversation.lastMessageId = savedMessage.id;
    await this.conversationRepository.save(conversation);

    return savedMessage;
  }

  async markAsRead(conversationId: string, userId: string) {
    await this.messageRepository.update(
      { conversationId, senderId: userId, isRead: false }, // Should be not-senderId
      { isRead: true }
    );
  }
}
