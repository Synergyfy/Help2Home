import { Controller, Get, Param, UseGuards, Put, Body, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { MaintenanceService } from './maintenance.service';

@ApiTags('agent/maintenance')
@Controller('dashboard/agent/maintenance')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentMaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all maintenance requests for agent\'s properties' })
  @ApiResponse({ status: 200, description: 'List of maintenance requests' })
  async findAll(@GetCurrentUser('sub') agentId: string) {
    return this.maintenanceService.findAllByAgent(agentId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new maintenance request (Internal)' })
  async create(@GetCurrentUser('sub') agentId: string, @Body() data: any) {
    return this.maintenanceService.create({ ...data, agentId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a maintenance request' })
  async findOne(@Param('id') id: string) {
    return this.maintenanceService.findById(id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update status of a maintenance request' })
  async updateStatus(@Param('id') id: string, @Body() data: { status: string; cost?: number }) {
    return this.maintenanceService.updateStatus(id, data.status, data.cost);
  }
}
