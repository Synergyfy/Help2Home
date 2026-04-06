import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('audit_logs')
export class AuditLog extends BaseEntity {
  @Column()
  action: string; // e.g. USER_CREATED, ROLE_ASSIGNED, PROPERTY_DELETED

  @Column({ nullable: true })
  entityType: string; // e.g. User, Property, Application

  @Column({ nullable: true })
  entityId: string;

  @Column({ nullable: true })
  performedBy: string; // userId of the admin who did the action

  @Column({ nullable: true })
  performedByName: string;

  @Column({ type: 'jsonb', nullable: true })
  meta: Record<string, any>; // any extra context/data for the log entry

  @Column({ nullable: true })
  ipAddress: string;
}
