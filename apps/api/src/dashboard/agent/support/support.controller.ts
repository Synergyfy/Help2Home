import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket } from '../../admin/support/entities/support-ticket.entity';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';

@ApiTags('agent/support')
@Controller('dashboard/agent/support')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentSupportController {
  constructor(
    @InjectRepository(SupportTicket)
    private readonly supportTicketRepository: Repository<SupportTicket>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all support tickets for the agent' })
  @ApiResponse({ status: 200, description: 'List of tickets' })
  async findAll(@GetCurrentUser('sub') agentId: string) {
    return this.supportTicketRepository.find({
      where: { submittedBy: agentId },
      order: { createdAt: 'DESC' },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new support ticket' })
  async create(@GetCurrentUser('sub') agentId: string, @Body() data: any) {
    const ticket = this.supportTicketRepository.create({
      ...data,
      submittedBy: agentId,
      status: 'Open',
    });
    return this.supportTicketRepository.save(ticket);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific ticket' })
  async findOne(@Param('id') id: string, @GetCurrentUser('sub') agentId: string) {
    return this.supportTicketRepository.findOne({ where: { id, submittedBy: agentId } });
  }
}
