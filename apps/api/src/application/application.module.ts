import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ApplicationDocument } from './entities/application-document.entity';
import { ApplicationContract } from './entities/application-contract.entity';
import { ApplicationActivityLog } from './entities/application-activity-log.entity';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    Application,
    ApplicationDocument,
    ApplicationContract,
    ApplicationActivityLog,
  ])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService, TypeOrmModule],
})
export class ApplicationModule {}
