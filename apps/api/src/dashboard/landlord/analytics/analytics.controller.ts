import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { AnalyticsService } from './analytics.service';

@ApiTags('landlord/analytics')
@Controller('dashboard/landlord/analytics')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.LANDLORD)
@ApiBearerAuth()
export class LandlordAnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  @ApiOperation({ summary: 'Get comprehensive landlord analytics' })
  async getAnalytics(@GetCurrentUser('sub') landlordId: string) {
    return this.analyticsService.getLandlordAnalytics(landlordId);
  }
}
