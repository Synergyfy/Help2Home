import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TenantDashboardController } from './tenant-dashboard.controller';
import { AgentModule } from '../dashboard/agent/agent.module';
import { AdminModule } from '../dashboard/admin/admin.module';
import { ApplicationModule } from '../application/application.module';
import { PropertyModule } from '../property/property.module';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
    AgentModule,
    AdminModule,
    ApplicationModule,
    PropertyModule,
    UsersModule,
  ],
  controllers: [TenantController, TenantDashboardController],
  providers: [TenantService],
  exports: [TenantService, TypeOrmModule],
})
export class TenantModule {}
