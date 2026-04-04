import { Entity, Column, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
// import { ChatMessage } from './chat-message.entity'; // Removed to avoid circular dependency

@Entity('conversations')
export class Conversation extends BaseEntity {
  @ManyToMany(() => User)
  @JoinTable({
    name: 'conversation_participants',
    joinColumn: { name: 'conversationId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  participants: User[];

  @OneToMany('ChatMessage', 'conversation')
  messages: any[];

  @OneToOne('ChatMessage')
  @JoinColumn({ name: 'lastMessageId' })
  lastMessage: any;

  @Column({ nullable: true })
  lastMessageId: string;

  @Column('text', { array: true, default: [] })
  labels: string[];

  @Column({ nullable: true })
  linkedObjectType: string; // 'Property' | 'Application' | 'Contract' | 'Ticket'

  @Column({ nullable: true })
  linkedObjectId: string;

  @Column({ nullable: true })
  linkedObjectTitle: string;
}
