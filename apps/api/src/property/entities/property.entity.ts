import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Property extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  propertyType: string;

  @Column()
  category: string;

  @Column()
  address: string;

  @Column()
  location: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  postcode: string;

  @Column('text', { array: true, default: [] })
  images: string[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  ownerId: string;

  @Column()
  posterRole: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  floorPlanUrl: string;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column({ type: 'float', nullable: true })
  floorSize: number;

  @Column('jsonb', { nullable: true })
  amenities: any[];

  @Column({ default: false })
  furnished: boolean;

  @Column({ default: false })
  parking: boolean;

  @Column({ default: false })
  garden: boolean;

  @Column({ default: false })
  pool: boolean;

  @Column({ default: false })
  gym: boolean;

  @Column({ default: false })
  balcony: boolean;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  monthlyPrice: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  deposit: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  fees: number;

  @Column({ default: 'NGN' })
  currency: string;

  @Column({ default: false })
  isInstallmentAllowed: boolean;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  serviceCharge: number;

  @Column({ default: false })
  serviced: boolean;

  @Column({ default: false })
  electricity: boolean;

  @Column({ default: false })
  waterSupply: boolean;

  @Column({ default: false })
  security: boolean;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: true })
  isNew: boolean;

  @Column({ nullable: true })
  availableFrom: Date;

  @Column({ default: 'available' })
  status: string;

  @Column('text', { array: true, default: [] })
  keywords: string[];

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  inquiries: number;

  @Column({ default: false })
  isOffPlan: boolean;

  @Column({ default: false })
  isNewBuild: boolean;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column()
  ownership: string;

  @Column({ default: false })
  isRetirementHome: boolean;

  @Column({ default: false })
  isSharedOwnership: boolean;

  @Column({ default: false })
  isAuction: boolean;

  @Column({ default: false })
  isChainFree: boolean;

  @Column({ default: false })
  hasReducedPrice: boolean;

  @Column({ default: false })
  isUnderOffer: boolean;
}
