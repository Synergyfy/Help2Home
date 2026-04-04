import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async findAllByAgent(agentId: string) {
    return this.transactionRepository.find({
      where: { agentId },
      relations: ['property', 'buyer'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllByBuyer(buyerId: string) {
    return this.transactionRepository.find({
      where: { buyerId },
      relations: ['property', 'agent'],
      order: { createdAt: 'DESC' },
    });
  }

  async findSummary(agentId: string) {
    const transactions = await this.transactionRepository.find({
      where: { agentId, status: 'Completed' },
    });

    const totalEarnings = transactions.reduce((sum, t) => sum + Number(t.commission), 0);
    const pendingTransactions = await this.transactionRepository.find({
      where: { agentId, status: 'Pending' },
    });
    const pendingPayouts = pendingTransactions.reduce((sum, t) => sum + Number(t.commission), 0);

    const lastPayout = transactions.length > 0 ? transactions[0].completedAt : null;

    return {
      totalEarnings: `₦${totalEarnings.toLocaleString()}`,
      pendingPayouts: `₦${pendingPayouts.toLocaleString()}`,
      lastPayout: lastPayout ? lastPayout.toLocaleDateString() : 'N/A',
    };
  }

  async create(data: Partial<Transaction>) {
    const transaction = this.transactionRepository.create(data);
    return this.transactionRepository.save(transaction);
  }

  async updateStatus(id: string, status: string) {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) throw new NotFoundException('Transaction not found');
    transaction.status = status;
    if (status === 'Completed') transaction.completedAt = new Date();
    return this.transactionRepository.save(transaction);
  }
}
