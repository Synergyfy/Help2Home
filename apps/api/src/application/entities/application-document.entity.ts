import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Application } from './application.entity';

@Entity('application_documents')
export class ApplicationDocument extends BaseEntity {
  @ManyToOne(() => Application, application => application.documents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @Column()
  applicationId: string;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column({ default: 'Pending' })
  status: string; // 'Pending' | 'In Review' | 'Verified' | 'Rejected'

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  rejectionReason: string;
}
