import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { AdminSuperroleService } from './superrole.service';

@ApiTags('admin/superrole')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('dashboard/admin/superrole')
export class AdminSuperroleController {
  constructor(private readonly superroleService: AdminSuperroleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users with their roles' })
  getAllUsersWithRoles() {
    return this.superroleService.getAllUsersWithRoles();
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign a role to a user' })
  assignRole(@Param('id') id: string, @Body('role') role: Role) {
    return this.superroleService.assignRole(id, role);
  }

  @Patch(':id/revoke')
  @ApiOperation({ summary: 'Revoke a role from a user' })
  revokeRole(@Param('id') id: string, @Body('role') role: Role) {
    return this.superroleService.revokeRole(id, role);
  }
}
