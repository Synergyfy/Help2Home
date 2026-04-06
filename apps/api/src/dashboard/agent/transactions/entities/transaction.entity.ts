import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { Property } from '../../../../property/entities/property.entity';
import { User } from '../../../../users/entities/user.entity';

@Entity('transactions')
export class Transaction extends BaseEntity {
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  commission: number;

  @Column({ default: 'NGN' })
  currency: string;

  @Column({ default: 'Pending' })
  status: string; // Pending | Completed | Cancelled | Failed

  @Column({ nullable: true })
  paymentMethod: string; // Card | Transfer | Installment (even if we skip installment logic, the type might exist)

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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'buyerId' })
  buyer: User;

  @Column()
  buyerId: string;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;
}
