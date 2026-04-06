import { Controller, Get, Param, UseGuards, Put, Body, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { LandlordMaintenanceService } from './maintenance.service';

@ApiTags('landlord/maintenance')
@Controller('dashboard/landlord/maintenance')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.LANDLORD)
@ApiBearerAuth()
export class LandlordMaintenanceController {
  constructor(private readonly maintenanceService: LandlordMaintenanceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all maintenance requests for landlord\'s properties' })
  @ApiResponse({ status: 200, description: 'List of maintenance requests' })
  async findAll(@GetCurrentUser('sub') landlordId: string) {
    return this.maintenanceService.findAllByLandlord(landlordId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new maintenance request (Internal)' })
  async create(@GetCurrentUser('sub') landlordId: string, @Body() data: any) {
    return this.maintenanceService.create({ ...data, landlordId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a maintenance request' })
  async findOne(@Param('id') id: string) {
    return this.maintenanceService.findById(id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update status of a maintenance request' })
  async updateStatus(
    @Param('id') id: string,
    @Body() data: { status: string; cost?: number; reason?: string; artisanId?: string }
  ) {
    return this.maintenanceService.updateStatus(id, data.status, data.cost, data.reason, data.artisanId);
  }
}
