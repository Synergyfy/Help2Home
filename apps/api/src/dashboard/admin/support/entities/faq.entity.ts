import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('faqs')
export class FAQ extends BaseEntity {
  @Column()
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ nullable: true })
  category: string;
}
