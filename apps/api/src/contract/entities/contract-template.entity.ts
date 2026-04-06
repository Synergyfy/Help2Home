import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('contract_templates')
export class ContractTemplate extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  content: string; // HTML or markdown content with placeholders like {{tenant_name}}

  @Column({ default: true })
  isActive: boolean;
}
