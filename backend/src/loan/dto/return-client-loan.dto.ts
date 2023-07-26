import { LoanEntity } from "../entities/loan.entity";

export class ReturnClientLoanDto {
    id: number;    
    contractNumber: string;    
    loanAmount: number;    
    interestRate: number;    
    startDate: Date;
    amountOfInstallments: number;

    constructor(clientLoans: LoanEntity) {
        this.id = clientLoans.id;
        this.contractNumber = clientLoans.contractNumber;
        this.loanAmount = clientLoans.loanAmount;
        this.interestRate = clientLoans.interestRate;
        this.startDate = clientLoans.startDate;
        this.amountOfInstallments = clientLoans.amountOfInstallments;        
    }
}