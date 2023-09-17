import { IsBoolean, IsDateString, IsNumber } from "class-validator";
import { CreateLoanInstallmentDto } from "src/loan-installment/dto/create-loan-installment.dto";

export class CreateLoanDto {    
    @IsNumber()
    loanAmount: number;

    @IsDateString()
    startDate: Date;

    @IsNumber()
    amountOfInstallments: number;

    @IsBoolean()
    inPersonModality: boolean;

    @IsBoolean()
    onlineModality: boolean;

    @IsNumber()
    credcoopClientLoanId: number;    
    
    installments: CreateLoanInstallmentDto[];
}
