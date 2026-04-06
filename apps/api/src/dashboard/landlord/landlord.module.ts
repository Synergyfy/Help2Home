import { Module } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { LandlordDashboardController } from './landlord-dashboard.controller';
import { PropertyModule } from '../../property/property.module';
import { TenantModule } from '../../tenant/tenant.module';
import { UsersModule } from '../../users/users.module';
import { ApplicationModule } from '../../application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMember } from '../agent/team/entities/team-member.entity';
import { Maintenance } from '../agent/maintenance/entities/maintenance.entity';
import { SupportTicket } from '../admin/support/entities/support-ticket.entity';
import { Property } from '../../property/entities/property.entity';
import { User } from '../../users/entities/user.entity';
import { Contract } from '../../contract/entities/contract.entity';
import { PaymentTransaction } from '../../payment/entities/payment-transaction.entity';
import { PayoutTransaction } from '../../payment/entities/payout-transaction.entity';
import { ContractTemplate } from '../../contract/entities/contract-template.entity';
import { TenantNotification } from '../../users/entities/notification.entity';

// Controllers
import { LandlordMaintenanceController } from './maintenance/maintenance.controller';
import { LandlordTeamController } from './team/team.controller';
import { LandlordSupportController } from './support/support.controller';
import { LandlordContractsController } from './contracts/contracts.controller';
import { LandlordPaymentsController } from './payments/payments.controller';
import { LandlordAnalyticsController } from './analytics/analytics.controller';

// Services
import { LandlordMaintenanceService } from './maintenance/maintenance.service';
import { LandlordTeamService } from './team/team.service';
import { LandlordContractsService } from './contracts/contracts.service';
import { LandlordPaymentsService } from './payments/payments.service';
import { AnalyticsService } from './analytics/analytics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamMember, Maintenance, SupportTicket, Property, User, Contract, PaymentTransaction, PayoutTransaction, ContractTemplate, TenantNotification]),
    PropertyModule,
    TenantModule,
    UsersModule,
    ApplicationModule,
  ],
  controllers: [
    LandlordDashboardController,
    LandlordMaintenanceController,
    LandlordTeamController,
    LandlordSupportController,
    LandlordContractsController,
    LandlordPaymentsController,
    LandlordAnalyticsController,
  ],
  providers: [
    LandlordService,
    LandlordMaintenanceService,
    LandlordTeamService,
    LandlordContractsService,
    LandlordPaymentsService,
    AnalyticsService,
  ],
  exports: [LandlordService],
})
export class LandlordModule {}