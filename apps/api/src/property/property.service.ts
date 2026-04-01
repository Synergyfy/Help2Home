import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async findAll() {
    return this.propertyRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findByOwner(ownerId: string) {
    return this.propertyRepository.find({
      where: { ownerId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string) {
    const property = await this.propertyRepository.findOne({
      where: { id },
    });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }

  async create(userId: string, data: any) {
    const property = this.propertyRepository.create({
      ...data,
      ownerId: userId,
      title: data.title || 'Untitled Property',
      price: data.price?.amount || data.price || 0,
      currency: data.price?.currency || data.currency || 'NGN',
      address: data.address?.street || data.address || '',
      city: data.address?.city || data.city || '',
      state: data.address?.state || data.state || '',
      location: data.address?.city || data.location || '',
      propertyType:
        data.listingType === 'Rent'
          ? 'rent'
          : data.listingType === 'Sale'
            ? 'buy'
            : data.listingType === 'Service-Apartment'
              ? 'service-apartment'
              : data.propertyType || 'rent',
      bedrooms: Number(data.specs?.bedrooms || data.bedrooms || 0),
      bathrooms: Number(data.specs?.bathrooms || data.bathrooms || 0),
      floorSize: Number(data.specs?.area || data.floorSize || 0),
      images: data.images?.map((img: any) => (typeof img === 'string' ? img : img.url)) || [],
      isInstallmentAllowed: data.installments?.enabled || data.isInstallmentAllowed || false,
      serviceCharge: data.price?.serviceCharge || data.serviceCharge || 0,
      status: data.status || 'available',
      ownership: data.ownership || 'freehold',
      posterRole: data.posterRole || 'landlord',
    });

    return this.propertyRepository.save(property);
  }

  async update(id: string, userId: string, data: any) {
    const property = await this.findById(id);
    if (property.ownerId !== userId) {
      throw new NotFoundException('Property not found or access denied');
    }
    Object.assign(property, data);
    return this.propertyRepository.save(property);
  }

  async remove(id: string, userId: string) {
    const property = await this.findById(id);
    if (property.ownerId !== userId) {
      throw new NotFoundException('Property not found or access denied');
    }
    await this.propertyRepository.remove(property);
    return { success: true };
  }

  async countByOwner(ownerId: string) {
    return this.propertyRepository.count({
      where: { ownerId },
    });
  }
}
