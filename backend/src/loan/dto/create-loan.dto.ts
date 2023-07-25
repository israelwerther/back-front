export class CreateLoanDto {    
    id: number;    
    contractNumber: string;    
    amount: number;    
    interestRate: number;    
    startDate: Date;
    amountOfInstallments: number;
}
