import { IsNumber } from "class-validator";

export class CreateRateDto {
    @IsNumber()
    fees: number;

    @IsNumber()
    dailyIOF: number;

    @IsNumber()
    extraIOF: number;

    @IsNumber()
    lateFee: number;

    @IsNumber()
    defaultInterest: number;
}
