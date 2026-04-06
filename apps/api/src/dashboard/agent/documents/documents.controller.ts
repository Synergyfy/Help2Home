import { Controller, Get, Post, Body, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { DocumentService } from './documents.service';

@ApiTags('agent/documents')
@Controller('dashboard/agent/documents')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentDocumentsController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all agent documents (KYC, Contracts, etc.)' })
  @ApiResponse({ status: 200, description: 'List of documents' })
  async findAll(@GetCurrentUser('sub') userId: string) {
    return this.documentService.findAllByUserId(userId);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload a new document record' })
  async upload(@GetCurrentUser('sub') userId: string, @Body() data: any) {
    return this.documentService.create({ ...data, ownerId: userId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document details' })
  async findOne(@Param('id') id: string) {
    return this.documentService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a document' })
  async remove(@GetCurrentUser('sub') userId: string, @Param('id') id: string) {
    return this.documentService.remove(id, userId);
  }
}
