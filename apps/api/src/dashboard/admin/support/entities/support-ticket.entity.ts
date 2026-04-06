import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('support_tickets')
export class SupportTicket extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'Open' })
  status: string; // Open | Pending | Closed

  @Column({ default: 'Medium' })
  priority: string; // High | Medium | Low

  @Column({ nullable: true })
  category: string; // Billing | Technical | Account | Listings | Feature Request

  @Column({ nullable: true })
  submittedBy: string; // userId of the submitter

  @Column({ nullable: true })
  submittedByName: string;

  @Column({ nullable: true })
  resolvedAt: Date;

  @Column({ nullable: true })
  assignedTo: string; // admin userId handling this
}
