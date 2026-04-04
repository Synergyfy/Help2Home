import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('dashboard/admin')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get overview dashboard statistics for the admin' })
  @ApiQuery({ name: 'range', required: false, enum: ['7D', '30D', '3M', 'YTD'] })
  @ApiResponse({ status: 200, description: 'Dashboard stats returned successfully' })
  async getDashboardStats(@Query('range') range: string = '7D') {
    return this.adminService.getDashboardStats(range);
  }
}
