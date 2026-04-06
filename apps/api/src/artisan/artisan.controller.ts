import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { ArtisanService } from './artisan.service';

@ApiTags('Artisans')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('artisans')
export class ArtisanController {
  constructor(private readonly artisanService: ArtisanService) {}

  @Get()
  @ApiOperation({ summary: 'List all available artisans, optionally filtered by specialization' })
  @ApiQuery({ name: 'specialization', required: false })
  findAll(@Query('specialization') specialization?: string) {
    return this.artisanService.findAll(specialization);
  }
}
