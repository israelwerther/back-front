import { IsNumber, IsString } from "class-validator";

export class CreateClientCredcoopDto {
    @IsNumber()
    clientName: string;

    @IsString()
    cpf: string;
}
