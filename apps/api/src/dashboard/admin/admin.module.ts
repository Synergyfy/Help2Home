import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Root admin
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

// Entities from subfolders
import { User } from '../../users/entities/user.entity';
import { Property } from '../../property/entities/property.entity';
import { Application } from '../../application/entities/application.entity';
import { SupportTicket } from './support/entities/support-ticket.entity';
import { SupportMessage } from './support/entities/support-message.entity';
import { FAQ } from './support/entities/faq.entity';
import { AuditLog } from './audit/entities/audit-log.entity';
import { Education } from './education/entities/education.entity';
import { PlatformSettings } from './settings/entities/platform-settings.entity';

import { SavedEducation } from './education/entities/saved-education.entity';

// Sub-controllers
import { AdminProfileController } from './profile/profile.controller';
import { AdminUsersController } from './users/users.controller';
import { AdminSuperroleController } from './superrole/superrole.controller';
import { AdminListingController } from './listing/listing.controller';
import { AdminAuditController } from './audit/audit.controller';
import { AdminSupportController } from './support/support.controller';
import { AdminEducationController } from './education/education.controller';
import { AdminSettingsController } from './settings/settings.controller';

// Sub-services
import { AdminUsersService } from './users/users.service';
import { AdminSuperroleService } from './superrole/superrole.service';
import { AdminAuditService } from './audit/audit.service';
import { AdminSupportService } from './support/support.service';
import { AdminEducationService } from './education/education.service';
import { AdminSettingsService } from './settings/settings.service';

// Shared modules
import { ProfileModule } from '../../profile/profile.module';
import { PropertyModule } from '../../property/property.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Property,
      Application,
      SupportTicket,
      SupportMessage,
      FAQ,
      AuditLog,
      Education,
      SavedEducation,
      PlatformSettings,
    ]),
    ProfileModule,   // so AdminProfileController can use ProfileService
    PropertyModule,  // so AdminListingController can use PropertyService
  ],
  controllers: [
    AdminController,           // Page 1: /dashboard/admin
    AdminProfileController,    // Page 2: /dashboard/admin/profile
    AdminUsersController,      // Page 3: /dashboard/admin/users
    AdminSuperroleController,  // Page 4: /dashboard/admin/superrole
    AdminListingController,    // Page 5: /dashboard/admin/listing
    AdminAuditController,      // Page 6: /dashboard/admin/audit
    AdminSupportController,    // Page 7: /dashboard/admin/support
    AdminEducationController,  // Page 8: /dashboard/admin/education
    AdminSettingsController,   // Page 9: /dashboard/admin/settings
  ],
  providers: [
    AdminService,
    AdminUsersService,
    AdminSuperroleService,
    AdminAuditService,
    AdminSupportService,
    AdminEducationService,
    AdminSettingsService,
  ],
  exports: [AdminSupportService, AdminEducationService],
})
export class AdminModule {}
