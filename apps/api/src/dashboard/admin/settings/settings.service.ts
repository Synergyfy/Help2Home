import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformSettings } from './entities/platform-settings.entity';

@Injectable()
export class AdminSettingsService {
  constructor(
    @InjectRepository(PlatformSettings)
    private readonly settingsRepository: Repository<PlatformSettings>,
  ) {}

  async findAll() {
    return this.settingsRepository.find({ order: { key: 'ASC' } });
  }

  async upsert(adminId: string, key: string, value: string, description?: string) {
    let setting = await this.settingsRepository.findOne({ where: { key } });
    if (!setting) {
      setting = this.settingsRepository.create({ key, value, description, updatedBy: adminId });
    } else {
      setting.value = value;
      setting.updatedBy = adminId;
      if (description) setting.description = description;
    }
    return this.settingsRepository.save(setting);
  }
}