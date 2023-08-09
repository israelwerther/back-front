import { Module } from '@nestjs/common';
import { LoanInstallmentService } from './loan-installment.service';
import { LoanInstallmentController } from './loan-installment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanInstallment } from './entities/loan-installment.entity';
import { LoanModule } from 'src/loan/loan.module';

@Module({
  imports: [TypeOrmModule.forFeature([LoanInstallment]), LoanModule],
  controllers: [LoanInstallmentController],
  providers: [LoanInstallmentService],
})
export class LoanInstallmentModule {}
