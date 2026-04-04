import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { SupportTicket } from './support-ticket.entity';

@Entity('support_messages')
export class SupportMessage extends BaseEntity {
  @Column()
  ticketId: string;

  @ManyToOne(() => SupportTicket)
  @JoinColumn({ name: 'ticketId' })
  ticket: SupportTicket;

  @Column()
  senderId: string;

  @Column()
  senderName: string;

  @Column()
  senderRole: string; // user | agent | admin

  @Column({ type: 'text' })
  content: string;
}
