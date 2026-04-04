import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentSettings } from './entities/agent-settings.entity';

@Injectable()
export class AgentSettingsService {
  constructor(
    @InjectRepository(AgentSettings)
    private readonly agentSettingsRepository: Repository<AgentSettings>,
  ) {}

  async getSettings(agentId: string) {
    let settings = await this.agentSettingsRepository.findOne({
      where: { userId: agentId },
    });

    // Lazy initialization: Create default settings if they don't exist
    if (!settings) {
      settings = this.agentSettingsRepository.create({
        userId: agentId,
        notifications: true,
        newsletter: false,
        theme: 'light',
      });
      await this.agentSettingsRepository.save(settings);
    }

    return settings;
  }

  async updateSettings(agentId: string, updateData: Partial<AgentSettings>) {
    const settings = await this.getSettings(agentId);
    
    // Whitelist allowed fields to prevent accidental overwrites of userId/id
    const { notifications, newsletter, theme } = updateData;
    
    if (notifications !== undefined) settings.notifications = notifications;
    if (newsletter !== undefined) settings.newsletter = newsletter;
    if (theme !== undefined) settings.theme = theme;

    return this.agentSettingsRepository.save(settings);
  }
}
