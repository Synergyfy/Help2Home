import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentTransaction } from '../../../payment/entities/payment-transaction.entity';
import { PayoutTransaction } from '../../../payment/entities/payout-transaction.entity';

@Injectable()
export class LandlordPaymentsService {
  constructor(
    @InjectRepository(PaymentTransaction)
    private readonly paymentRepository: Repository<PaymentTransaction>,
    @InjectRepository(PayoutTransaction)
    private readonly payoutRepository: Repository<PayoutTransaction>,
  ) {}

  async getPayments(landlordId: string) {
    return this.paymentRepository.find({
      where: { landlordId },
      relations: ['property', 'tenant', 'contract'],
      order: { date: 'DESC' },
    });
  }

  async getPayouts(landlordId: string) {
    return this.payoutRepository.find({
      where: { landlordId },
      order: { date: 'DESC' },
    });
  }

  async getPaymentDetails(landlordId: string, id: string) {
    const payment = await this.paymentRepository.findOne({
      where: { id, landlordId },
      relations: ['property', 'tenant', 'contract'],
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async getPayoutDetails(landlordId: string, id: string) {
    const payout = await this.payoutRepository.findOne({
      where: { id, landlordId },
    });
    if (!payout) throw new NotFoundException('Payout not found');
    return payout;
  }
}
