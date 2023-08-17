import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { LoanEntity } from './entities/loan.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { ReturnClientLoanDto } from './dto/return-client-loan.dto';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(LoanEntity)
    private readonly loanRepository: Repository<LoanEntity>,
  ) { }

  async createLoan(createLoanDto: CreateLoanDto): Promise<LoanEntity> {
    const loan = new LoanEntity();
    const loanAmount = createLoanDto.loanAmount
    const amountOfInstallments = createLoanDto.amountOfInstallments;

    const fees = 0.083
    const dailyIOF = 0.00137
    const extraIOF = 0.0038
    

    // Parcela
    const calculatedInstallmentValue = this.calculateInstallmentValue(loanAmount, fees, amountOfInstallments);

    // Encargos
    let charges = [];
    if (amountOfInstallments > 1) {
      let previousCharges = 0;
      for (let i = 0; i < amountOfInstallments; i++) {
        if (i === 0) {
          charges[i] = Math.round((loanAmount * fees) * 100) / 100;
        } else {
          previousCharges += charges[i - 1];
          charges[i] = Math.round(((loanAmount + previousCharges) * fees) * 100) / 100;
        }
      }
    }

    // Lógica para cálculo do valor principal
    let valueMain = [];
    if (amountOfInstallments > 1) {
      for (let i = 0; i < amountOfInstallments; i++) {        
        valueMain[i] = Math.floor((Number(calculatedInstallmentValue) - charges[i]) * 100) / 100;
        
      }
    } else {
      for (let i = 0; i < amountOfInstallments; i++) {
        valueMain[0] = loanAmount // Quando é em apenas uma parcela esse valor deve ser esse mesmo?        
      }
    }

    // Ajusta a quantidade de dias para alinhar os cálculos
    const startDate = new Date(createLoanDto.startDate);
    const month = startDate.getMonth() + 1;
    let auxMonth = month;
    let numberOfDays = 0;
    let sumIOFOutOfContract = 0;
    let IOFOutOfContract = [];

    for (let i = 0; i < amountOfInstallments; i++) {
      if (auxMonth == 1 || auxMonth == 3 || auxMonth == 5 || auxMonth == 7 || auxMonth == 8 || auxMonth == 10 || auxMonth == 12) {
        numberOfDays += 31;
      } else if (auxMonth == 2) {
        numberOfDays += 28;
      } else {
        numberOfDays += 30;
      }

      auxMonth += 1;
      if (auxMonth == 13) {
        auxMonth = 1;
      }

      IOFOutOfContract[i] = Math.floor(((valueMain[i]*numberOfDays*dailyIOF)/100)*100)/100 + Math.floor((valueMain[i]*extraIOF)*100)/100
      sumIOFOutOfContract += IOFOutOfContract[i]      
    }
    
    // iof_inicial
    const initialIOF = Math.round(sumIOFOutOfContract*100)/100

    // juros_acerto
    const interestRateAdjustment = loanAmount*(fees/30)*((auxMonth+1)-(auxMonth+1))

    // iof_final
    const finalIOF = Math.round((loanAmount*initialIOF)/(loanAmount-initialIOF)*100)/100

    // valor_contrato
    const valueInTheContract = loanAmount+interestRateAdjustment+finalIOF

    // valor_total_a_Prazo
    let totalTermValue = Math.round((valueInTheContract*(1+fees)**amountOfInstallments)*100)/100

    let finalInstallment = 0
    let boleto = true
    if (boleto) {
      finalInstallment = Math.round((totalTermValue / amountOfInstallments + 10) * 100) / 100
    } else {
      finalInstallment = Math.round((totalTermValue / amountOfInstallments) * 100) / 100
      console.log('2');
    }
    

    if (amountOfInstallments) {
      createLoanDto.installments = Array.from({ length: amountOfInstallments },
        () => ({
          installmentValue: finalInstallment,
        }),
      );
    }

    Object.assign(loan, createLoanDto);

    const createdLoan = await this.loanRepository.save(loan);

    return createdLoan;
  }

  calculateInstallmentValue(loanAmount: number, fees: number, amountOfInstallments: number): string {
    return ((loanAmount * (1 + fees) ** amountOfInstallments) / amountOfInstallments).toFixed(2);
  }
  

  async getAllCredcoopLoan(options: IPaginationOptions & { searchQuery?: string }): Promise<Pagination<ReturnClientLoanDto>> {
    const queryBuilder = this.loanRepository.createQueryBuilder('loan');
    queryBuilder.select([
      'loan.id',
      'loan.contractNumber',
      'loan.loanAmount',
      'loan.credcoopClientLoanId',
      'client.clientName',
    ]).orderBy('loan.createdAt', 'DESC');

    if (options.searchQuery) {
      queryBuilder.where(
        '(loan.contractNumber ILIKE :searchQuery OR client.clientName ILIKE :searchQuery) AND loan.credcoopClientLoanId IS NOT NULL',
        { searchQuery: `%${options.searchQuery}%` }
      );
    } else {
      queryBuilder.where('loan.credcoopClientLoanId IS NOT NULL');
    }

    queryBuilder.leftJoin('loan.credcoopClient', 'client', 'loan.credcoopClientLoanId = client.id');

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

  async getTotalCredcoopLoans(): Promise<number> {
    const totalCredcoopLoans = await this.loanRepository.count({
      where: { credcoopClientLoanId: Not(IsNull()) }
    })
    return totalCredcoopLoans;
  }

}
