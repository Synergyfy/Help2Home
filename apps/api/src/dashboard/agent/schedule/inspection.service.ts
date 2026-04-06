import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inspection } from './entities/inspection.entity';

@Injectable()
export class InspectionService {
  constructor(
    @InjectRepository(Inspection)
    private readonly inspectionRepository: Repository<Inspection>,
  ) {}

  async create(data: Partial<Inspection>) {
    const inspection = this.inspectionRepository.create(data);
    return this.inspectionRepository.save(inspection);
  }

  async findByAgent(agentId: string) {
    return this.inspectionRepository.find({
      where: { agentId },
      relations: ['property'],
      order: { date: 'DESC', time: 'ASC' },
    });
  }

  async findAllByProperty(propertyId: string) {
    return this.inspectionRepository.find({
      where: { propertyId },
      relations: ['property'],
      order: { date: 'ASC', time: 'ASC' },
    });
  }

  async findById(id: string) {
    const inspection = await this.inspectionRepository.findOne({
      where: { id },
      relations: ['property'],
    });
    if (!inspection) throw new NotFoundException('Inspection not found');
    return inspection;
  }

  async updateStatus(id: string, status: string, notes?: string) {
    const inspection = await this.findById(id);
    inspection.status = status;
    if (notes) inspection.notes = notes;
    return this.inspectionRepository.save(inspection);
  }

  async countByAgent(agentId: string, status?: string) {
    const where: any = { agentId };
    if (status) where.status = status;
    return this.inspectionRepository.count({ where });
  }
}
