import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { Maintenance } from '../agent/maintenance/entities/maintenance.entity';
import { User } from '../../users/entities/user.entity';
import { TenantNotification } from '../../users/entities/notification.entity';

@Injectable()
export class CaretakerService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TenantNotification)
    private readonly notificationRepository: Repository<TenantNotification>,
  ) {}

  async getStats(userId: string) {
    const propertyCount = await this.propertyRepository.count({
      where: { caretakerId: userId },
    });

    const properties = await this.propertyRepository.find({
      where: { caretakerId: userId },
      select: ['id'],
    });
    const propertyIds = properties.map((p) => p.id);

    if (propertyIds.length === 0) {
      return {
        properties: 0,
        activeTasks: 0,
        highPriority: 0,
        messages: 0,
      };
    }

    const activeTasks = await this.maintenanceRepository.count({
      where: {
        propertyId: In(propertyIds),
        status: In(['Pending', 'In Progress', 'Accepted']),
      },
    });

    const highPriority = await this.maintenanceRepository.count({
      where: {
        propertyId: In(propertyIds),
        priority: In(['High', 'Critical']),
        status: In(['Pending', 'In Progress', 'Accepted']),
      },
    });

    const messages = await this.notificationRepository.count({
      where: { userId, isRead: false },
    });

    return {
      properties: propertyCount,
      activeTasks,
      highPriority,
      messages,
    };
  }

  async getProperties(userId: string) {
    return this.propertyRepository.find({
      where: { caretakerId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async getTasks(userId: string, status?: string) {
    const properties = await this.propertyRepository.find({
      where: { caretakerId: userId },
      select: ['id'],
    });
    const propertyIds = properties.map((p) => p.id);

    if (propertyIds.length === 0) return [];

    const where: any = {
      propertyId: In(propertyIds),
    };

    if (status && status !== 'All') {
        where.status = status;
    }

    return this.maintenanceRepository.find({
      where,
      relations: ['property', 'tenant'],
      order: { createdAt: 'DESC' },
    });
  }

  async getPartners(userId: string) {
    const properties = await this.propertyRepository.find({
      where: { caretakerId: userId },
      relations: ['owner', 'agent'],
    });

    const partnersMap = new Map<string, any>();

    properties.forEach((p) => {
      if (p.owner) {
        partnersMap.set(p.owner.id, {
          id: p.owner.id,
          name: `${p.owner.firstName} ${p.owner.lastName}`,
          role: 'Landlord',
          email: p.owner.email,
          phone: p.owner.phone || 'N/A',
          status: 'Active',
          joinedDate: p.owner.createdAt,
        });
      }
      if (p.agent) {
        partnersMap.set(p.agent.id, {
          id: p.agent.id,
          name: `${p.agent.firstName} ${p.agent.lastName}`,
          role: 'Agent',
          email: p.agent.email,
          phone: p.agent.phone || 'N/A',
          status: 'Active',
          joinedDate: p.agent.createdAt,
        });
      }
    });

    // Enriched with property counts for the caretaker
    const partners = Array.from(partnersMap.values());
    const enrichedPartners = await Promise.all(partners.map(async (partner) => {
        const count = await this.propertyRepository.count({
            where: [
                { caretakerId: userId, ownerId: partner.id },
                { caretakerId: userId, agentId: partner.id }
            ]
        });
        return { ...partner, properties: count };
    }));

    return enrichedPartners;
  }

  async getActivity(userId: string) {
    const properties = await this.propertyRepository.find({
      where: { caretakerId: userId },
      select: ['id'],
    });
    const propertyIds = properties.map((p) => p.id);

    if (propertyIds.length === 0) return [];

    const tasks = await this.maintenanceRepository.find({
      where: { propertyId: In(propertyIds) },
      relations: ['property'],
      order: { updatedAt: 'DESC' },
      take: 10,
    });

    return tasks.map((t) => ({
      id: t.id,
      title: t.category,
      description: `${t.status} - ${t.property.title}`,
      time: t.updatedAt,
      type: 'maintenance',
    }));
  }
}
