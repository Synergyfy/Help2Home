import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { User } from '../../../../users/entities/user.entity';

@Entity('documents')
export class DocumentEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  url: string;

  @Column({ default: 'Compliance' })
  category: string; // Compliance | KYC | Contract | Listing

  @Column({ default: 'Pending' })
  status: string; // Pending | Verified | Rejected

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  ownerId: string; // Could be agentId or userId

  @Column({ nullable: true })
  expiryDate: Date;
}
