import { ClientAddress } from "./ClientAddress";

export interface CredcoopClient {
    clientName?: string | null | undefined;
    cpf?: string | null | undefined;
    idCard?: string | null | undefined;
    clientAddresses: ClientAddress[];
}