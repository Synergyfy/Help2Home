import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('artisans')
export class Artisan extends BaseEntity {
  @Column()
  name: string;

  @Column()
  specialization: string; // 'Plumbing' | 'Electrical' | 'HVAC' | 'Carpentry' | 'Painting' | 'General'

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  rating: number;

  @Column({ nullable: true })
  experience: string; // e.g. "5+ years"

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: 0 })
  jobsCompleted: number;
}
