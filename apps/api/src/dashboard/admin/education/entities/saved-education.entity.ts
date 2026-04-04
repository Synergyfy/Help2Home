import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { Education } from './education.entity';
import { User } from '../../../../users/entities/user.entity';

@Entity('saved_education')
export class SavedEducation extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  educationId: string;

  @ManyToOne(() => Education)
  @JoinColumn({ name: 'educationId' })
  education: Education;
}
