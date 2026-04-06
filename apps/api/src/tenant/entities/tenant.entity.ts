import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../property/entities/property.entity';

@Entity()
export class Tenant extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  propertyName: string;

  @Column()
  propertyId: string;

  @ManyToOne(() => Property, { nullable: true })
  @JoinColumn({ name: 'propertyRefId' })
  property: Property;

  @Column({ nullable: true })
  propertyRefId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'landlordId' })
  landlord: User;

  @Column({ nullable: true })
  landlordId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @Column({ default: 'Active' })
  status: string; // 'Active', 'Past', 'Evicted'

  @Column({ default: 'Pending' })
  paymentStatus: string; // 'Up to date', 'Late', 'Pending'

  @Column({ nullable: true })
  tenantId: string;

  @Column({ type: 'numeric', nullable: true, transformer: { to: (v) => v, from: (v) => parseFloat(v) } })
  monthlyRentAmount: number;

  @Column({ nullable: true })
  dateLeaseStart: string;

  @Column({ nullable: true })
  leaseEnd: string;

  @Column({ type: 'jsonb', nullable: true })
  details: any;
}
