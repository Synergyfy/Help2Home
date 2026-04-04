import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {}

  async findAllByUserId(userId: string) {
    return this.documentRepository.find({
      where: { ownerId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async create(data: Partial<DocumentEntity>) {
    const document = this.documentRepository.create(data);
    return this.documentRepository.save(document);
  }

  async findById(id: string) {
    const doc = await this.documentRepository.findOne({ where: { id } });
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async verify(id: string, status: string) {
    const doc = await this.findById(id);
    doc.status = status;
    return this.documentRepository.save(doc);
  }

  async remove(id: string, userId: string) {
    const doc = await this.findById(id);
    if (doc.ownerId !== userId) throw new NotFoundException('Document Not Accessable');
    return this.documentRepository.remove(doc);
  }
}
