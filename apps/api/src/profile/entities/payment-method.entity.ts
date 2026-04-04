import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('payment_methods')
export class PaymentMethod extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  type: string; // card, etc.

  @Column()
  last4: string;

  @Column()
  expiry: string;

  @Column()
  cardholderName: string;

  @Column()
  brand: string; // visa, mastercard

  @Column({ default: false })
  isDefault: boolean;
}
