import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { User } from '../../../../users/entities/user.entity';

@Entity('agent_settings')
export class AgentSettings extends BaseEntity {
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @Column({ default: true })
  notifications: boolean;

  @Column({ default: false })
  newsletter: boolean;

  @Column({ default: 'light' })
  theme: string;
}
