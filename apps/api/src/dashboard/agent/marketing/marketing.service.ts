import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class MarketingService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async getOverview(agentId: string) {
    const campaigns = await this.campaignRepository.find({ where: { agentId } });
    
    return {
      campaigns: campaigns.length,
      leadsGenerated: campaigns.reduce((sum, c) => sum + c.leadsGenerated, 0),
      reach: campaigns.reduce((sum, c) => sum + c.reach, 0),
      totalBudget: campaigns.reduce((sum, c) => sum + Number(c.budget), 0),
    };
  }

  async runCampaign(agentId: string, data: Partial<Campaign>) {
    const campaign = this.campaignRepository.create({ ...data, agentId });
    return this.campaignRepository.save(campaign);
  }

  async stopCampaign(id: string) {
    const campaign = await this.campaignRepository.findOne({ where: { id } });
    if (!campaign) throw new NotFoundException('Campaign not found');
    campaign.status = 'Completed';
    return this.campaignRepository.save(campaign);
  }
}
