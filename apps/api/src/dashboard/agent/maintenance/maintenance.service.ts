import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance } from './entities/maintenance.entity';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
  ) {}

  async create(data: Partial<Maintenance>) {
    const maintenance = this.maintenanceRepository.create(data);
    return this.maintenanceRepository.save(maintenance);
  }

  async findAllByAgent(agentId: string) {
    return this.maintenanceRepository.find({
      where: { agentId },
      relations: ['property', 'tenant'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllByProperty(propertyId: string) {
    return this.maintenanceRepository.find({
      where: { propertyId },
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

  async updateStatus(id: string, status: string, cost?: number) {
    const maintenance = await this.findById(id);
    maintenance.status = status;
    if (cost !== undefined) maintenance.cost = cost;
    if (status === 'Resolved') {
      maintenance.resolvedAt = new Date();
    }
    return this.maintenanceRepository.save(maintenance);
  }

  async countByAgent(agentId: string, status?: string) {
    const where: any = { agentId };
    if (status) where.status = status;
    return this.maintenanceRepository.count({ where });
  }
}
