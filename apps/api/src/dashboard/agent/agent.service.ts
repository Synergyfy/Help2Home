import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, In } from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { Application } from '../../application/entities/application.entity';
import { User } from '../../users/entities/user.entity';
import { Maintenance } from './maintenance/entities/maintenance.entity';
import { Inspection } from './schedule/entities/inspection.entity';
import { Transaction } from './transactions/entities/transaction.entity';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
    @InjectRepository(Inspection)
    private readonly inspectionRepository: Repository<Inspection>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async getDashboardStats(agentId: string, range: string) {
    try {
      const now = new Date();
      let startDate = new Date();

      switch (range) {
        case '7D':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30D':
          startDate.setDate(now.getDate() - 30);
          break;
        case '3M':
          startDate.setMonth(now.getMonth() - 3);
          break;
        case 'YTD':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate.setDate(now.getDate() - 7);
      }

      // 1. Get Agent's Properties
      const agentProperties = await this.propertyRepository.find({
        where: { ownerId: agentId },
        select: ['id'],
      });
      const propertyIds = agentProperties.map(p => p.id);

      // 2. Active Listings count
      const activeListingsCount = await this.propertyRepository.count({
        where: { 
          ownerId: agentId,
          status: 'available',
          createdAt: MoreThanOrEqual(startDate)
        }
      });

      // 3. Leads (Applications for agent's properties)
      const leadsCount = propertyIds.length > 0 
        ? await this.applicationRepository.count({
            where: { 
              propertyId: In(propertyIds),
              createdAt: MoreThanOrEqual(startDate)
            }
          })
        : 0;

      // 4. Properties Sold/Closed (status: 'sold')
      const soldCount = await this.propertyRepository.count({
        where: { 
          ownerId: agentId,
          status: 'sold',
          createdAt: MoreThanOrEqual(startDate)
        }
      });

      // 5. Total Maintenance Requests
      const maintenanceCount = await this.maintenanceRepository.count({
        where: { 
          agentId,
          createdAt: MoreThanOrEqual(startDate)
        }
      });
      const pendingMaintenance = await this.maintenanceRepository.count({
        where: { agentId, status: 'Pending' }
      });
      
      // 6. Inspections
      const inspectionsCount = await this.inspectionRepository.count({
        where: { 
          agentId,
          createdAt: MoreThanOrEqual(startDate)
        }
      });

      // 7. Commissions from Transactions
      const transactions = await this.transactionRepository.find({
        where: { 
            agentId, 
            status: 'Completed',
            createdAt: MoreThanOrEqual(startDate)
        }
      });
      const totalCommission = transactions.reduce((sum, t) => sum + Number(t.commission), 0);

      // 8. Pending Closings (Under Offer)
      const pendingClosings = await this.propertyRepository.count({
        where: { 
            ownerId: agentId, 
            isUnderOffer: true 
        }
      });

      return {
        totalCommission: `₦${totalCommission.toLocaleString()}`,
        totalCommissionTrend: '+0%',
        activeLeads: leadsCount.toString(),
        activeLeadsTrend: `+${leadsCount} new`,
        propertiesSold: soldCount.toString(),
        pendingClosings: pendingClosings.toString(),
        activeListingsCount: activeListingsCount.toString(),
        maintenanceTasks: maintenanceCount.toString(),
        pendingMaintenance: pendingMaintenance.toString(),
        scheduledInspections: inspectionsCount.toString(),
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve agent dashboard stats', error.message);
    }
  }

  async getHighPerformanceListings(agentId: string) {
    return this.propertyRepository.find({
      where: { ownerId: agentId },
      order: { views: 'DESC' },
      take: 3,
    });
  }

  async getScheduledInspections(agentId: string) {
    return this.inspectionRepository.find({
      where: { agentId, status: 'Scheduled' },
      relations: ['property'],
      order: { date: 'ASC', time: 'ASC' },
      take: 5,
    });
  }

  async getRecentLeads(agentId: string) {
    const agentProperties = await this.propertyRepository.find({
        where: { ownerId: agentId },
        select: ['id'],
    });
    const propertyIds = agentProperties.map(p => p.id);

    if (propertyIds.length === 0) return [];

    return this.applicationRepository.find({
      where: { propertyId: In(propertyIds) },
      order: { createdAt: 'DESC' },
      take: 5,
    });
  }
}
