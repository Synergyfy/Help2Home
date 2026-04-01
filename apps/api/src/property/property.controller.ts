import { Controller, Get, Post, Body, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { PropertyService } from './property.service';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyResponseDto } from './dto/property-response.dto';

@ApiTags('properties')
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all properties' })
  @ApiResponse({ status: 200, type: [PropertyResponseDto] })
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get property by id' })
  @ApiResponse({ status: 200, type: PropertyResponseDto })
  findOne(@Param('id') id: string) {
    return this.propertyService.findById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('owner/me')
  @ApiOperation({ summary: 'Get my properties' })
  @ApiResponse({ status: 200, type: [PropertyResponseDto] })
  findMyProperties(@GetCurrentUser('sub') userId: string) {
    return this.propertyService.findByOwner(userId);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  @ApiOperation({ summary: 'Create a property' })
  @ApiResponse({ status: 201, type: PropertyResponseDto })
  create(@GetCurrentUser('sub') userId: string, @Body() data: CreatePropertyDto) {
    return this.propertyService.create(userId, data);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a property' })
  @ApiResponse({ status: 200, type: PropertyResponseDto })
  update(@Param('id') id: string, @GetCurrentUser('sub') userId: string, @Body() data: any) {
    return this.propertyService.update(id, userId, data);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a property' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string, @GetCurrentUser('sub') userId: string) {
    return this.propertyService.remove(id, userId);
  }
}