import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { AdminEducationService } from './education.service';

@ApiTags('admin/education')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('dashboard/admin/education')
export class AdminEducationController {
  constructor(private readonly educationService: AdminEducationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all education content' })
  findAll() { return this.educationService.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get education content by ID' })
  findOne(@Param('id') id: string) { return this.educationService.findById(id); }

  @Post()
  @ApiOperation({ summary: 'Create new education content' })
  create(@GetCurrentUser('sub') userId: string, @Body() data: any) {
    return this.educationService.create(userId, data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update education content' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.educationService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete education content' })
  remove(@Param('id') id: string) { return this.educationService.remove(id); }
}
