import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Root agent components
import { AgentController } from './agent-dashboard.controller';
import { AgentService } from './agent.service';

// Entities
import { User } from '../../users/entities/user.entity';
import { Property } from '../../property/entities/property.entity';
import { Application } from '../../application/entities/application.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { SupportTicket } from '../admin/support/entities/support-ticket.entity';
import { Education } from '../admin/education/entities/education.entity';
import { AgentSettings } from './settings/entities/agent-settings.entity';
import { Maintenance } from './maintenance/entities/maintenance.entity';
import { Inspection } from './schedule/entities/inspection.entity';
import { Transaction } from './transactions/entities/transaction.entity';
import { TeamMember } from './team/entities/team-member.entity';
import { DocumentEntity } from './documents/entities/document.entity';
import { Campaign } from './marketing/entities/campaign.entity';

// Sub-controllers
import { AgentProfileController } from './profile/profile.controller';
import { AgentLeadsController } from './leads/leads.controller';
import { AgentPropertiesController } from './properties/properties.controller';
import { AgentScheduleController } from './schedule/schedule.controller';
import { AgentMaintenanceController } from './maintenance/maintenance.controller';
import { AgentMarketingController } from './marketing/marketing.controller';
import { AgentTransactionsController } from './transactions/transactions.controller';
import { AgentTeamController } from './team/team.controller';
import { AgentDocumentsController } from './documents/documents.controller';
import { AgentSupportController } from './support/support.controller';
import { AgentEducationController } from './education/education.controller';
import { AgentSettingsController } from './settings/settings.controller';

// Sub-services
import { AgentSettingsService } from './settings/settings.service';
import { MaintenanceService } from './maintenance/maintenance.service';
import { InspectionService } from './schedule/inspection.service';
import { TransactionService } from './transactions/transactions.service';
import { TeamService } from './team/team.service';
import { DocumentService } from './documents/documents.service';
import { MarketingService } from './marketing/marketing.service';

// Shared modules
import { ProfileModule } from '../../profile/profile.module';
import { PropertyModule } from '../../property/property.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Property,
      Application,
      Profile,
      SupportTicket,
      Education,
      AgentSettings,
      Maintenance,
      Inspection,
      Transaction,
      TeamMember,
      DocumentEntity,
      Campaign,
    ]),
    ProfileModule,
    PropertyModule,
  ],
  controllers: [
    AgentController,
    AgentProfileController,
    AgentLeadsController,
    AgentPropertiesController,
    AgentScheduleController,
    AgentMaintenanceController,
    AgentMarketingController,
    AgentTransactionsController,
    AgentTeamController,
    AgentDocumentsController,
    AgentSupportController,
    AgentEducationController,
    AgentSettingsController,
  ],
  providers: [
    AgentService,
    AgentSettingsService,
    MaintenanceService,
    InspectionService,
    TransactionService,
    TeamService,
    DocumentService,
    MarketingService,
  ],
  exports: [AgentService, MaintenanceService, InspectionService, TransactionService],
})
export class AgentModule {}
