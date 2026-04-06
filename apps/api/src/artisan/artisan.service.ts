import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Artisan } from './entities/artisan.entity';

@Injectable()
export class ArtisanService {
  constructor(
    @InjectRepository(Artisan)
    private readonly artisanRepository: Repository<Artisan>,
  ) {}

  async findAll(specialization?: string): Promise<Artisan[]> {
    const where: any = { isAvailable: true };
    if (specialization) {
      where.specialization = ILike(`%${specialization}%`);
    }
    return this.artisanRepository.find({
      where,
      order: { rating: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Artisan | null> {
    return this.artisanRepository.findOne({ where: { id } });
  }
}
