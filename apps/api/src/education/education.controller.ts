import { Controller, Get, Query, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { AdminEducationService } from '../dashboard/admin/education/education.service';

@ApiTags('education')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: AdminEducationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all educational articles with filters' })
  async getEducation(@Query('category') category?: string, @Query('search') search?: string) {
    return this.educationService.findByCategory(category || 'All', search || '');
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured educational articles' })
  async getFeaturedEducation() {
    return this.educationService.findFeatured();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get article details' })
  async getEducationDetail(@Param('id') id: string) {
    return this.educationService.findById(id);
  }

  @Post(':id/save')
  @ApiOperation({ summary: 'Toggle save status of an educational article' })
  async toggleSaveEducation(@GetCurrentUser('sub') userId: string, @Param('id') id: string) {
    const isSaved = await this.educationService.toggleSave(userId, id);
    return { isSaved };
  }
}
