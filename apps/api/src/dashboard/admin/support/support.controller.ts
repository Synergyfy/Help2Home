import { Controller, Get, Post, Patch, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { AdminSupportService } from './support.service';

@ApiTags('admin/support')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('dashboard/admin/support')
export class AdminSupportController {
  constructor(private readonly supportService: AdminSupportService) {}

  @Get()
  @ApiOperation({ summary: 'Get all support tickets, optionally filtered by status' })
  findAll(@Query('status') status?: string) {
    return this.supportService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single support ticket by ID' })
  findOne(@Param('id') id: string) {
    return this.supportService.findById(id);
  }

  @Get(':id/messages')
  @ApiOperation({ summary: 'Get messages for a specific Support ticket' })
  findMessages(@Param('id') id: string) {
    return this.supportService.findMessages(id);
  }

  @Post(':id/messages')
  @ApiOperation({ summary: 'Add a message to a support ticket' })
  addMessage(@Param('id') id: string, @Body() data: any) {
    return this.supportService.addMessage(id, data);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update the status of a support ticket' })
  updateStatus(@Param('id') id: string, @Body('status') status: string, @Body('assignedTo') assignedTo?: string) {
    return this.supportService.updateStatus(id, status, assignedTo);
  }
}
