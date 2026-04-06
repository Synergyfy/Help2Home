import { Controller, Get, Post, Body, UseGuards, Query, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';
import { LandlordService } from './landlord.service';
import { CreatePropertyDto } from '../../property/dto/create-property.dto';
import { DashboardStatsResponseDto, ProfileResponseDto } from './dto/landlord-response.dto';
import { PropertyResponseDto } from '../../property/dto/property-response.dto';
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator';
import { CreateTenantDto, TenantResponseDto, UpdateTenantDto } from '../../tenant/dto/tenant.dto';
import { ApplicationResponseDto, UpdateApplicationStatusDto } from '../../application/dto/application.dto';

@ApiTags('landlord')
@ApiBearerAuth()
@Controller('landlord-dashboard')
@UseGuards(AccessTokenGuard)
export class LandlordDashboardController {
  constructor(private readonly landlordService: LandlordService) { }

  @Get('stats')
  @ApiOperation({ summary: 'Get landlord dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Return dashboard statistics', type: DashboardStatsResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getDashboardStats(@GetCurrentUser('sub') userId: string) {
    return this.landlordService.getDashboardStats(userId);
  }

  @Get('properties')
  @ApiOperation({ summary: 'Get all properties owned by the landlord' })
  @ApiResponse({ status: 200, description: 'Return list of properties', type: [PropertyResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProperties(@GetCurrentUser('sub') userId: string) {
    return this.landlordService.getProperties(userId);
  }

  @Post('properties')
  @ApiOperation({ summary: 'Create a new property listing' })
  @ApiResponse({ status: 201, description: 'Property successfully created', type: PropertyResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  createProperty(
    @GetCurrentUser('sub') userId: string,
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    return this.landlordService.createProperty(userId, createPropertyDto);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get landlord profile' })
  @ApiResponse({ status: 200, description: 'Return landlord profile data', type: ProfileResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  getProfile(@GetCurrentUser('sub') userId: string) {
    return this.landlordService.getProfile(userId);
  }

  // Tenant Endpoints
  @Get('tenants')
  @ApiOperation({ summary: 'Get all tenants for a landlord' })
  @ApiQuery({ name: 'landlordId', required: false, description: 'ID of the landlord' })
  @ApiResponse({ status: 200, description: 'Return list of tenants', type: [TenantResponseDto] })
  getTenants(@GetCurrentUser('sub') userId: string, @Query('landlordId') landlordId?: string) {
    // If landlordId is provided in query, use it, otherwise use current user id
    return this.landlordService.getTenants(landlordId || userId);
  }

  @Post('tenants')
  @ApiOperation({ summary: 'Add a new tenant' })
  @ApiResponse({ status: 201, description: 'Tenant successfully added', type: TenantResponseDto })
  addTenant(@GetCurrentUser('sub') userId: string, @Body() dto: CreateTenantDto) {
    return this.landlordService.addTenant(userId, dto);
  }

  @Patch('tenants/:id')
  @ApiOperation({ summary: 'Update tenant information' })
  @ApiResponse({ status: 200, description: 'Tenant successfully updated', type: TenantResponseDto })
  updateTenant(
    @GetCurrentUser('sub') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTenantDto,
  ) {
    return this.landlordService.updateTenant(userId, id, dto);
  }

  @Delete('tenants/:id')
  @ApiOperation({ summary: 'Remove a tenant' })
  @ApiResponse({ status: 200, description: 'Tenant successfully removed' })
  deleteTenant(@GetCurrentUser('sub') userId: string, @Param('id') id: string) {
    return this.landlordService.deleteTenant(userId, id);
  }

  // Application Endpoints
  @Get('applications')
  @ApiOperation({ summary: 'Get applications for the current user' })
  @ApiQuery({ name: 'role', enum: ['tenant', 'landlord'], required: true })
  @ApiResponse({ status: 200, description: 'Return list of applications', type: [ApplicationResponseDto] })
  getApplications(
    @GetCurrentUser('sub') userId: string,
    @Query('role') role: 'tenant' | 'landlord',
  ) {
    return this.landlordService.getApplications(userId, role);
  }

  @Patch('applications/:id/status')
  @ApiOperation({ summary: 'Update application status' })
  @ApiResponse({ status: 200, description: 'Application status updated', type: ApplicationResponseDto })
  updateApplicationStatus(
    @GetCurrentUser('sub') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    return this.landlordService.updateApplicationStatus(userId, id, dto.status);
  }
}