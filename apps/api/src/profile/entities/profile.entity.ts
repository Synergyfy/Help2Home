import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('profiles')
export class Profile extends BaseEntity {
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  maritalStatus: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  businessName: string;

  @Column({ nullable: true })
  payoutFrequency: string;

  @Column({ nullable: true })
  currency: string;
}
