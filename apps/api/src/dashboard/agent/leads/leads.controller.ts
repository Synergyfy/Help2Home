import { Controller, Get, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Application } from '../../../application/entities/application.entity';
import { Property } from '../../../property/entities/property.entity';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';

@ApiTags('agent/leads')
@Controller('dashboard/agent/leads')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentLeadsController {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all leads (applications) for the agent' })
  @ApiResponse({ status: 200, description: 'Leads returned successfully' })
  async findAll(@GetCurrentUser('sub') agentId: string) {
    const agentProperties = await this.propertyRepository.find({
      where: { ownerId: agentId },
      select: ['id'],
    });
    const propertyIds = agentProperties.map(p => p.id);

    if (propertyIds.length === 0) return [];

    return this.applicationRepository.find({
      where: { propertyId: In(propertyIds) },
      order: { createdAt: 'DESC' },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific lead details' })
  @ApiResponse({ status: 200, description: 'Lead details returned' })
  async findOne(@Param('id') id: string, @GetCurrentUser('sub') agentId: string) {
    const lead = await this.applicationRepository.findOne({ 
        where: { id },
        relations: ['property'] 
    });
    if (!lead) throw new NotFoundException('Lead not found');

    // Security check: Ensure the lead is for one of the agent's properties
    if (lead.property.ownerId !== agentId) {
        throw new NotFoundException('Lead not found');
    }

    return lead;
  }
}
