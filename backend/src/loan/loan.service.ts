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
    const fees = 0.083
    const loanAmount = createLoanDto.loanAmount
    const amountOfInstallments = createLoanDto.amountOfInstallments;
    const iof_diario = 0.00137
    const iof_adicional = 0.0038

    // Parcela
    const calculatedInstallmentValue = ((loanAmount * (1 + fees) ** (amountOfInstallments))/amountOfInstallments).toFixed(2)

    // Encargos
    const encargos = [];
    if (amountOfInstallments > 1) {
      let somatorioEncargosAnteriores = 0;
      for (let i = 0; i < amountOfInstallments; i++) {
        if (i === 0) {
          encargos[i] = Math.round((loanAmount * fees) * 100) / 100;
        } else {
          somatorioEncargosAnteriores += encargos[i - 1];
          encargos[i] = Math.round(((loanAmount + somatorioEncargosAnteriores) * fees) * 100) / 100;
        }
      }
    }

    // Lógica para cálculo do valor principal
    const principal = [];
    if (amountOfInstallments > 1) {
      for (let i = 0; i < amountOfInstallments; i++) {        
        principal[i] = Math.floor((Number(calculatedInstallmentValue) - encargos[i]) * 100) / 100;        
      }
    } else {
      for (let i = 0; i < amountOfInstallments; i++) {
        principal[0] = loanAmount // Quando é em apenas uma parcela esse valor deve ser esse mesmo?        
      }
    }

    const startDate = new Date(createLoanDto.startDate);
    let mes = startDate.getMonth() + 1;
    let mes_num = mes;
    let qtd_dias = 0;
    let iof_fora_contrato_total = 0;

    let iof_fora_contrato = [];

    for (let i = 0; i < createLoanDto.amountOfInstallments; i++) {
      if (mes_num == 1 || mes_num == 3 || mes_num == 5 || mes_num == 7 || mes_num == 8 || mes_num == 10 || mes_num == 12) {
        qtd_dias += 31;
      } else if (mes_num == 2) {
        qtd_dias += 28;
      } else {
        qtd_dias += 30;
      }

      mes_num += 1;
      if (mes_num == 13) {
        mes_num = 1;
      }

      iof_fora_contrato[i] = Math.floor(((principal[i]*qtd_dias*iof_diario)/100)*100)/100 + Math.floor((principal[i]*iof_adicional)*100)/100
      iof_fora_contrato_total += iof_fora_contrato[i]      
    }
    
    // iof_inicial
    let iof_inicial = Math.round(iof_fora_contrato_total*100)/100
    // console.log('iof_inicial::: ', iof_inicial);

    // juros_acerto
    let juros_acerto = loanAmount*(fees/30)*((mes_num+1)-(mes_num+1))
    // console.log('juros_acerto::: ', juros_acerto);

    // iof_final
    let iof_final = Math.round((loanAmount*iof_inicial)/(loanAmount-iof_inicial)*100)/100
    // console.log('iof_final::: ', iof_final);

    // valor_contrato
    var valor_contrato = loanAmount+juros_acerto+iof_final
    // console.log('valor_contrato::: ', valor_contrato);

    // valor_total_a_Prazo
    var valor_total_a_Prazo = Math.round((valor_contrato*(1+fees)**amountOfInstallments)*100)/100
    console.log('valor_total_a_Prazo::: ', valor_total_a_Prazo);

    

    if (createLoanDto.amountOfInstallments) {
      createLoanDto.installments = Array.from({ length: createLoanDto.amountOfInstallments },
        () => ({
          installmentValue: 8877,
        }),
      );
    }

    Object.assign(loan, createLoanDto);

    const createdLoan = await this.loanRepository.save(loan);

    return createdLoan;
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
