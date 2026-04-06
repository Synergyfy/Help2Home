import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaretakerController } from './caretaker.controller';
import { CaretakerService } from './caretaker.service';
import { Property } from '../../property/entities/property.entity';
import { Maintenance } from '../agent/maintenance/entities/maintenance.entity';
import { User } from '../../users/entities/user.entity';
import { TenantNotification } from '../../users/entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, Maintenance, User, TenantNotification]),
  ],
  controllers: [CaretakerController],
  providers: [CaretakerService],
  exports: [CaretakerService],
})
export class CaretakerModule {}
