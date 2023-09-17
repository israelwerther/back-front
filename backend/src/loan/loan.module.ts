import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { LoanEntity } from './entities/loan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredcoopLoanResolver } from 'src/graphql/resolver/credcoop-loan.resolver';
import { RateEntity } from 'src/rate/entities/rate.entity';
import { RateService } from 'src/rate/rate.service';
import { YourResolver } from 'src/graphql/resolver/loan.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([LoanEntity, RateEntity])],
  controllers: [LoanController],
  providers: [LoanService, RateService, CredcoopLoanResolver, YourResolver],
  exports: [LoanService],
})
export class LoanModule { }
