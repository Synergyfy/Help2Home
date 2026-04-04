import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { ApplicationDocument } from './entities/application-document.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(ApplicationDocument)
    private applicationDocumentRepository: Repository<ApplicationDocument>,
  ) {}

  async findByTenant(tenantId: string) {
    const applications = await this.applicationRepository.find({
      where: { tenantId },
      relations: ['property', 'documents', 'contracts', 'activityLogs', 'landlord'],
      order: { submittedAt: 'DESC' },
    });
    return applications.map(app => this.enrichWithCalculations(app));
  }

  async findByLandlord(landlordId: string) {
    const applications = await this.applicationRepository.find({
      where: { landlordId },
      relations: ['property', 'documents', 'contracts', 'activityLogs', 'landlord'],
      order: { submittedAt: 'DESC' },
    });
    return applications.map(app => this.enrichWithCalculations(app));
  }

  async findById(id: string) {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ['property', 'documents', 'contracts', 'activityLogs', 'landlord'],
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return this.enrichWithCalculations(application);
  }

  private enrichWithCalculations(application: any) {
    const propertyPrice = Number(application.property?.price || 0);
    const downPaymentPercent = application.financing?.downPaymentPercent || 0;
    const repaymentDuration = application.financing?.repaymentDuration || 1;

    const downPayment = (downPaymentPercent / 100) * propertyPrice;
    const remainingAmount = propertyPrice - downPayment;
    const monthlyRent = remainingAmount / repaymentDuration;

    return {
      ...application,
      calculations: {
        downPayment,
        monthlyRent,
        propertyPrice,
        repaymentDuration,
      },
    };
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

  async addDocument(applicationId: string, data: Partial<ApplicationDocument>) {
    const document = this.applicationDocumentRepository.create({
      ...data,
      applicationId,
    });
    return this.applicationDocumentRepository.save(document);
  }
}
