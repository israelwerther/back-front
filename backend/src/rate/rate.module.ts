import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { RateEntity } from './entities/rate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RateEntity])],
  controllers: [RateController],
  providers: [RateService],
  exports: [RateService],
})
export class RateModule {}
