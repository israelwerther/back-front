import { ClientAddress } from "./ClientAddress";

export interface ClientCredcoop {
    clientName: string | null | undefined;
    cpf: string | null | undefined;
    clientAddresses: ClientAddress[];
}