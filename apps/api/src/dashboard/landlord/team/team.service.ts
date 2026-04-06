import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from '../../agent/team/entities/team-member.entity';
import { User } from '../../../users/entities/user.entity';
import { Property } from '../../../property/entities/property.entity';

@Injectable()
export class LandlordTeamService {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async getTeam(leaderId: string) {
    const members = await this.teamMemberRepository.find({
      where: { leaderId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });

    const enrichedMembers = await Promise.all(members.map(async (member) => {
      const propertyCount = await this.propertyRepository.count({
        where: [
          { agentId: member.userId, ownerId: leaderId },
          { caretakerId: member.userId, ownerId: leaderId },
        ]
      });

      return {
        id: member.id,
        name: `${member.user.firstName} ${member.user.lastName}`,
        role: member.role,
        status: member.status,
        email: member.user.email,
        phone: member.user.phone,
        properties: propertyCount,
        joinedDate: member.createdAt,
      };
    }));

    return enrichedMembers;
  }

  async addMember(leaderId: string, email: string, role: string = 'Member') {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const existingMember = await this.teamMemberRepository.findOne({ 
      where: { leaderId, userId: user.id } 
    });
    if (existingMember) throw new ConflictException('Member already in team');

    const member = this.teamMemberRepository.create({
      leaderId,
      userId: user.id,
      role,
      status: 'Active',
    });

    return this.teamMemberRepository.save(member);
  }

  async removeMember(leaderId: string, memberId: string) {
    const member = await this.teamMemberRepository.findOne({ 
      where: { id: memberId, leaderId } 
    });
    if (!member) throw new NotFoundException('Team member not found');
    return this.teamMemberRepository.remove(member);
  }

  async updateMemberRole(leaderId: string, memberId: string, role: string) {
    const member = await this.teamMemberRepository.findOne({ 
      where: { id: memberId, leaderId } 
    });
    if (!member) throw new NotFoundException('Team member not found');
    member.role = role;
    return this.teamMemberRepository.save(member);
  }
}
