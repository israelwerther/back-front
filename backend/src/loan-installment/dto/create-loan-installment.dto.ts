import { IsNumber } from "class-validator";

export class CreateLoanInstallmentDto {
    @IsNumber()
    installmentAmount: number;
}
