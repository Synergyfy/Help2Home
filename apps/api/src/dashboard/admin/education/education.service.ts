import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { SavedEducation } from './entities/saved-education.entity';

@Injectable()
export class AdminEducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
    @InjectRepository(SavedEducation)
    private savedEducationRepository: Repository<SavedEducation>,
  ) {}

  async findAll() {
    return this.educationRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findFeatured() {
    return this.educationRepository.find({ where: { featured: true }, order: { createdAt: 'DESC' } });
  }

  async findByCategory(category: string, search?: string) {
    const query = this.educationRepository.createQueryBuilder('education');
    
    if (category && category !== 'All') {
      query.andWhere('education.category = :category', { category });
    }
    
    if (search) {
      query.andWhere(
        '(LOWER(education.title) LIKE LOWER(:search) OR LOWER(education.description) LIKE LOWER(:search))',
        { search: `%${search}%` }
      );
    }
    
    return query.orderBy('education.createdAt', 'DESC').getMany();
  }

  async toggleSave(userId: string, educationId: string) {
    const existing = await this.savedEducationRepository.findOne({
      where: { userId, educationId },
    });

    if (existing) {
      await this.savedEducationRepository.remove(existing);
      return false; // Unsaved
    }

    const saved = this.savedEducationRepository.create({ userId, educationId });
    await this.savedEducationRepository.save(saved);
    return true; // Saved
  }

  async findById(id: string) {
    const item = await this.educationRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Education content not found');
    return item;
  }

  async create(authorId: string, data: Partial<Education>) {
    const item = this.educationRepository.create({ ...data, authorId });
    return this.educationRepository.save(item);
  }

  async update(id: string, data: Partial<Education>) {
    const item = await this.findById(id);
    Object.assign(item, data);
    return this.educationRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.findById(id);
    await this.educationRepository.remove(item);
    return { success: true };
  }
}
