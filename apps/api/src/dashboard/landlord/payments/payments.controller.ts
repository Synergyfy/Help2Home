import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { LandlordPaymentsService } from './payments.service';

@ApiTags('Landlord Payments')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('dashboard/landlord/payments')
export class LandlordPaymentsController {
  constructor(private readonly paymentsService: LandlordPaymentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all payments for a landlord' })
  async getPayments(@GetCurrentUser('sub') landlordId: string) {
    return this.paymentsService.getPayments(landlordId);
  }

  @Get('payouts')
  @ApiOperation({ summary: 'Get all payouts for a landlord' })
  async getPayouts(@GetCurrentUser('sub') landlordId: string) {
    return this.paymentsService.getPayouts(landlordId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific payment' })
  async getPaymentDetails(
    @GetCurrentUser('sub') landlordId: string,
    @Param('id') id: string
  ) {
    return this.paymentsService.getPaymentDetails(landlordId, id);
  }

  @Get('payouts/:id')
  @ApiOperation({ summary: 'Get details of a specific payout' })
  async getPayoutDetails(
    @GetCurrentUser('sub') landlordId: string,
    @Param('id') id: string
  ) {
    return this.paymentsService.getPayoutDetails(landlordId, id);
  }
}
