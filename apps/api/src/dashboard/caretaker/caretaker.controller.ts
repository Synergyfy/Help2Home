import { Controller, Get, UseGuards, Query, Req } from '@nestjs/common';
import { CaretakerService } from './caretaker.service';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@Controller('dashboard/caretaker')
@UseGuards(AccessTokenGuard, RolesGuard)
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
