import { ReturnClientCredcoopAddressDto } from "src/client-address/dto/return-client-credcoop-address.dto";
import { CredcoopClientEntity } from "../entities/credcoop-client.entity";
import { ReturnClientLoanDto } from "src/loan/dto/return-client-loan.dto";


export class ReturnClientCredcoopDto {
    id: number;
    clientName: string;
    cpf: string;
    idCard: string;
    clientAddresses?: ReturnClientCredcoopAddressDto[];
    clientLoans?: ReturnClientLoanDto[];

    constructor(credcoopClientEntity: CredcoopClientEntity) {
        this.id = credcoopClientEntity.id;
        this.clientName = credcoopClientEntity.clientName;
        this.cpf = credcoopClientEntity.cpf;

        this.clientAddresses = credcoopClientEntity.clientAddresses
            ? credcoopClientEntity.clientAddresses.map((clientAddress) => new ReturnClientCredcoopAddressDto(clientAddress))
            : undefined;
        
        this.clientLoans = credcoopClientEntity.clientLoans
            ? credcoopClientEntity.clientLoans.map((clientLoans) => new ReturnClientLoanDto(clientLoans))
            : undefined;
    }
}