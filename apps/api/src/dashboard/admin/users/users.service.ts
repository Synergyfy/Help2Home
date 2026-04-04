import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User } from '../../../users/entities/user.entity';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(search?: string) {
    if (search) {
      return this.userRepository.find({
        where: [
          { firstName: ILike(`%${search}%`) },
          { lastName: ILike(`%${search}%`) },
          { email: ILike(`%${search}%`) },
        ],
        order: { createdAt: 'DESC' },
      });
    }
    return this.userRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, data: Partial<User>) {
    const user = await this.findById(id);
    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async deactivate(id: string) {
    const user = await this.findById(id);
    user.isActive = false;
    await this.userRepository.save(user);
    return { success: true, message: 'User deactivated' };
  }

  async activate(id: string) {
    const user = await this.findById(id);
    user.isActive = true;
    await this.userRepository.save(user);
    return { success: true, message: 'User activated' };
  }
}
