import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { NotificationSettingsService } from './notification-settings.service';

@ApiTags('Notification Settings')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('notification-settings')
export class NotificationSettingsController {
  constructor(private readonly service: NotificationSettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get notification settings for the current user' })
  getSettings(@GetCurrentUser('sub') userId: string) {
    return this.service.getSettings(userId);
  }

  @Put()
  @ApiOperation({ summary: 'Update notification settings' })
  updateSettings(
    @GetCurrentUser('sub') userId: string,
    @Body() data: any,
  ) {
    return this.service.updateSettings(userId, data);
  }
}
