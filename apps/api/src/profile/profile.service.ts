import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { BankAccount } from './entities/bank-account.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(NotificationPreference)
    private readonly notificationPreferenceRepository: Repository<NotificationPreference>,
  ) {}

  async getMyProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    let profile = await this.profileRepository.findOne({ where: { userId } });
    if (!profile) {
      profile = this.profileRepository.create({ userId });
      await this.profileRepository.save(profile);
    }

    const bankAccounts = await this.bankAccountRepository.find({ where: { userId } });
    const paymentMethods = await this.paymentMethodRepository.find({ where: { userId } });
    const notificationPreferences = await this.notificationPreferenceRepository.find({ where: { userId } });

    return {
      ...this.buildProfileResponse(user, profile),
      bankAccounts,
      paymentMethods,
      preferences: notificationPreferences,
    };
  }

  async updateMyProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    let profile = await this.profileRepository.findOne({ where: { userId } });
    if (!profile) {
      profile = this.profileRepository.create({ userId });
    }

    if (dto.firstName !== undefined) user.firstName = dto.firstName;
    if (dto.lastName !== undefined) user.lastName = dto.lastName;
    if (dto.phone !== undefined) user.phone = dto.phone;

    if (dto.avatar !== undefined) profile.avatar = dto.avatar;
    if (dto.bio !== undefined) profile.bio = dto.bio;
    if (dto.dob !== undefined) profile.dob = dto.dob;
    if (dto.gender !== undefined) profile.gender = dto.gender;
    if (dto.maritalStatus !== undefined) profile.maritalStatus = dto.maritalStatus;
    if (dto.address !== undefined) profile.address = dto.address;
    if (dto.state !== undefined) profile.state = dto.state;
    if (dto.country !== undefined) profile.country = dto.country;
    if (dto.occupation !== undefined) profile.occupation = dto.occupation;

    await this.userRepository.save(user);
    await this.profileRepository.save(profile);

    return this.getMyProfile(userId);
  }

  async setNotificationPreference(userId: string, type: string, enabled: boolean) {
    let pref = await this.notificationPreferenceRepository.findOne({ where: { userId, type } });
    if (pref) {
      pref.enabled = enabled;
    } else {
      pref = this.notificationPreferenceRepository.create({ userId, type, enabled });
    }
    await this.notificationPreferenceRepository.save(pref);
    return this.notificationPreferenceRepository.find({ where: { userId } });
  }

  async removeBankAccount(userId: string, id: string) {
    await this.bankAccountRepository.delete({ id, userId });
    return this.bankAccountRepository.find({ where: { userId } });
  }

  async removePaymentMethod(userId: string, id: string) {
    await this.paymentMethodRepository.delete({ id, userId });
    return this.paymentMethodRepository.find({ where: { userId } });
  }

  private buildProfileResponse(user: User, profile: Profile) {
    return {
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || '',
        verified: user.verified,
        roles: user.roles,
        isActive: user.isActive,
        twoFactorEnabled: user.twoFactorEnabled, // assuming we map this from user later if it exists
        avatar: profile.avatar || null,
        bio: profile.bio || '',
        dob: profile.dob || '',
        gender: profile.gender || '',
        maritalStatus: profile.maritalStatus || '',
        address: profile.address || '',
        state: profile.state || '',
        country: profile.country || '',
        occupation: profile.occupation || '',
      },
    };
  }
}
