import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { LoanEntity } from './entities/loan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanInstallmentModule } from 'src/loan-installment/loan-installment.module';
import { CredcoopLoanResolver } from 'src/graphql/resolver/credcoop-loan.resolver';
import { RateEntity } from 'src/rate/entities/rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanEntity, RateEntity])],
  controllers: [LoanController],
  providers: [LoanService, CredcoopLoanResolver],
  exports: [LoanService],
})
export class LoanModule { }
