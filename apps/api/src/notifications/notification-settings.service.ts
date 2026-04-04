import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationSettings } from './entities/notification-settings.entity';

@Injectable()
export class NotificationSettingsService {
  constructor(
    @InjectRepository(NotificationSettings)
    private readonly settingsRepo: Repository<NotificationSettings>,
  ) {}

  async getSettings(userId: string): Promise<NotificationSettings> {
    let settings = await this.settingsRepo.findOne({ where: { userId } });
    if (!settings) {
      // Create default settings on first access
      settings = this.settingsRepo.create({ userId });
      settings = await this.settingsRepo.save(settings);
    }
    return settings;
  }

  async updateSettings(userId: string, data: Partial<NotificationSettings>): Promise<NotificationSettings> {
    let settings = await this.getSettings(userId);
    Object.assign(settings, data);
    return this.settingsRepo.save(settings);
  }
}
