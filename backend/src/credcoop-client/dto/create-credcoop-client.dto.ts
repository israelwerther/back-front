import { IsString } from "class-validator";

export class CreateCredcoopClientDto {
    @IsString()
    clientName: string;

    @IsString()
    cpf: string;

    @IsString()
    idCard: string;
}
