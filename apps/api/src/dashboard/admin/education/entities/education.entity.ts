import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { User } from '../../../../users/entities/user.entity';

@Entity('education_content')
export class Education extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  category: string; // e.g. Guides, Tips, FAQs

  @Column({ type: 'simple-json', nullable: true })
  targetAudience: string[]; // ['tenant', 'landlord', ...]

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column({ nullable: true })
  authorId: string;

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
