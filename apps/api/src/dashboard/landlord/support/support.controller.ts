import { Controller, Get, Post, Put, Body, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket } from '../../admin/support/entities/support-ticket.entity';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';

@ApiTags('landlord/support')
@Controller('dashboard/landlord/support')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.LANDLORD)
@ApiBearerAuth()
export class LandlordSupportController {
  constructor(
    @InjectRepository(SupportTicket)
    private readonly supportTicketRepository: Repository<SupportTicket>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all support tickets for the landlord' })
  @ApiResponse({ status: 200, description: 'List of tickets' })
  async findAll(@GetCurrentUser('sub') landlordId: string) {
    return this.supportTicketRepository.find({
      where: { submittedBy: landlordId },
      order: { createdAt: 'DESC' },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new support ticket' })
  async create(@GetCurrentUser('sub') landlordId: string, @Body() data: any) {
    const ticket = this.supportTicketRepository.create({
      ...data,
      submittedBy: landlordId,
      status: 'Open',
    });
    return this.supportTicketRepository.save(ticket);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific ticket' })
  async findOne(@Param('id') id: string, @GetCurrentUser('sub') landlordId: string) {
    return this.supportTicketRepository.findOne({ 
      where: { id, submittedBy: landlordId } 
    });
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update ticket status' })
  async updateStatus(
    @Param('id') id: string,
    @GetCurrentUser('sub') landlordId: string,
    @Body() data: { status: string }
  ) {
    const ticket = await this.supportTicketRepository.findOne({ 
      where: { id, submittedBy: landlordId } 
    });
    if (!ticket) return null;
    ticket.status = data.status;
    return this.supportTicketRepository.save(ticket);
  }
}
