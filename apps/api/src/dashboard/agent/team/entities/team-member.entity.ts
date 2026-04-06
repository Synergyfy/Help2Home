import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { User } from '../../../../users/entities/user.entity';

@Entity('team_members')
export class TeamMember extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'leaderId' })
  leader: User;

  @Column()
  leaderId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({ default: 'Member' })
  role: string; // Leader | Member | Support

  @Column({ default: 'Active' })
  status: string; // Active | Pending | Inactive
}
