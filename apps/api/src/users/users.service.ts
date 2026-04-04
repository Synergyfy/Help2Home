import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { TenantNotification } from './entities/notification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TenantNotification)
    private notificationRepository: Repository<TenantNotification>,
  ) {}

  async getNotifications(userId: string) {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markNotificationAsRead(id: string, userId: string) {
    await this.notificationRepository.update({ id, userId }, { isRead: true });
    return { success: true };
  }

  async markAllNotificationsAsRead(userId: string) {
    await this.notificationRepository.update({ userId }, { isRead: true });
    return { success: true };
  }

  async clearNotification(id: string, userId: string) {
    await this.notificationRepository.delete({ id, userId });
    return { success: true };
  }

  async clearAllNotifications(userId: string) {
    await this.notificationRepository.delete({ userId });
    return { success: true };
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async getProfile(userId: string) {
    const user = await this.findById(userId);

    return {
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        verified: user.verified,
        roles: user.roles,
        avatar: null, // Placeholder
        address: '', // Placeholder
        bio: '', // Placeholder
      },
    };
  }
}
