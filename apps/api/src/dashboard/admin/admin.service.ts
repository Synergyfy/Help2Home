import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../property/entities/property.entity';
import { Application } from '../../application/entities/application.entity';
import { AuditLog } from './audit/entities/audit-log.entity';
import { SupportTicket } from './support/entities/support-ticket.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
    @InjectRepository(SupportTicket)
    private readonly supportTicketRepository: Repository<SupportTicket>,
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

      // Fetch total platform counts (all-time, not range-filtered)
      const totalUsers = await this.userRepository.count();
      const activeListings = await this.propertyRepository.count({
        where: { status: 'available' }
      });
      const pendingApps = await this.applicationRepository.count({
        where: { status: 'Pending' }
      });

      // New users in the selected range (for trend)
      const newUsersInRange = await this.userRepository.count({
        where: { createdAt: MoreThanOrEqual(startDate) }
      });

      // Fetch Recent Users
      const recentUsers = await this.userRepository.find({
        order: { createdAt: 'DESC' },
        take: 5
      });

      // Fetch Moderation Queue (Properties with 'pending' status)
      const moderationQueue = await this.propertyRepository.find({
        where: { status: 'pending' },
        order: { createdAt: 'DESC' },
        take: 3,
        relations: ['owner']
      });

      // Fetch Activity logs
      const activityLogs = await this.auditLogRepository.find({
        order: { createdAt: 'DESC' },
        take: 5
      });

      // Fetch Support Tracker
      const supportTickets = await this.supportTicketRepository.find({
        order: { createdAt: 'DESC' },
        take: 3
      });

      // Returning dynamic data matching what the frontend expects
      return {
        stats: {
          totalUsers: totalUsers.toString(),
          totalUsersTrend: `+${newUsersInRange} new`,
          activeListings: activeListings.toString(),
          activeListingsTrend: '+0%',
          pendingApps: pendingApps.toString(),
          pendingAppsTrend: 'Review Needed',
          ytdRevenue: '₦0.00', // Mocked until payment module exists
          ytdRevenueTrend: '+0%',
        },
        recentUsers: recentUsers.map(u => ({
          id: u.id,
          name: `${u.firstName} ${u.lastName}`,
          email: u.email,
          role: u.roles[0],
          status: u.isActive ? 'Active' : 'Inactive',
          joined: u.createdAt.toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })
        })),
        moderationQueue: moderationQueue.map(p => ({
          id: p.id,
          title: p.title,
          user: (p as any).owner ? `${(p as any).owner.firstName} ${(p as any).owner.lastName}` : 'Unknown Owner',
          time: p.createdAt.toLocaleDateString('en-NG', { hour: 'numeric', minute: 'numeric' }),
          status: 'New Submission'
        })),
        activityLogs: activityLogs.map(l => ({
          id: l.id,
          time: l.createdAt.toLocaleTimeString(),
          text: l.action.replace(/_/g, ' ').toLowerCase(),
          isPrimary: l.action.includes('CREATED')
        })),
        supportTracker: supportTickets.map(t => ({
          id: t.id,
          title: t.title,
          status: t.status,
          priority: t.priority,
          time: t.createdAt.toLocaleTimeString()
        }))
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve dashboard stats', error.message);
    }
  }

}
