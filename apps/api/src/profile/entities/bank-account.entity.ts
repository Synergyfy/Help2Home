import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('bank_accounts')
export class BankAccount extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  bankName: string;

  @Column()
  accountNumberMasked: string;

  @Column()
  accountHolder: string;

  @Column({ default: false })
  isPrimary: boolean;

  @Column({ default: false })
  isVerified: boolean;
}
