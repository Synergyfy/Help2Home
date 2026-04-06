import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Property } from '../../property/entities/property.entity';
import { User } from '../../users/entities/user.entity';
import { Contract } from '../../contract/entities/contract.entity';

@Entity('payment_transactions')
export class PaymentTransaction extends BaseEntity {
  @Column({ type: 'timestamp' })
  date: Date;

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
  @JoinColumn({ name: 'landlordId' })
  landlord: User;

  @Column()
  landlordId: string;

  @ManyToOne(() => Contract)
  @JoinColumn({ name: 'contractId' })
  contract: Contract;

  @Column({ nullable: true })
  contractId: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column()
  method: string; // 'Bank Transfer' | 'Debit Card' | 'Wallet' | 'Cash'

  @Column({ default: 'Pending' })
  status: string; // 'Cleared' | 'Pending' | 'Failed'

  @Column({ unique: true })
  referenceId: string;

  @Column('jsonb', { nullable: true })
  fees: any; // { platformFee: number, processingFee: number, commission?: number, penalty?: number }

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  netAmount: number;

  @Column({ default: 'Pending' })
  payoutStatus: string; // 'Paid out' | 'Scheduled' | 'Pending'
}
