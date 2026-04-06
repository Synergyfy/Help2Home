import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Property } from '../../property/entities/property.entity';
import { User } from '../../users/entities/user.entity';

@Entity('contracts')
export class Contract extends BaseEntity {
  @Column()
  title: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column()
  propertyId: string;

  @Column()
  propertyTitle: string;

  @Column()
  propertyAddress: string;

  @Column({ nullable: true })
  applicationId: string;

  @Column({ default: 'Draft' })
  status: string; // 'Draft' | 'Pending Signatures' | 'Partially Signed' | 'Signed' | 'Declined' | 'Expired'

  @Column('jsonb', { default: [] })
  signers: any[]; // { id, name, email, role, status, signedAt }[]

  @Column('jsonb', { nullable: true })
  fields: any; // { startDate, endDate, rentAmount, paymentFrequency, depositAmount, noticePeriod, specialClauses }

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ nullable: true })
  previewUrl: string;

  @Column({ nullable: true })
  signedUrl: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'landlordId' })
  landlord: User;

  @Column()
  landlordId: string;

  @Column()
  createdBy: string;
}
