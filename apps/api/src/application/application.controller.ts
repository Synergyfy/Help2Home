import { Controller, Get, Post, Body, UseGuards, Param, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { ApplicationService } from './application.service';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { ApplicationResponseDto, UpdateApplicationStatusDto } from './dto/application.dto';

@ApiTags('applications')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @ApiOperation({ summary: 'Get applications' })
  @ApiQuery({ name: 'role', enum: ['tenant', 'landlord'], required: true })
  @ApiResponse({ status: 200, type: [ApplicationResponseDto] })
  findAll(@GetCurrentUser('sub') userId: string, @Query('role') role: 'tenant' | 'landlord') {
    if (role === 'tenant') {
      return this.applicationService.findByTenant(userId);
    } else {
      return this.applicationService.findByLandlord(userId);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get application by id' })
  @ApiResponse({ status: 200, type: ApplicationResponseDto })
  findOne(@Param('id') id: string) {
    return this.applicationService.findById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update application status' })
  @ApiResponse({ status: 200, type: ApplicationResponseDto })
  updateStatus(
    @Param('id') id: string,
    @GetCurrentUser('sub') userId: string,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    return this.applicationService.updateStatus(id, userId, dto.status);
  }

  @Post()
  @ApiOperation({ summary: 'Submit an application' })
  @ApiResponse({ status: 201, type: ApplicationResponseDto })
  create(@GetCurrentUser('sub') userId: string, @Body() data: any) {
    return this.applicationService.create({ ...data, tenantId: userId });
  }
}