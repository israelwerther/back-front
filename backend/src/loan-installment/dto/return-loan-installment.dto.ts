import { LoanInstallment } from "../entities/loan-installment.entity";

export class ReturnLoanInstallmentDto {
    id: number;
    installmentValue: number;   
    dueDate: Date;

    constructor(loans: LoanInstallment) {
        this.id = loans.id;
        this.installmentValue = loans.installmentValue;
        this.dueDate = loans.dueDate;        
    }
}