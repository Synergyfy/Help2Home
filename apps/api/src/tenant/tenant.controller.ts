import { Controller, Get, Post, Body, UseGuards, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { TenantService } from './tenant.service';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { CreateTenantDto, UpdateTenantDto } from './dto/tenant.dto';

@ApiTags('tenants')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tenants (for landlord)' })
  @ApiQuery({ name: 'landlordId', required: false })
  findAll(@GetCurrentUser('sub') userId: string, @Query('landlordId') landlordId?: string) {
    return this.tenantService.findByLandlord(landlordId || userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tenant by id' })
  findOne(@Param('id') id: string) {
    return this.tenantService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new tenant' })
  create(@GetCurrentUser('sub') userId: string, @Body() dto: CreateTenantDto) {
    return this.tenantService.create(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update tenant' })
  update(@Param('id') id: string, @GetCurrentUser('sub') userId: string, @Body() dto: UpdateTenantDto) {
    return this.tenantService.update(id, userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a tenant' })
  remove(@Param('id') id: string, @GetCurrentUser('sub') userId: string) {
    return this.tenantService.remove(id, userId);
  }
}
