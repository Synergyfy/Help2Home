import { Controller, Get, Post, Body, UseGuards, Query, NotFoundException, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { TenantService } from './tenant.service';
import { MaintenanceService } from '../dashboard/agent/maintenance/maintenance.service';
import { InspectionService } from '../dashboard/agent/schedule/inspection.service';
import { TransactionService } from '../dashboard/agent/transactions/transactions.service';
import { AdminEducationService } from '../dashboard/admin/education/education.service';
import { PropertyService } from '../property/property.service';
import { AdminSupportService } from '../dashboard/admin/support/support.service';

import { UsersService } from '../users/users.service';

@ApiTags('tenant/dashboard')
@Controller('dashboard/tenant')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.TENANT)
@ApiBearerAuth()
export class TenantDashboardController {
  constructor(
    private readonly tenantService: TenantService,
    private readonly maintenanceService: MaintenanceService,
    private readonly inspectionService: InspectionService,
    private readonly transactionService: TransactionService,
    private readonly educationService: AdminEducationService,
    private readonly propertyService: PropertyService,
    private readonly supportService: AdminSupportService,
    private readonly usersService: UsersService,
  ) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get tenant dashboard summary' })
  async getStats(@GetCurrentUser('sub') userId: string) {
    return this.tenantService.getDashboardStats(userId);
  }

  @Get('lease')
  @ApiOperation({ summary: 'Get current lease and property details' })
  async getLease(@GetCurrentUser('sub') userId: string) {
    const tenant = await this.tenantService.findByUserId(userId);
    if (!tenant) throw new NotFoundException('Tenant record not found');
    return tenant;
  }

  @Get('maintenance')
  @ApiOperation({ summary: 'Get maintenance requests for the current property' })
  async getMaintenance(@GetCurrentUser('sub') userId: string) {
    const tenant = await this.tenantService.findByUserId(userId);
    if (!tenant) throw new NotFoundException('Tenant record not found');
    return this.maintenanceService.findAllByProperty(tenant.propertyId);
  }

  @Post('maintenance')
  @ApiOperation({ summary: 'Submit a new maintenance request' })
  async createMaintenance(@GetCurrentUser('sub') userId: string, @Body() data: any) {
    const tenant = await this.tenantService.findByUserId(userId);
    if (!tenant) throw new NotFoundException('Tenant record not found');
    
    return this.maintenanceService.create({
      ...data,
      tenantId: tenant.id,
      propertyId: tenant.propertyId,
      agentId: tenant.property?.ownerId,
      status: 'Pending',
    });
  }

  @Get('inspections')
  @ApiOperation({ summary: 'Get upcoming inspections for the property' })
  async getInspections(@GetCurrentUser('sub') userId: string) {
    const tenant = await this.tenantService.findByUserId(userId);
    if (!tenant) throw new NotFoundException('Tenant record not found');
    return this.inspectionService.findAllByProperty(tenant.propertyId);
  }

  @Get('payments')
  @ApiOperation({ summary: 'Get payment history for the tenant' })
  async getPayments(@GetCurrentUser('sub') userId: string) {
    return this.transactionService.findAllByBuyer(userId);
  }

  @Get('education')
  @ApiOperation({ summary: 'Get educational articles with filters' })
  async getEducation(@Query('category') category: string, @Query('search') search: string) {
    return this.educationService.findByCategory(category, search);
  }

  @Get('education/featured')
  @ApiOperation({ summary: 'Get featured educational articles' })
  async getFeaturedEducation() {
    return this.educationService.findFeatured();
  }

  @Get('education/:id')
  @ApiOperation({ summary: 'Get educational article details' })
  async getEducationDetail(@Param('id') id: string) {
    return this.educationService.findById(id);
  }

  @Post('education/:id/save')
  @ApiOperation({ summary: 'Toggle save status of an educational article' })
  async toggleSaveEducation(@GetCurrentUser('sub') userId: string, @Param('id') id: string) {
    const isSaved = await this.educationService.toggleSave(userId, id);
    return { isSaved };
  }

  @Get('funding-properties')
  @ApiOperation({ summary: 'Get properties currently in funding phase' })
  async getFundingProperties() {
    // For now, return off-plan properties as 'funding' properties
    return this.propertyService.findAll({ isOffPlan: true });
  }

  @Get('support/tickets')
  @ApiOperation({ summary: 'Get tenant support tickets' })
  async getTickets(@GetCurrentUser('sub') userId: string) {
    return this.supportService.findByUser(userId);
  }

  @Post('support/tickets')
  @ApiOperation({ summary: 'Create a new support ticket' })
  async createTicket(
    @GetCurrentUser('sub') userId: string,
    @GetCurrentUser('firstName') firstName: string,
    @GetCurrentUser('lastName') lastName: string,
    @Body() data: any,
  ) {
    const userName = `${firstName} ${lastName}`;
    return this.supportService.createTicket(userId, userName, data);
  }

  @Get('support/tickets/:id/messages')
  @ApiOperation({ summary: 'Get messages for a specific support ticket' })
  async getMessages(@Param('id') id: string) {
    return this.supportService.findMessages(id);
  }

  @Post('support/tickets/:id/messages')
  @ApiOperation({ summary: 'Send a message in a support ticket' })
  async sendMessage(
    @GetCurrentUser('sub') userId: string,
    @GetCurrentUser('firstName') firstName: string,
    @GetCurrentUser('lastName') lastName: string,
    @Param('id') id: string,
    @Body() data: { content: string },
  ) {
    return this.supportService.addMessage(id, {
      senderId: userId,
      senderName: `${firstName} ${lastName}`,
      senderRole: 'user',
      content: data.content,
    });
  }

  @Get('support/faqs')
  @ApiOperation({ summary: 'Get frequently asked questions' })
  async getFAQs() {
    return this.supportService.findAllFAQs();
  }

  @Get('wishlist')
  @ApiOperation({ summary: 'Get tenant property wishlist' })
  async getWishlist(@GetCurrentUser('sub') userId: string) {
    return this.propertyService.getWishlist(userId);
  }

  @Post('wishlist/:propertyId')
  @ApiOperation({ summary: 'Toggle property in wishlist' })
  async toggleWishlist(
    @GetCurrentUser('sub') userId: string,
    @Param('propertyId') propertyId: string,
  ) {
    const isSaved = await this.propertyService.toggleWishlist(userId, propertyId);
    return { isSaved };
  }

  @Get('notifications')
  @ApiOperation({ summary: 'Get tenant notifications' })
  async getNotifications(@GetCurrentUser('sub') userId: string) {
    return this.usersService.getNotifications(userId);
  }

  @Post('notifications/:id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  async markNotificationAsRead(
    @GetCurrentUser('sub') userId: string,
    @Param('id') id: string,
  ) {
    if (id === 'all') {
      return this.usersService.markAllNotificationsAsRead(userId);
    }
    return this.usersService.markNotificationAsRead(id, userId);
  }

  @Post('notifications/:id/clear')
  @ApiOperation({ summary: 'Clear a notification' })
  async clearNotification(
    @GetCurrentUser('sub') userId: string,
    @Param('id') id: string,
  ) {
    if (id === 'all') {
      return this.usersService.clearAllNotifications(userId);
    }
    return this.usersService.clearNotification(id, userId);
  }
}
