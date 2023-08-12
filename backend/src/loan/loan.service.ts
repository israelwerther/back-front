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
    const loan = new LoanEntity();
    Object.assign(loan, createLoanDto);
    this.loanRepository.create(loan);
    return await this.loanRepository.save(loan);
  }

  async getAllLoan(
    options: IPaginationOptions & { contractNumber?: string }
  ): Promise<Pagination<ReturnClientLoanDto>> {
    const queryBuilder = this.loanRepository.createQueryBuilder('loan');
    queryBuilder.select([
      'loan.id', 
      'loan.contractNumber',
      'loan.loanAmount',
      'loan.clientLoanId',
      'client.clientName',
    ]).orderBy('loan.createdAt', 'DESC');

    if (options.contractNumber) {
      queryBuilder.where('loan.contractNumber ILIKE :contractNumber', { contractNumber: `%${options.contractNumber}%` });
    }

    queryBuilder.leftJoin('loan.credcoopClient', 'client', 'loan.clientLoanId = client.id');

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
