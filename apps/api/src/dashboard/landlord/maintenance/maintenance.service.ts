import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance } from '../../agent/maintenance/entities/maintenance.entity';

@Injectable()
export class LandlordMaintenanceService {
  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
  ) {}

  async create(data: Partial<Maintenance>) {
    const maintenance = this.maintenanceRepository.create(data);
    return this.maintenanceRepository.save(maintenance);
  }

  async findAllByLandlord(landlordId: string) {
    return this.maintenanceRepository.find({
      where: { landlordId },
      relations: ['property', 'tenant'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string) {
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id },
      relations: ['property', 'tenant'],
    });
    if (!maintenance) throw new NotFoundException('Maintenance request not found');
    return maintenance;
  }

  async updateStatus(id: string, status: string, cost?: number, reason?: string, artisanId?: string) {
    const maintenance = await this.findById(id);
    maintenance.status = status;
    if (cost !== undefined) maintenance.cost = Number(cost);
    if (reason !== undefined) maintenance.rejectionReason = reason;
    if (artisanId !== undefined) maintenance.assignedArtisanId = artisanId;
    if (status === 'Resolved' || status === 'Completed') {
      maintenance.resolvedAt = new Date();
    }
    return this.maintenanceRepository.save(maintenance);
  }

  async countByLandlord(landlordId: string, status?: string) {
    const where: any = { landlordId };
    if (status) where.status = status;
    return this.maintenanceRepository.count({ where });
  }
}
