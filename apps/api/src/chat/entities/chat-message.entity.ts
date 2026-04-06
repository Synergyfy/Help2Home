import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Conversation } from './conversation.entity';

@Entity('chat_messages')
export class ChatMessage extends BaseEntity {
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation;

  @Column()
  conversationId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column()
  senderId: string;

  @Column()
  senderName: string;

  @Column()
  senderRole: string; // 'landlord' | 'tenant' | 'agent' | 'support' | 'applicant' | 'caretaker'

  @Column({ type: 'text' })
  text: string;

  @Column({ default: 'text' })
  type: string; // 'text' | 'image' | 'document' | 'system'

  @Column({ default: false })
  isRead: boolean;

  @Column('jsonb', { nullable: true })
  attachments: any[]; // { id, url, filename, size, type }[]
}
