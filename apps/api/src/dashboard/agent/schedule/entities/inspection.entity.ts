import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { Property } from '../../../../property/entities/property.entity';
import { User } from '../../../../users/entities/user.entity';

@Entity('inspections')
export class Inspection extends BaseEntity {
  @Column()
  tenantName: string;

  @Column({ nullable: true })
  tenantEmail: string;

  @Column({ nullable: true })
  tenantPhone: string;

  @Column()
  date: string; // e.g., "2024-12-28"

  @Column()
  time: string; // e.g., "10:30 AM"

  @Column({ default: 'Initial Viewing' })
  type: string; // Initial Viewing | Follow-up | Final Inspection

  @Column({ default: 'Scheduled' })
  status: string; // Scheduled | Completed | Cancelled | No-show

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column()
  propertyId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'agentId' })
  agent: User;

  @Column()
  agentId: string;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
