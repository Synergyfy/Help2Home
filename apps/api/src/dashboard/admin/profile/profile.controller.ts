import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { ProfileService } from '../../../profile/profile.service';
import { UpdateProfileDto } from '../../../profile/dto/update-profile.dto';

@ApiTags('admin/profile')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('dashboard/admin/profile')
export class AdminProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get admin profile' })
  getProfile(@GetCurrentUser('sub') userId: string) {
    return this.profileService.getMyProfile(userId);
  }

  @Patch()
  @ApiOperation({ summary: 'Update admin profile' })
  updateProfile(@GetCurrentUser('sub') userId: string, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateMyProfile(userId, dto);
  }
}
