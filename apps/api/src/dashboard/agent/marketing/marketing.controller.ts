import { Controller, Get, Post, Body, UseGuards, Put, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { MarketingService } from './marketing.service';

@ApiTags('agent/marketing')
@Controller('dashboard/agent/marketing')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentMarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Get()
  @ApiOperation({ summary: 'Get agent marketing campaigns overview' })
  @ApiResponse({ status: 200, description: 'Marketing summary' })
  async getOverview(@GetCurrentUser('sub') agentId: string) {
    return this.marketingService.getOverview(agentId);
  }

  @Post('campaign')
  @ApiOperation({ summary: 'Run a new marketing campaign' })
  async runCampaign(@GetCurrentUser('sub') agentId: string, @Body() data: any) {
    return this.marketingService.runCampaign(agentId, data);
  }

  @Put('campaign/:id/stop')
  @ApiOperation({ summary: 'Stop a marketing campaign' })
  async stopCampaign(@Param('id') id: string) {
    return this.marketingService.stopCampaign(id);
  }
}
