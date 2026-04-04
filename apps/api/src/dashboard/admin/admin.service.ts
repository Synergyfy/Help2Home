import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../property/entities/property.entity';
import { Application } from '../../application/entities/application.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async getDashboardStats(range: string) {
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

      // Fetch counts dynamically based on the calculated range
      const totalUsers = await this.userRepository.count({
        where: { createdAt: MoreThanOrEqual(startDate) }
      });
      const activeListings = await this.propertyRepository.count({
        where: { 
          status: 'available',
          createdAt: MoreThanOrEqual(startDate)
        }
      });
      const pendingApps = await this.applicationRepository.count({
        where: { 
          status: 'pending',
          createdAt: MoreThanOrEqual(startDate)
        }
      });

      // Returning placeholder data matching what the frontend expects
      return {
        totalUsers: totalUsers.toString(),
        totalUsersTrend: '+0%',
        activeListings: activeListings.toString(),
        activeListingsTrend: '+0%',
        pendingApps: pendingApps.toString(),
        pendingAppsTrend: 'Review Needed',
        ytdRevenue: '₦0.00', // Mocked until payment module exists
        ytdRevenueTrend: '+0%',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve dashboard stats', error.message);
    }
  }

}
