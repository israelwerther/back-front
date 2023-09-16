import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { LoanEntity } from './entities/loan.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { ReturnClientLoanDto } from './dto/return-client-loan.dto';
import * as moment from 'moment-timezone';
import { RateService } from 'src/rate/rate.service';


@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(LoanEntity)
    private readonly loanRepository: Repository<LoanEntity>,
    private readonly rateService: RateService,
  ) { }

  async createLoan(createLoanDto: CreateLoanDto): Promise<LoanEntity> {
    const loan = new LoanEntity();
    const loanAmount = createLoanDto.loanAmount
    const amountOfInstallments = createLoanDto.amountOfInstallments;
    const startDate = moment.tz(createLoanDto.startDate, 'UTC');

    // Taxas fixas
    const latestRate = await this.rateService.getLatestRate();
    const fees = parseFloat(latestRate.fees.toString());
    const dailyIOF = parseFloat(latestRate.dailyIOF.toString());
    const extraIOF = parseFloat(latestRate.extraIOF.toString());

    const calculatedValues = this.calculateLoanValues(loanAmount, amountOfInstallments, fees, dailyIOF, extraIOF, createLoanDto.startDate);

    const dueDates = this.createInstallmentDates(startDate, amountOfInstallments)

    if (amountOfInstallments) {
      createLoanDto.installments = [];
      for (let i = 0; i < amountOfInstallments; i++) {
        createLoanDto.installments.push({
          installmentValue: calculatedValues.finalInstallment,
          dueDate: dueDates[i],
        });
      }      
    }
    else {
      createLoanDto.installments = [];
    }

    Object.assign(loan, createLoanDto);

    const createdLoan = await this.loanRepository.save(loan);
    console.log('createdLoan::: ', createdLoan);

    return createdLoan;
  }

  // Calcula valores do empréstimo
  private calculateLoanValues(loanAmount: number, amountOfInstallments: number, fees: number, dailyIOF: number, extraIOF: number, loanStartDate: Date) {

    // Parcela
    const calculatedInstallmentValue = ((loanAmount * (1 + fees) ** amountOfInstallments) / amountOfInstallments).toFixed(2);

    // Encargos
    const charges = [];
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
    const valueMain = [];
    if (amountOfInstallments > 1) {
      for (let i = 0; i < amountOfInstallments; i++) {
        valueMain[i] = Math.floor((Number(calculatedInstallmentValue) - charges[i]) * 100) / 100;
      }
    } else {
      for (let i = 0; i < amountOfInstallments; i++) {
        valueMain[0] = loanAmount;
      }
    }

    // Ajusta a quantidade de dias para alinhar os cálculos
    const startDate = new Date(loanStartDate);
    const month = startDate.getMonth() + 1;
    const IOFOutOfContract = [];
    let auxMonth = month;
    let numberOfDays = 0;
    let sumIOFOutOfContract = 0;

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

      IOFOutOfContract[i] = Math.floor(((valueMain[i] * numberOfDays * dailyIOF) / 100) * 100) / 100 + Math.floor((valueMain[i] * extraIOF) * 100) / 100;
      sumIOFOutOfContract += IOFOutOfContract[i];
    }

    // IOF inicial
    const initialIOF = Math.round(sumIOFOutOfContract * 100) / 100;

    // Acerto de juros
    const interestRateAdjustment = loanAmount * (fees / 30) * ((auxMonth + 1) - (auxMonth + 1));

    // IOF final
    const finalIOF = Math.round((loanAmount * initialIOF) / (loanAmount - initialIOF) * 100) / 100;

    // Valor contrato
    const valueInTheContract = loanAmount + interestRateAdjustment + finalIOF;

    // Valor total a prazo
    const totalTermValue = Math.round((valueInTheContract * (1 + fees) ** amountOfInstallments) * 100) / 100;

    const boleto = false;

    let finalInstallment = 0;
    if (boleto) {
      finalInstallment = Math.round((totalTermValue / amountOfInstallments + 10) * 100) / 100;
    } else {
      finalInstallment = Math.round((totalTermValue / amountOfInstallments) * 100) / 100;
    }

    return {
      calculatedInstallmentValue,
      charges,
      valueMain,
      startDate,
      totalTermValue,
      boleto,
      finalInstallment
    };
  }

  // Cria as datas de vencimento
  private createInstallmentDates(startDate: moment.Moment, amountOfInstallments: number) {
    var dueDates = [moment(startDate.toDate()).add(1, 'month').toDate()];

    for (let i = 1; i < amountOfInstallments; i++) {
      let aux = moment(dueDates[i - 1]).add(1, 'month');
      dueDates.push(aux.toDate());
    }

    return dueDates;
  }

  // Retorna todos os empréstimos Credcoop paginados 
  async getAllCredcoopLoan(options: IPaginationOptions & { searchQuery?: string }): Promise<Pagination<ReturnClientLoanDto>> {
    const queryBuilder = this.loanRepository.createQueryBuilder('loan');
    queryBuilder.select([
      'loan.id',
      'loan.contractNumber',
      'loan.loanAmount',
      'loan.startDate',
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

  async findOne(id: number): Promise<LoanEntity> {
    return await this.loanRepository.findOne({
      where: {
        id: id,
      },
      relations: ['installments']
    });
  }

  async editLoan(id: number, updatedData: ReturnClientLoanDto): Promise<LoanEntity> {
    const existingClient = await this.loanRepository.findOne({
      where: {
        id: id,
      },
      relations: ['installments']
    });

    if (!existingClient) {
      throw new NotFoundException('Loan not found');
    }

    Object.assign(existingClient, updatedData); ReturnClientLoanDto
    return this.loanRepository.save(existingClient);
  }




}
