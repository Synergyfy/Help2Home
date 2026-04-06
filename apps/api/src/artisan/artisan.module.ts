import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artisan } from './entities/artisan.entity';
import { ArtisanService } from './artisan.service';
import { ArtisanController } from './artisan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Artisan])],
  controllers: [ArtisanController],
  providers: [ArtisanService],
  exports: [ArtisanService],
})
export class ArtisanModule {}
