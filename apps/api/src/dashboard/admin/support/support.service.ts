import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket } from './entities/support-ticket.entity';
import { SupportMessage } from './entities/support-message.entity';
import { FAQ } from './entities/faq.entity';
import { User } from '../../../users/entities/user.entity';

@Injectable()
export class AdminSupportService {
  constructor(
    @InjectRepository(SupportTicket)
    private readonly ticketRepository: Repository<SupportTicket>,
    @InjectRepository(SupportMessage)
    private readonly messageRepository: Repository<SupportMessage>,
    @InjectRepository(FAQ)
    private readonly faqRepository: Repository<FAQ>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllFAQs() {
    return this.faqRepository.find({ order: { createdAt: 'ASC' } });
  }

  async createFAQ(data: any) {
    const faq = this.faqRepository.create(data);
    return this.faqRepository.save(faq);
  }

  async findAll(status?: string) {
    const where: any = {};
    if (status && status !== 'All') where.status = status;
    return this.ticketRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async findByUser(userId: string) {
    return this.ticketRepository.find({
      where: { submittedBy: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string) {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) throw new NotFoundException('Ticket not found');

    // Resolve submitter name dynamically if it was not saved at creation time
    if (!ticket.submittedByName && ticket.submittedBy) {
      const user = await this.userRepository.findOne({ where: { id: ticket.submittedBy } });
      if (user) {
        ticket.submittedByName = `${user.firstName} ${user.lastName}`;
        // Persist for future calls
        await this.ticketRepository.save(ticket);
      }
    }

    return ticket;
  }

  async createTicket(userId: string, userName: string, data: any) {
    const ticket = this.ticketRepository.create({
      ...data,
      submittedBy: userId,
      submittedByName: userName,
      status: 'Open',
    });

    const savedTicket = await this.ticketRepository.save(ticket);

    // Add initial message
    if (data.description) {
      await this.addMessage((savedTicket as any).id, {
        senderId: userId,
        senderName: userName,
        senderRole: 'user',
        content: data.description,
      });
    }

    return savedTicket;
  }

  async updateStatus(id: string, status: string, assignedTo?: string) {
    const ticket = await this.findById(id);
    ticket.status = status;
    if (assignedTo) {
      ticket.assignedTo = assignedTo;
      ticket.status = 'Pending';
    }
    if (status === 'Closed') ticket.resolvedAt = new Date();
    return this.ticketRepository.save(ticket);
  }

  async findMessages(ticketId: string) {
    return this.messageRepository.find({
      where: { ticketId },
      order: { createdAt: 'ASC' },
    });
  }

  async addMessage(ticketId: string, data: any) {
    const message = this.messageRepository.create({
      ...data,
      ticketId,
    });
    return this.messageRepository.save(message);
  }
}
