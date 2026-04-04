import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyService } from '../../property/property.service';
import { TenantService } from '../../tenant/tenant.service';
import { UsersService } from '../../users/users.service';
import { ApplicationService } from '../../application/application.service';
import { LandlordMaintenanceService } from './maintenance/maintenance.service';
import { LandlordPaymentsService } from './payments/payments.service';
import { LandlordContractsService } from './contracts/contracts.service';

@Injectable()
export class LandlordService {
  constructor(
    private propertyService: PropertyService,
    private tenantService: TenantService,
    private usersService: UsersService,
    private applicationService: ApplicationService,
    private maintenanceService: LandlordMaintenanceService,
    private paymentsService: LandlordPaymentsService,
    private contractsService: LandlordContractsService,
  ) {}

  async getDashboardStats(userId: string) {
    const [propertiesCount, tenantsCount, payments, maintenanceRequests, applications, user] = await Promise.all([
      this.propertyService.countByOwner(userId),
      this.tenantService.countActiveByLandlord(userId),
      this.paymentsService.getPayments(userId),
      this.maintenanceService.findAllByLandlord(userId),
      this.applicationService.findByLandlord(userId),
      this.usersService.findById(userId),
    ]);

    // Calculate Total Revenue (Success/Cleared payments this month)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const revenueThisMonth = payments
      .filter(p => p.status === 'Cleared' && new Date(p.date) >= startOfMonth)
      .reduce((sum, p) => sum + Number(p.amount), 0);

    // Format revenue
    const formattedRevenue = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(revenueThisMonth);

    // Aggregate Tasks
    const tasks = [
      ...maintenanceRequests
        .filter(m => m.status === 'Pending' || m.status === 'In Progress')
        .map(m => ({
          id: m.id,
          title: `Maintenance: ${m.category || 'Repair'}`,
          description: m.description,
          priority: m.priority.toLowerCase(),
          dueDate: 'Action Required',
          category: 'Maintenance',
          property: m.property?.title || 'Unknown Property',
          link: `/dashboard/landlord/maintenance/${m.id}`,
          actionLabel: 'View Request'
        })),
      ...applications
        .filter(a => a.status === 'Pending')
        .map(a => ({
          id: a.id,
          title: `New Application`,
          description: `Application for ${a.propertyTitle || 'a property'}`,
          priority: 'medium',
          dueDate: 'Needs Review',
          category: 'Application',
          property: a.propertyTitle || 'Unknown Property',
          link: `/dashboard/landlord/applications`,
          actionLabel: 'Review'
        }))
    ];

    // Verification Status (derived from real user/profile data if available)
    const verification = [
      {
        id: 'identity',
        name: 'Identity Verification',
        status: user.verified ? 'verified' : 'pending',
        icon: 'User',
      },
      {
        id: 'ownership',
        name: 'Property Ownership',
        status: propertiesCount > 0 ? 'verified' : 'not_started',
        icon: 'Home',
      },
    ];

    // Activity Feed (combine recent events)
    const activities = [
      ...applications.slice(0, 3).map(a => ({
        id: `app-${a.id}`,
        type: 'application',
        message: `New application received for ${a.propertyTitle}`,
        timestamp: new Date(a.submittedAt).toLocaleString(),
        isRead: false,
        actionUrl: '/dashboard/landlord/applications'
      })),
      ...payments.slice(0, 3).map(p => ({
        id: `pay-${p.id}`,
        type: 'payment',
        message: `Payment of ${p.amount} received from ${p.tenant?.firstName || 'Tenant'}`,
        timestamp: new Date(p.date).toLocaleString(),
        isRead: true,
        actionUrl: '/dashboard/landlord/payments'
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return {
      summary: [
        {
          id: 'total-properties',
          label: 'Total Properties',
          value: propertiesCount.toString(),
          subtitle: 'Active listings',
          trend: 'up',
          trendValue: '',
          status: 'success',
        },
        {
          id: 'active-tenants',
          label: 'Active Tenants',
          value: tenantsCount.toString(),
          subtitle: 'Across all properties',
          trend: 'neutral',
          trendValue: '',
          status: 'neutral',
        },
        {
          id: 'total-revenue',
          label: 'Total Revenue',
          value: formattedRevenue,
          subtitle: 'Current month',
          trend: 'up',
          trendValue: '',
          status: 'success',
        },
      ],
      tasks: tasks.slice(0, 5),
      payments: payments.slice(0, 5).map(p => ({
        id: p.id,
        date: new Date(p.date).toLocaleDateString(),
        property: p.property?.title || 'Unknown',
        tenant: `${p.tenant?.firstName || ''} ${p.tenant?.lastName || ''}`.trim() || 'Tenant',
        amount: Number(p.amount),
        status: p.status
      })),
      verification,
      activities: activities.slice(0, 5),
    };
  }

  // Delegated methods for backward compatibility or landlord-specific views
  async getProperties(userId: string) {
    return this.propertyService.findByOwner(userId);
  }

  async createProperty(userId: string, data: any) {
    return this.propertyService.create(userId, data);
  }

  async getProfile(userId: string) {
    return this.usersService.getProfile(userId);
  }

  async getTenants(landlordId: string) {
    return this.tenantService.findByLandlord(landlordId);
  }

  async addTenant(landlordId: string, dto: any) {
    return this.tenantService.create(landlordId, dto);
  }

  async updateTenant(landlordId: string, id: string, dto: any) {
    return this.tenantService.update(id, landlordId, dto);
  }

  async deleteTenant(landlordId: string, id: string) {
    return this.tenantService.remove(id, landlordId);
  }

  async getApplications(userId: string, role: 'tenant' | 'landlord') {
    if (role === 'tenant') {
      return this.applicationService.findByTenant(userId);
    } else {
      return this.applicationService.findByLandlord(userId);
    }
  }

  async updateApplicationStatus(landlordId: string, id: string, status: string) {
    return this.applicationService.updateStatus(id, landlordId, status);
  }
}