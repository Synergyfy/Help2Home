import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto, UpdateTenantDto } from './dto/tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async findAll() {
    return this.tenantRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findByLandlord(landlordId: string) {
    return this.tenantRepository.find({
      where: { landlordId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string) {
    const tenant = await this.tenantRepository.findOne({
      where: { id },
    });
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    return tenant;
  }

  async create(landlordId: string, dto: CreateTenantDto) {
    const tenant = this.tenantRepository.create({
      ...dto,
      landlordId,
    });
    return this.tenantRepository.save(tenant);
  }

  async update(id: string, landlordId: string, dto: UpdateTenantDto) {
    const tenant = await this.tenantRepository.findOne({
      where: { id, landlordId },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
    
    Object.assign(tenant, dto);
    return this.tenantRepository.save(tenant);
  }

  async remove(id: string, landlordId: string) {
    const tenant = await this.tenantRepository.findOne({
      where: { id, landlordId },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
    await this.tenantRepository.remove(tenant);
    return { success: true };
  }

  async countActiveByLandlord(landlordId: string) {
    return this.tenantRepository.count({
      where: { landlordId, status: 'Active' },
    });
  }
}
