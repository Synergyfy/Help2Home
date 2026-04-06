import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto, UpdateTenantDto } from './dto/tenant.dto';
import { MaintenanceService } from '../dashboard/agent/maintenance/maintenance.service';
import { InspectionService } from '../dashboard/agent/schedule/inspection.service';
import { TransactionService } from '../dashboard/agent/transactions/transactions.service';
import { ApplicationService } from '../application/application.service';
import { AdminSupportService } from '../dashboard/admin/support/support.service';
import { AdminEducationService } from '../dashboard/admin/education/education.service';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private maintenanceService: MaintenanceService,
    private inspectionService: InspectionService,
    private transactionService: TransactionService,
    private applicationService: ApplicationService,
    private supportService: AdminSupportService,
    private educationService: AdminEducationService,
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

  async findByUserId(userId: string) {
    return this.tenantRepository.findOne({
      where: { userId },
      relations: ['property', 'landlord'],
    });
  }

  async getDashboardStats(userId: string) {
    const tenant = await this.findByUserId(userId);
    if (!tenant) throw new NotFoundException('Tenant record not found for this user');

    // 1. Maintenance
    const maintenanceRequests = await this.maintenanceService.findAllByProperty(tenant.propertyId);
    const pendingMaintenance = maintenanceRequests.filter(r => r.status === 'Pending').length;

    // 2. Inspections
    const inspections = await this.inspectionService.findAllByProperty(tenant.propertyId);
    const upcomingInspections = inspections.filter(i => i.status === 'Scheduled').length;

    // 3. Applications
    const applications = await this.applicationService.findByTenant(userId);
    const ongoingApplications = applications.filter(a => ['Pending', 'Under Review'].includes(a.status)).length;
    const approvedHomes = applications.filter(a => ['Approved', 'Funded'].includes(a.status)).length;

    // 4. Support (Unread Messages)
    // We filter tickets assigned to this user that are not closed
    const tickets = await this.supportService.findAll(); // Should eventually filter by userId if supported
    const unreadMessages = tickets.filter(t => t.status !== 'Closed').length;

    // 5. Education
    const educationItems = await this.educationService.findAll();
    const latestEducation = educationItems[0] || null;

    // 6. Simplified Repayments
    const rentAmount = tenant.property?.price || Number((tenant as any).rentAmount) || 0;
    
    let progress = 0;
    if (tenant.paymentStatus === 'Up to date' || rentAmount === 0) {
      progress = 100;
    } else if (tenant.paymentStatus === 'Pending') {
      progress = 50;
    }

    const nextRepayment = {
      amount: rentAmount,
      dueDate: tenant.leaseEnd || 'Flexible',
    };

    return {
      property: tenant.property || { title: tenant.propertyName },
      leaseEnd: tenant.leaseEnd,
      paymentStatus: tenant.paymentStatus,
      pendingMaintenance,
      upcomingInspections,
      ongoingApplications,
      approvedHomes,
      unreadMessages,
      latestEducation,
      nextRepayment,
      repaymentProgress: progress,
    };
  }
}
