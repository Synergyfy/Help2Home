import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { AdminModule } from '../dashboard/admin/admin.module';

@Module({
  imports: [AdminModule],
  controllers: [EducationController],
  providers: [],
  exports: [],
})
export class EducationModule {}
