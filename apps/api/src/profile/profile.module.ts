import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { BankAccount } from './entities/bank-account.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { AuditLog } from '../dashboard/admin/audit/entities/audit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Profile, 
    User,
    BankAccount,
    PaymentMethod,
    NotificationPreference,
    AuditLog,
  ])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}

