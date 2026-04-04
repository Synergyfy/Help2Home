import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Application } from './application.entity';

@Entity('application_activity_logs')
export class ApplicationActivityLog extends BaseEntity {
  @ManyToOne(() => Application, application => application.activityLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @Column()
  applicationId: string;

  @Column()
  event: string;

  @Column()
  actor: string;

  @Column({ default: 'status' })
  type: string; // 'status' | 'document' | 'contract' | 'payment' | 'info'
}
