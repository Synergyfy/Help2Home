import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { Property } from '../../../../property/entities/property.entity';
import { User } from '../../../../users/entities/user.entity';

@Entity('maintenance_requests')
export class Maintenance extends BaseEntity {
  @Column()
  category: string; // Plumbing | Electrical | Carpentry | Cleaning | General

  @Column({ type: 'text' })
  description: string;

  @Column({ default: 'Medium' })
  priority: string; // High | Medium | Low

  @Column({ default: 'Pending' })
  status: string; // Pending | In Progress | Resolved | Cancelled

  @Column('text', { array: true, default: [] })
  images: string[];

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  cost: number;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column()
  propertyId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'tenantId' })
  tenant: User;

  @Column()
  tenantId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'agentId' })
  agent: User;

  @Column({ nullable: true })
  agentId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'landlordId' })
  landlord: User;

  @Column({ nullable: true })
  landlordId: string;

  @Column({ nullable: true })
  rejectionReason: string;

  @Column({ nullable: true })
  assignedArtisanId: string;

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt: Date;
}
