import { IsBoolean, IsDateString, IsNumber, ValidateNested } from "class-validator";
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

    @IsBoolean()
    inPersonModality: boolean;

    @IsBoolean()
    onlineModality: boolean;

    @IsNumber()
    clientLoanId: number;

    @ValidateNested({ each: true })
    installments: CreateLoanInstallmentDto[];
}
