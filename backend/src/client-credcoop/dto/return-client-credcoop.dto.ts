import { ReturnClientCredcoopAddressDto } from "src/client-address/dto/return-client-credcoop-address.dto";
import { ClientCredcoopEntity } from "../entities/client-credcoop.entity";
import { ReturnClientLoanDto } from "src/loan/dto/return-client-loan.dto";


export class ReturnClientCredcoopDto {
    id: number;
    clientName: string;
    cpf: string;
    idCard: string;
    clientAddresses?: ReturnClientCredcoopAddressDto[];
    clientLoans?: ReturnClientLoanDto[];

    constructor(clientCredcoopEntity: ClientCredcoopEntity) {
        this.id = clientCredcoopEntity.id;
        this.clientName = clientCredcoopEntity.clientName;
        this.cpf = clientCredcoopEntity.cpf;

        this.clientAddresses = clientCredcoopEntity.clientAddresses
            ? clientCredcoopEntity.clientAddresses.map((clientAddress) => new ReturnClientCredcoopAddressDto(clientAddress))
            : undefined;
        
        this.clientLoans = clientCredcoopEntity.clientLoans
            ? clientCredcoopEntity.clientLoans.map((clientLoans) => new ReturnClientLoanDto(clientLoans))
            : undefined;
    }
}