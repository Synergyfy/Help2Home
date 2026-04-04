import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AdminAuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditRepository: Repository<AuditLog>,
  ) {}

  async findAll() {
    return this.auditRepository.find({ order: { createdAt: 'DESC' } });
  }

  async log(action: string, performedBy: string, performedByName: string, meta?: Record<string, any>, entityType?: string, entityId?: string, ipAddress?: string) {
    const entry = this.auditRepository.create({ action, performedBy, performedByName, meta, entityType, entityId, ipAddress });
    return this.auditRepository.save(entry);
  }
}
