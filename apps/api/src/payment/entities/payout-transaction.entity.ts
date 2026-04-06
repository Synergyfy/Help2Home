import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('payout_transactions')
export class PayoutTransaction extends BaseEntity {
  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ unique: true })
  referenceId: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column()
  method: string; // 'Bank Transfer' | 'Instant Payout'

  @Column({ default: 'Processing' })
  status: string; // 'Success' | 'Processing' | 'Failed'

  @Column({ nullable: true })
  failureReason: string;

  @Column('jsonb', { default: [] })
  deductions: any[]; // { label: string, amount: number }[]

  @Column('jsonb', { default: [] })
  includedPayments: string[]; // array of payment transaction IDs

  @Column('jsonb')
  destinationAccount: any; // { bankName, accountNumber }

  @ManyToOne(() => User)
  @JoinColumn({ name: 'landlordId' })
  landlord: User;

  @Column()
  landlordId: string;
}
