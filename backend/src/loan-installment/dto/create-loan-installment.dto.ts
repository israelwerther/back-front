import { IsNumber } from "class-validator";

export class CreateLoanInstallmentDto {    
    @IsNumber()
    installmentValue: number;
}
