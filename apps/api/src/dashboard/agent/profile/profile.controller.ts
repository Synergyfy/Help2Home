import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { ProfileService } from '../../../profile/profile.service';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { UpdateProfileDto } from '../../../profile/dto/update-profile.dto';

@ApiTags('agent/profile')
@Controller('dashboard/agent/profile')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get agent profile' })
  @ApiResponse({ status: 200, description: 'Profile returned successfully' })
  async getProfile(@GetCurrentUser('sub') userId: string) {
    return this.profileService.getMyProfile(userId);
  }

  @Patch()
  @ApiOperation({ summary: 'Update agent profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(@GetCurrentUser('sub') userId: string, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateMyProfile(userId, dto);
  }
}
