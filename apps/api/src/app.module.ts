import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LandlordModule } from './dashboard/landlord/landlord.module';
import { UsersModule } from './users/users.module';
import { PropertyModule } from './property/property.module';
import { TenantModule } from './tenant/tenant.module';
import { ApplicationModule } from './application/application.module';
import { User } from './users/entities/user.entity';
import { Property } from './property/entities/property.entity';
import { Tenant } from './tenant/entities/tenant.entity';
import { Application } from './application/entities/application.entity';
import { AdminModule } from './dashboard/admin/admin.module';
import { AgentModule } from './dashboard/agent/agent.module';
import { CaretakerModule } from './dashboard/caretaker/caretaker.module';
import { ProfileModule } from './profile/profile.module';
import { EducationModule } from './education/education.module';
import { Profile } from './profile/entities/profile.entity';
import { SupportTicket } from './dashboard/admin/support/entities/support-ticket.entity';
import { AuditLog } from './dashboard/admin/audit/entities/audit-log.entity';
import { Education } from './dashboard/admin/education/entities/education.entity';
import { PlatformSettings } from './dashboard/admin/settings/entities/platform-settings.entity';
import { AgentSettings } from './dashboard/agent/settings/entities/agent-settings.entity';
import { ChatModule } from './chat/chat.module';
import { Conversation } from './chat/entities/conversation.entity';
import { ChatMessage } from './chat/entities/chat-message.entity';
import { Contract } from './contract/entities/contract.entity';
import { PaymentTransaction } from './payment/entities/payment-transaction.entity';
import { PayoutTransaction } from './payment/entities/payout-transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          User, Property, Tenant, Application, Profile, SupportTicket, 
          AuditLog, Education, PlatformSettings, AgentSettings,
          Conversation, ChatMessage, Contract,
          PaymentTransaction, PayoutTransaction
        ],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        ssl: configService.get<string>('DB_SSL') === 'true',
        extra:
          configService.get<string>('DB_SSL') === 'true'
            ? {
                ssl: {
                  rejectUnauthorized: false,
                },
              }
            : {},
      }),
    }),
    AuthModule,
    UsersModule,
    PropertyModule,
    TenantModule,
    ApplicationModule,
    LandlordModule,
    AdminModule,
    AgentModule,
    CaretakerModule,
    ProfileModule,
    ChatModule,
    EducationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}