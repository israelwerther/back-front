import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { RateEntity } from './entities/rate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateResolver } from 'src/graphql/resolver/rate.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([RateEntity])],
  controllers: [RateController],
  providers: [RateService, RateResolver],
  exports: [RateService],
})
export class RateModule {}
