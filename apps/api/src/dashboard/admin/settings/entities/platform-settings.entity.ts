import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('platform_settings')
export class PlatformSettings extends BaseEntity {
  @Column({ unique: true })
  key: string; // e.g. 'maintenance_mode', 'max_listings_per_user'

  @Column({ type: 'text', nullable: true })
  value: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  updatedBy: string; // admin userId who last changed this
}
