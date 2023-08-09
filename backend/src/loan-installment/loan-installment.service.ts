import { Injectable } from '@nestjs/common';
import { CreateLoanInstallmentDto } from './dto/create-loan-installment.dto';
import { UpdateLoanInstallmentDto } from './dto/update-loan-installment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanInstallment } from './entities/loan-installment.entity';
import { Repository } from 'typeorm';
import { LoanEntity } from 'src/loan/entities/loan.entity';
import { LoanService } from 'src/loan/loan.service';

@Injectable()
export class LoanInstallmentService {
  constructor(
    @InjectRepository(LoanInstallment)
    private readonly loanInstallmentRepository: Repository<LoanInstallment>,
    private readonly loanService: LoanService,
  ) {}

  async createLoanInstallment(
    createLoanInstallmentDto: CreateLoanInstallmentDto,
    loanId: number
  ): Promise<LoanInstallment> {
    await this.loanService.findLoanId(loanId);
    return this.loanInstallmentRepository.save({
      ...createLoanInstallmentDto,
      loanId,
    });
  }

  findAll() {
    return `This action returns all loanInstallment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loanInstallment`;
  }

  update(id: number, updateLoanInstallmentDto: UpdateLoanInstallmentDto) {
    return `This action updates a #${id} loanInstallment`;
  }

  remove(id: number) {
    return `This action removes a #${id} loanInstallment`;
  }
}
