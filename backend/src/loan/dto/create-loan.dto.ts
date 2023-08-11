import { IsDateString, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { CreateLoanInstallmentDto } from "src/loan-installment/dto/create-loan-installment.dto";

export class CreateLoanDto {
    
    @IsNumber()
    loanAmount: number;

    @IsNumber()
    interestRate: number;

    @IsDateString()
    startDate: Date;

    @IsNumber()
    amountOfInstallments: number;

    @IsNumber()
    clientLoanId: number;

    @ValidateNested({ each: true })
    installments: CreateLoanInstallmentDto[];
}
