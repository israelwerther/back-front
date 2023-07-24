import { IsString } from "class-validator";

export class CreateClientCredcoopDto {
    @IsString()
    clientName: string;

    @IsString()
    cpf: string;

    @IsString()
    idCard: string;
}
