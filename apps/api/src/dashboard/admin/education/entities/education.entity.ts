import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('education_content')
export class Education extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  category: string; // e.g. Guides, Tips, FAQs

  @Column({ nullable: true })
  targetRole: string; // tenant | landlord | agent | all

  @Column({ default: 'draft' })
  status: string; // draft | published

  @Column({ nullable: true })
  author: string; // admin userId

  @Column({ nullable: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ nullable: true, default: 0 })
  readTime: number;

  @Column({ nullable: true })
  format: string; // article, video, tip

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: false })
  featured: boolean;
}
