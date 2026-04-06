import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async getWishlist(userId: string) {
    const list = await this.wishlistRepository.find({
      where: { userId },
      relations: ['property'],
    });
    return list.map(l => l.property);
  }

  async toggleWishlist(userId: string, propertyId: string) {
    const existing = await this.wishlistRepository.findOne({
      where: { userId, propertyId },
    });

    if (existing) {
      await this.wishlistRepository.remove(existing);
      return false;
    }

    const item = this.wishlistRepository.create({ userId, propertyId });
    await this.wishlistRepository.save(item);
    return true;
  }

  async findAll(filters: any = {}) {
    const query = this.propertyRepository.createQueryBuilder('property');

    if (filters.propertyType && filters.propertyType !== 'all') {
      query.andWhere('property.propertyType = :propertyType', { propertyType: filters.propertyType });
    }

    if (filters.category && filters.category !== 'all') {
      query.andWhere('property.category = :category', { category: filters.category });
    }

    if (filters.location) {
      query.andWhere(
        '(LOWER(property.location) LIKE :location OR LOWER(property.city) LIKE :location OR LOWER(property.address) LIKE :location)',
        { location: `%${filters.location.toLowerCase()}%` },
      );
    }

    if (filters.priceMin) {
      query.andWhere('property.price >= :priceMin', { priceMin: filters.priceMin });
    }

    if (filters.priceMax) {
      query.andWhere('property.price <= :priceMax', { priceMax: filters.priceMax });
    }

    if (filters.bedrooms) {
      query.andWhere('property.bedrooms >= :bedrooms', { bedrooms: filters.bedrooms });
    }

    if (filters.bathrooms) {
      query.andWhere('property.bathrooms >= :bathrooms', { bathrooms: filters.bathrooms });
    }

    if (filters.ownerId) {
      query.andWhere('property.ownerId = :ownerId', { ownerId: filters.ownerId });
    }

    // Amenities (Boolean filters)
    const booleanFilters = ['furnished', 'parking', 'garden', 'pool', 'gym', 'balcony', 'serviced', 'electricity', 'waterSupply', 'security', 'featured', 'verified'];
    booleanFilters.forEach(field => {
      if (filters[field] === true || filters[field] === 'true') {
        query.andWhere(`property.${field} = :${field}`, { [field]: true });
      }
    });

    // Sorting
    if (filters.sortBy === 'price-low') {
      query.orderBy('property.price', 'ASC');
    } else if (filters.sortBy === 'price-high') {
      query.orderBy('property.price', 'DESC');
    } else if (filters.sortBy === 'newest') {
      query.orderBy('property.createdAt', 'DESC');
    } else {
      query.orderBy('property.featured', 'DESC').addOrderBy('property.createdAt', 'DESC');
    }

    const [properties, total] = await query.getManyAndCount();
    return { properties, total };
  }

  async findFeatured(limit: number = 6, propertyType?: string) {
    const where: any = {};
    if (propertyType && propertyType !== 'all') {
      where.propertyType = propertyType;
    }
    
    return this.propertyRepository.find({
      take: limit,
      where,
      order: { featured: 'DESC', createdAt: 'DESC' },
    });
  }

  async getLocations() {
    const results = await this.propertyRepository
      .createQueryBuilder('property')
      .select('property.city', 'city')
      .addSelect('property.location', 'location')
      .addSelect('COUNT(property.id)', 'count')
      .groupBy('property.city')
      .addGroupBy('property.location')
      .getRawMany();

    return results.map((r, i) => ({
      id: `loc-${i}`,
      name: r.location,
      city: r.city,
      type: 'area',
      propertyCount: parseInt(r.count),
    }));
  }

  async findByOwner(ownerId: string) {
    return this.propertyRepository.find({
      where: { ownerId },
      order: { createdAt: 'DESC' },
    });
  }

  async findPending() {
    return this.propertyRepository.find({
      where: { status: 'pending' },
      order: { createdAt: 'DESC' },
    });
  }

  async approve(id: string) {
    const property = await this.findById(id);
    property.status = 'available';
    property.verified = true;
    return this.propertyRepository.save(property);
  }

  async reject(id: string) {
    const property = await this.findById(id);
    property.status = 'rejected';
    property.verified = false;
    return this.propertyRepository.save(property);
  }

  async findById(id: string) {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['owner'],
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

  async updateStatusAsAdmin(id: string, updateData: any) {
    const property = await this.findById(id);
    Object.assign(property, updateData);
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

  async getPriceStats(location: string) {
    const query = this.propertyRepository.createQueryBuilder('property');
    
    if (location && location !== 'All') {
      query.andWhere(
        '(LOWER(property.location) LIKE :location OR LOWER(property.city) LIKE :location OR LOWER(property.address) LIKE :location)',
        { location: `%${location.toLowerCase()}%` },
      );
    }

    // 1. Average Price
    const avgResult = await query.select('AVG(property.price)', 'avg').getRawOne();
    const averagePrice = parseFloat(avgResult.avg) || 0;

    // 2. Trend (comparing properties from last 3 months vs previous 3 months)
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const recentAvgResult = await this.propertyRepository.createQueryBuilder('property')
      .where('property.createdAt >= :threeMonthsAgo', { threeMonthsAgo })
      .andWhere(location && location !== 'All' ? '(LOWER(property.location) LIKE :location OR LOWER(property.city) LIKE :location)' : '1=1', { location: `%${location?.toLowerCase()}%` })
      .select('AVG(property.price)', 'avg')
      .getRawOne();

    const olderAvgResult = await this.propertyRepository.createQueryBuilder('property')
      .where('property.createdAt < :threeMonthsAgo AND property.createdAt >= :sixMonthsAgo', { threeMonthsAgo, sixMonthsAgo })
      .andWhere(location && location !== 'All' ? '(LOWER(property.location) LIKE :location OR LOWER(property.city) LIKE :location)' : '1=1', { location: `%${location?.toLowerCase()}%` })
      .select('AVG(property.price)', 'avg')
      .getRawOne();

    const recentAvg = parseFloat(recentAvgResult.avg) || averagePrice;
    const olderAvg = parseFloat(olderAvgResult.avg) || averagePrice;
    
    const diff = recentAvg - olderAvg;
    const change = olderAvg !== 0 ? (diff / olderAvg) * 100 : 0;
    const trend = diff >= 0 ? 'up' : 'down';

    // 3. History (Last 6 months)
    const history: number[] = [];
    for (let i = 5; i >= 0; i--) {
      const start = new Date();
      start.setMonth(start.getMonth() - i);
      start.setDate(1);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      const monthAvg = await this.propertyRepository.createQueryBuilder('property')
        .where('property.createdAt >= :start AND property.createdAt < :end', { start, end })
        .andWhere(location && location !== 'All' ? '(LOWER(property.location) LIKE :location OR LOWER(property.city) LIKE :location)' : '1=1', { location: `%${location?.toLowerCase()}%` })
        .select('AVG(property.price)', 'avg')
        .getRawOne();
      
      history.push(parseFloat(monthAvg.avg) || averagePrice);
    }

    return {
      averagePrice,
      trend,
      change: Math.abs(parseFloat(change.toFixed(1))),
      history
    };
  }
}
