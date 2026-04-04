import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('notification_settings')
export class NotificationSettings extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({ default: true })
  globalEnabled: boolean;

  @Column({ default: false })
  dndEnabled: boolean;

  @Column({ nullable: true })
  dndStartTime: string; // e.g. "22:00"

  @Column({ nullable: true })
  dndEndTime: string; // e.g. "07:00"

  // Per-event channel preferences stored as jsonb for flexibility
  @Column('jsonb', {
    default: [
      { type: 'New Application', channels: { inApp: true, email: true, sms: false } },
      { type: 'Rent Payment', channels: { inApp: true, email: true, sms: true } },
      { type: 'Maintenance Request', channels: { inApp: true, email: true, sms: false } },
      { type: 'Contract Signed', channels: { inApp: true, email: true, sms: true } },
      { type: 'New Message', channels: { inApp: true, email: false, sms: false } },
      { type: 'Property View', channels: { inApp: true, email: false, sms: false } },
    ],
  })
  preferences: any[];
}
