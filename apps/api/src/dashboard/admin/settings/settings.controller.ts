import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { AdminSettingsService } from './settings.service';

@ApiTags('admin/settings')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('dashboard/admin/settings')
export class AdminSettingsController {
  constructor(private readonly settingsService: AdminSettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all platform settings' })
  findAll() { return this.settingsService.findAll(); }

  @Patch()
  @ApiOperation({ summary: 'Create or update a platform setting' })
  upsert(
    @GetCurrentUser('sub') adminId: string,
    @Body('key') key: string,
    @Body('value') value: string,
    @Body('description') description?: string,
  ) {
    return this.settingsService.upsert(adminId, key, value, description);
  }
}
