import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../property/entities/property.entity';
import { OneToMany } from 'typeorm';
import { ApplicationDocument } from './application-document.entity';
import { ApplicationContract } from './application-contract.entity';
import { ApplicationActivityLog } from './application-activity-log.entity';

@Entity('applications')
export class Application extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'tenantId' })
  tenant: User;

  @Column()
  tenantId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'landlordId' })
  landlord: User;

  @Column()
  landlordId: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column()
  propertyId: string;

  @Column()
  tenantName: string;

  @Column()
  tenantEmail: string;

  @Column({ nullable: true })
  landlordPhone: string;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @Column({ nullable: true })
  propertyAddress: string;

  @Column({ nullable: true })
  tenantPhone: string;

  @Column()
  propertyTitle: string;

  @Column({ nullable: true })
  propertyImage: string;

  @Column({ default: 'Pending' })
  status: string; // 'Pending', 'Under Review', 'Approved', 'Rejected', 'Draft'

  @Column({ type: 'jsonb', nullable: true })
  details: {
    monthlySalary: string;
    employmentStatus: string;
    employerName: string;
    [key: string]: any;
  };

  @Column({ type: 'jsonb', nullable: true })
  financing: {
    downPaymentPercent: number;
    repaymentDuration: number;
    [key: string]: any;
  };

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  submittedAt: Date;

  @OneToMany(() => ApplicationDocument, document => document.application)
  documents: ApplicationDocument[];

  @OneToMany(() => ApplicationContract, contract => contract.application)
  contracts: ApplicationContract[];

  @OneToMany(() => ApplicationActivityLog, log => log.application)
  activityLogs: ApplicationActivityLog[];
}
