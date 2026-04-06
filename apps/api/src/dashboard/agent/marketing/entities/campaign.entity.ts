import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { User } from '../../../../users/entities/user.entity';

@Entity('marketing_campaigns')
export class Campaign extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: 'Active' })
  status: string; // Active | Paused | Completed

  @Column({ type: 'int', default: 0 })
  leadsGenerated: number;

  @Column({ type: 'int', default: 0 })
  reach: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  budget: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'agentId' })
  agent: User;

  @Column()
  agentId: string;
}
