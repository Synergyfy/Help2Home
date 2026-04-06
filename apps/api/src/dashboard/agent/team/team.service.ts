import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from './entities/team-member.entity';
import { User } from '../../../users/entities/user.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getTeam(leaderId: string) {
    return this.teamMemberRepository.find({
      where: { leaderId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });
  }

  async addMember(leaderId: string, userEmail: string, role: string = 'Member') {
    const user = await this.userRepository.findOne({ where: { email: userEmail } });
    if (!user) throw new NotFoundException('User not found');

    const existing = await this.teamMemberRepository.findOne({ where: { leaderId, userId: user.id } });
    if (existing) throw new ConflictException('Member already in team');

    const member = this.teamMemberRepository.create({
      leaderId,
      userId: user.id,
      role,
      status: 'Active',
    });

    return this.teamMemberRepository.save(member);
  }

  async removeMember(leaderId: string, memberId: string) {
    const member = await this.teamMemberRepository.findOne({ where: { id: memberId, leaderId } });
    if (!member) throw new NotFoundException('Member not found');
    return this.teamMemberRepository.remove(member);
  }
}
