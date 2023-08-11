import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanEntity } from './entities/loan.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { ReturnClientLoanDto } from './dto/return-client-loan.dto';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(LoanEntity)
    private readonly loanRepository: Repository<LoanEntity>,
  ) {}

  async createLoan(createLoanDto: CreateLoanDto): Promise<LoanEntity> {
    console.log('=========');
    const loan = new LoanEntity();
    Object.assign(loan, createLoanDto);
    this.loanRepository.create(loan);
    return await this.loanRepository.save(loan);
  }

  async getAllLoan(
    options: IPaginationOptions & { contractNumber?: string }
  ): Promise<Pagination<ReturnClientLoanDto>> {
    const queryBuilder = this.loanRepository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.contractNumber']).orderBy('c.contractNumber', 'ASC');

    if (options.contractNumber) {
      queryBuilder.where('c.contractNumber ILIKE :contractNumber', { contractNumber: `%${options.contractNumber}%` });
    }

    return paginate<ReturnClientLoanDto>(queryBuilder, options);
  }

  async findLoanId(loanId: number): Promise<LoanEntity> {
    const loan = await this.loanRepository.findOne({
      where: { id: loanId },
    });

    if (!loan) {
      throw new NotFoundException(`Loan ${loanId} not found`);
    }
    return loan;
  }

  findAll() {
    return `This action returns all loan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loan`;
  }

  update(id: number, updateLoanDto: UpdateLoanDto) {
    return `This action updates a #${id} loan`;
  }

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}
