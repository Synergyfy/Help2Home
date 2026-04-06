import { Controller, Get, Body, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { AgentSettingsService } from './settings.service';

@ApiTags('agent/settings')
@Controller('dashboard/agent/settings')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentSettingsController {
  constructor(private readonly settingsService: AgentSettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get agent-specific settings' })
  @ApiResponse({ status: 200, description: 'Settings values' })
  async getSettings(@GetCurrentUser('sub') agentId: string) {
    return this.settingsService.getSettings(agentId);
  }

  @Put()
  @ApiOperation({ summary: 'Update agent settings' })
  async updateSettings(@GetCurrentUser('sub') agentId: string, @Body() data: any) {
    return this.settingsService.updateSettings(agentId, data);
  }
}
