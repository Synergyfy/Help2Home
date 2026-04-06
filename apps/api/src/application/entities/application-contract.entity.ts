import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Application } from './application.entity';

@Entity('application_contracts')
export class ApplicationContract extends BaseEntity {
  @ManyToOne(() => Application, application => application.contracts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @Column()
  applicationId: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  rentAmount: number;

  @Column()
  tenure: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  monthlyPayment: number;

  @Column({ default: false })
  isSigned: boolean;

  @Column({ nullable: true })
  signedDate: Date;

  @Column({ nullable: true })
  pdfUrl: string;
}
