import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanEntity } from './entities/loan.entity';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(LoanEntity)
    private readonly loanRepository: Repository<LoanEntity>,
  ) {}

  async createLoan(createLoanDto: CreateLoanDto): Promise<LoanEntity> {
    return await this.loanRepository.save(createLoanDto);
  }

  async findLoanId(loanId: number): Promise<LoanEntity> {
    const user = await this.loanRepository.findOne({
      where: { id: loanId },
    });

    if (!user) {
      throw new NotFoundException(`Loan ${loanId} not found`);
    }
    return user;
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
