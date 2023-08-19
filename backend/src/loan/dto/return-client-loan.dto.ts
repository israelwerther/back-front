import { ReturnLoanInstallmentDto } from 'src/loan-installment/dto/return-loan-installment.dto';
import { LoanEntity } from '../entities/loan.entity';

export class ReturnClientLoanDto {
  id: number;
  contractNumber: string;
  loanAmount: number;
  interestRate: number;
  startDate: Date;
  amountOfInstallments: number;
  inPersonModality: boolean;
  onlineModality: boolean;
  installments?: ReturnLoanInstallmentDto[];

  constructor(clientLoans: LoanEntity) {
    if (clientLoans) {
      this.id = clientLoans.id;
      this.contractNumber = clientLoans.contractNumber;
      this.loanAmount = clientLoans.loanAmount;
      this.interestRate = clientLoans.interestRate;
      this.startDate = clientLoans.startDate;
      this.amountOfInstallments = clientLoans.amountOfInstallments;
      this.inPersonModality = clientLoans.inPersonModality;
      this.onlineModality = clientLoans.onlineModality;

      this.installments = clientLoans.installments
        ? clientLoans.installments.map((loans) => new ReturnLoanInstallmentDto(loans))
        : undefined;
    }
  }
}
