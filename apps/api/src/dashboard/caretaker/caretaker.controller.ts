import { Controller, Get, UseGuards, Query, Req } from '@nestjs/common';
import { CaretakerService } from './caretaker.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@Controller('dashboard/caretaker')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.CARETAKER)
export class CaretakerController {
  constructor(private readonly caretakerService: CaretakerService) {}

  @Get('stats')
  async getStats(@Req() req) {
    return this.caretakerService.getStats(req.user.id);
  }

  @Get('properties')
  async getProperties(@Req() req) {
    return this.caretakerService.getProperties(req.user.id);
  }

  @Get('tasks')
  async getTasks(@Req() req, @Query('status') status?: string) {
    return this.caretakerService.getTasks(req.user.id, status);
  }

  @Get('partners')
  async getPartners(@Req() req) {
    return this.caretakerService.getPartners(req.user.id);
  }

  @Get('activity')
  async getActivity(@Req() req) {
    return this.caretakerService.getActivity(req.user.id);
  }
}
