import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { InspectionService } from './inspection.service';

@ApiTags('agent/schedule')
@Controller('dashboard/agent/schedule')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentScheduleController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all scheduled inspections for the agent' })
  @ApiResponse({ status: 200, description: 'List of scheduled inspections' })
  async findAll(@GetCurrentUser('sub') agentId: string) {
    return this.inspectionService.findByAgent(agentId);
  }

  @Post()
  @ApiOperation({ summary: 'Schedule a new inspection' })
  async create(@GetCurrentUser('sub') agentId: string, @Body() data: any) {
    return this.inspectionService.create({ ...data, agentId });
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update status of an inspection' })
  async updateStatus(@Param('id') id: string, @Body() data: { status: string; notes?: string }) {
    return this.inspectionService.updateStatus(id, data.status, data.notes);
  }
}
