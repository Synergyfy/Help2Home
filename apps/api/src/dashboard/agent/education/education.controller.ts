import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Education } from '../../admin/education/entities/education.entity';

@ApiTags('agent/education')
@Controller('dashboard/agent/education')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentEducationController {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get educational resources for agents' })
  @ApiResponse({ status: 200, description: 'List of resources' })
  async findAll() {
    return this.educationRepository.find({
      where: { targetRole: In([Role.AGENT, 'all']) },
      order: { createdAt: 'DESC' },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific resource details' })
  async findOne(@Param('id') id: string) {
    return this.educationRepository.findOne({ where: { id } });
  }
}
