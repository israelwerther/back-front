import { Installments } from "./installments";

export interface Loan {    
    contractNumber?: number | null;
    credcoopClientLoanId?: number | null;
    loanAmount?: number | null;
    startDate?: Date | null;
    amountOfInstallments?: number | null;
    inPersonModality?: boolean | null;
    onlineModality?: boolean | null;
    installments: Installments[];
}