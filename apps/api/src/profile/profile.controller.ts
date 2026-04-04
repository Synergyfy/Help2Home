import { Controller, Get, Patch, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';

@ApiTags('profile')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get the current authenticated user profile' })
  @ApiResponse({ status: 200, description: 'Profile returned successfully' })
  getMyProfile(@GetCurrentUser('sub') userId: string) {
    return this.profileService.getMyProfile(userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update the current authenticated user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  updateMyProfile(
    @GetCurrentUser('sub') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.updateMyProfile(userId, dto);
  }

  @Post('preferences')
  @ApiOperation({ summary: 'Update a notification preference' })
  updatePreference(
    @GetCurrentUser('sub') userId: string,
    @Body() body: { type: string; channel: string; enabled: boolean },
  ) {
    return this.profileService.setNotificationPreference(userId, body.type, body.enabled);
  }

  @Delete('banks/:id')
  @ApiOperation({ summary: 'Unlink a bank account' })
  unlinkBank(
    @GetCurrentUser('sub') userId: string,
    @Param('id') id: string,
  ) {
    return this.profileService.removeBankAccount(userId, id);
  }

  @Delete('payment-methods/:id')
  @ApiOperation({ summary: 'Remove a payment method' })
  removeCard(
    @GetCurrentUser('sub') userId: string,
    @Param('id') id: string,
  ) {
    return this.profileService.removePaymentMethod(userId, id);
  }
}
