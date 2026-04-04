import { Controller, Get, Param, Post, Body, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { LandlordTeamService } from './team.service';

@ApiTags('landlord/team')
@Controller('dashboard/landlord/team')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.LANDLORD)
@ApiBearerAuth()
export class LandlordTeamController {
  constructor(private readonly teamService: LandlordTeamService) {}

  @Get()
  @ApiOperation({ summary: 'Get all team members for landlord' })
  @ApiResponse({ status: 200, description: 'List of team members' })
  async getTeam(@GetCurrentUser('sub') landlordId: string) {
    return this.teamService.getTeam(landlordId);
  }

  @Post()
  @ApiOperation({ summary: 'Add a member to the team' })
  async addMember(
    @GetCurrentUser('sub') landlordId: string,
    @Body() dto: { email: string; role?: string },
  ) {
    return this.teamService.addMember(landlordId, dto.email, dto.role);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update team member role' })
  async updateMemberRole(
    @GetCurrentUser('sub') landlordId: string,
    @Param('id') memberId: string,
    @Body() dto: { role: string },
  ) {
    return this.teamService.updateMemberRole(landlordId, memberId, dto.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a member from the team' })
  async removeMember(
    @GetCurrentUser('sub') landlordId: string,
    @Param('id') memberId: string,
  ) {
    return this.teamService.removeMember(landlordId, memberId);
  }
}
