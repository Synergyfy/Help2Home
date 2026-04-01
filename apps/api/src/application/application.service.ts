import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async findByTenant(tenantId: string) {
    return this.applicationRepository.find({
      where: { tenantId },
      order: { submittedAt: 'DESC' },
    });
  }

  async findByLandlord(landlordId: string) {
    return this.applicationRepository.find({
      where: { landlordId },
      order: { submittedAt: 'DESC' },
    });
  }

  async findById(id: string) {
    const application = await this.applicationRepository.findOne({
      where: { id },
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  }

  async updateStatus(id: string, landlordId: string, status: string) {
    const application = await this.applicationRepository.findOne({
      where: { id, landlordId },
    });
    if (!application) throw new NotFoundException('Application not found');
    
    application.status = status;
    return this.applicationRepository.save(application);
  }

  async create(data: Partial<Application>) {
    const application = this.applicationRepository.create(data);
    return this.applicationRepository.save(application);
  }
}
