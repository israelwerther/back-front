export interface Loan {    
    clientLoanId?: number | null;
    loanAmount?: number | null;
    startDate?: Date | null;
    amountOfInstallments?: number | null;
    inPersonModality?: boolean | null;
    onlineModality?: boolean | null;
    interestRate?: number | null;
}