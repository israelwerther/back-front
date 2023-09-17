import { ReturnLoanInstallmentDto } from 'src/loan-installment/dto/return-loan-installment.dto';
import { LoanEntity } from '../entities/loan.entity';
import { LoanInstallment } from 'src/loan-installment/entities/loan-installment.entity';

export class ReturnClientLoanDto {
  id: number;
  contractNumber: string;
  loanAmount: number;
  startDate: Date;
  amountOfInstallments: number;
  inPersonModality: boolean;
  onlineModality: boolean;
  installments?: LoanInstallment[];

  constructor(clientLoans: LoanEntity) {
    if (clientLoans) {
      this.id = clientLoans.id;
      this.contractNumber = clientLoans.contractNumber;
      this.loanAmount = clientLoans.loanAmount;
      this.startDate = clientLoans.startDate;
      this.amountOfInstallments = clientLoans.amountOfInstallments;
      this.inPersonModality = clientLoans.inPersonModality;
      this.onlineModality = clientLoans.onlineModality;

      this.installments = clientLoans.installments
      // this.installments = clientLoans.installments
      //   ? clientLoans.installments.map((loans) => new ReturnLoanInstallmentDto(loans))
      //   : undefined;


    }
  }
}
