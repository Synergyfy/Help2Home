import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyService } from '../property/property.service';
import { TenantService } from '../tenant/tenant.service';
import { UsersService } from '../users/users.service';
import { ApplicationService } from '../application/application.service';

@Injectable()
export class LandlordService {
  constructor(
    private propertyService: PropertyService,
    private tenantService: TenantService,
    private usersService: UsersService,
    private applicationService: ApplicationService,
  ) {}

  async getDashboardStats(userId: string) {
    const propertiesCount = await this.propertyService.countByOwner(userId);
    const tenantsCount = await this.tenantService.countActiveByLandlord(userId);

    // Mocking some stats for now as requested by the dashboard UI
    return {
      summary: [
        {
          id: 'total-properties',
          label: 'Total Properties',
          value: propertiesCount.toString(),
          subtitle: 'Active listings',
          trend: 'up',
          trendValue: '12%',
          status: 'success',
        },
        {
          id: 'active-tenants',
          label: 'Active Tenants',
          value: tenantsCount.toString(),
          subtitle: 'Across all properties',
          trend: 'neutral',
          trendValue: '0%',
          status: 'neutral',
        },
        {
          id: 'total-revenue',
          label: 'Total Revenue',
          value: '₦0.00',
          subtitle: 'Current month',
          trend: 'up',
          trendValue: '0%',
          status: 'success',
        },
      ],
      tasks: [
        {
          id: '1',
          title: 'Complete your profile',
          description: 'Add your bank details to receive payments',
          priority: 'high',
          dueDate: 'ASAP',
          category: 'Profile',
        },
      ],
      payments: [],
      verification: [
        {
          id: 'identity',
          name: 'Identity Verification',
          status: 'pending',
          icon: 'User',
        },
        {
          id: 'ownership',
          name: 'Property Ownership',
          status: 'not_started',
          icon: 'Home',
        },
      ],
      activities: [],
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