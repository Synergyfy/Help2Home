import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { AgentService } from './agent.service';
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator';

@ApiTags('agent')
@Controller('dashboard/agent')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get overview dashboard statistics for the agent' })
  @ApiQuery({ name: 'range', required: false, enum: ['7D', '30D', '3M', 'YTD'] })
  @ApiResponse({ status: 200, description: 'Agent dashboard stats returned successfully' })
  async getDashboardStats(
    @GetCurrentUser('sub') agentId: string,
    @Query('range') range: string = '7D'
  ) {
    return this.agentService.getDashboardStats(agentId, range);
  }

  @Get('listings')
  @ApiOperation({ summary: 'Get high-performance listings for the agent' })
  @ApiResponse({ status: 200, description: 'Agent listings returned successfully' })
  async getHighPerformanceListings(@GetCurrentUser('sub') agentId: string) {
    return this.agentService.getHighPerformanceListings(agentId);
  }

  @Get('inspections')
  @ApiOperation({ summary: 'Get scheduled inspections for the agent' })
  @ApiResponse({ status: 200, description: 'Agent inspections returned successfully' })
  async getScheduledInspections(@GetCurrentUser('sub') agentId: string) {
    return this.agentService.getScheduledInspections(agentId);
  }

  @Get('leads')
  @ApiOperation({ summary: 'Get recent leads for the agent' })
  @ApiResponse({ status: 200, description: 'Agent leads returned successfully' })
  async getRecentLeads(@GetCurrentUser('sub') agentId: string) {
    return this.agentService.getRecentLeads(agentId);
  }
}
