import { Controller, Post, Body, UseGuards, Get, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { PropertyService } from '../../../property/property.service';

@ApiTags('admin/listing')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('dashboard/admin/listing')
export class AdminListingController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @ApiOperation({ summary: 'Admin creates a new property listing directly' })
  create(@GetCurrentUser('sub') userId: string, @Body() data: any) {
    return this.propertyService.create(userId, { ...data, posterRole: 'admin' });
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get all properties awaiting moderation' })
  getPending() {
    return this.propertyService.findPending();
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a property submission' })
  approve(@Param('id') id: string) {
    return this.propertyService.approve(id);
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject a property submission' })
  reject(@Param('id') id: string) {
    return this.propertyService.reject(id);
  }
}
