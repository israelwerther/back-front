import { ReturnCredcoopClientAddressDto } from "src/client-address/dto/return-credcoop-client-address.dto";
import { CredcoopClientEntity } from "../entities/credcoop-client.entity";
import { ReturnClientLoanDto } from "src/loan/dto/return-client-loan.dto";


export class ReturnCredcoopClientDto {
    id: number;
    clientName: string;
    cpf: string;
    idCard: string;
    clientAddresses?: ReturnCredcoopClientAddressDto[];
    clientLoans?: ReturnClientLoanDto[];

    constructor(credcoopClientEntity: CredcoopClientEntity) {
        this.id = credcoopClientEntity.id;
        this.clientName = credcoopClientEntity.clientName;
        this.cpf = credcoopClientEntity.cpf;

        this.clientAddresses = credcoopClientEntity.clientAddresses
            ? credcoopClientEntity.clientAddresses.map((clientAddress) => new ReturnCredcoopClientAddressDto(clientAddress))
            : undefined;
        
        this.clientLoans = credcoopClientEntity.clientLoans
            ? credcoopClientEntity.clientLoans.map((clientLoans) => new ReturnClientLoanDto(clientLoans))
            : undefined;
    }
}