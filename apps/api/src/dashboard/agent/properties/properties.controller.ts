import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { PropertyService } from '../../../property/property.service';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';

@ApiTags('agent/properties')
@Controller('dashboard/agent/properties')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentPropertiesController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all properties managed by the agent' })
  @ApiResponse({ status: 200, description: 'List of properties' })
  async findAll(@GetCurrentUser('sub') agentId: string) {
    return this.propertyService.findByOwner(agentId);
  }

  @Post()
  @ApiOperation({ summary: 'Agent adds a new property listing' })
  @ApiResponse({ status: 201, description: 'Property created' })
  async create(@GetCurrentUser('sub') agentId: string, @Body() createPropertyDto: any) {
    return this.propertyService.create(agentId, { ...createPropertyDto, posterRole: 'agent' });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific property' })
  async findOne(@Param('id') id: string, @GetCurrentUser('sub') agentId: string) {
    const property = await this.propertyService.findById(id);
    if (property.ownerId !== agentId) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update property details' })
  async update(@Param('id') id: string, @GetCurrentUser('sub') agentId: string, @Body() updatePropertyDto: any) {
    return this.propertyService.update(id, agentId, updatePropertyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a property listing' })
  async remove(@Param('id') id: string, @GetCurrentUser('sub') agentId: string) {
    return this.propertyService.remove(id, agentId);
  }
}
