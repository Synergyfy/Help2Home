import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { Role } from '../../../common/enums/role.enum';

@Injectable()
export class AdminSuperroleService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsersWithRoles() {
    return this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'roles', 'isActive', 'createdAt'],
      order: { createdAt: 'DESC' },
    });
  }

  async assignRole(userId: string, role: Role) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (!user.roles.includes(role)) {
      user.roles = [...user.roles, role];
      await this.userRepository.save(user);
    }
    return { success: true, roles: user.roles };
  }

  async revokeRole(userId: string, role: Role) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    user.roles = user.roles.filter((r) => r !== role);
    await this.userRepository.save(user);
    return { success: true, roles: user.roles };
  }
}
