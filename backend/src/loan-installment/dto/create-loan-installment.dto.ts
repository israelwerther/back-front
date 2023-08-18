import { IsDate, IsNumber } from "class-validator";

export class CreateLoanInstallmentDto {    
    @IsNumber()
    installmentValue: number;

    @IsDate()
    dueDate: Date;
}
