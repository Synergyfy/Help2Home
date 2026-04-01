import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LandlordModule } from './landlord/landlord.module';
import { UsersModule } from './users/users.module';
import { PropertyModule } from './property/property.module';
import { TenantModule } from './tenant/tenant.module';
import { ApplicationModule } from './application/application.module';
import { User } from './users/entities/user.entity';
import { Property } from './property/entities/property.entity';
import { Tenant } from './tenant/entities/tenant.entity';
import { Application } from './application/entities/application.entity';

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
        entities: [User, Property, Tenant, Application],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
    AuthModule,
    UsersModule,
    PropertyModule,
    TenantModule,
    ApplicationModule,
    LandlordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}