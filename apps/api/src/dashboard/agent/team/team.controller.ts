import { Controller, Get, Post, Body, UseGuards, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { TeamService } from './team.service';

@ApiTags('agent/team')
@Controller('dashboard/agent/team')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentTeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiOperation({ summary: 'Get current team members' })
  @ApiResponse({ status: 200, description: 'List of team members' })
  async getTeam(@GetCurrentUser('sub') agentId: string) {
    return this.teamService.getTeam(agentId);
  }

  @Post('invite')
  @ApiOperation({ summary: 'Invite a new team member by email' })
  async inviteMember(@GetCurrentUser('sub') agentId: string, @Body('email') email: string, @Body('role') role?: string) {
    return this.teamService.addMember(agentId, email, role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a team member' })
  async removeMember(@GetCurrentUser('sub') agentId: string, @Param('id') id: string) {
    return this.teamService.removeMember(agentId, id);
  }
}
