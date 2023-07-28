import { ClientAddressEntity } from '../entities/client-address.entity';

export class ReturnCredcoopClientAddressDto {
    id: number;
    zipCode: string
    street: string
    neighborhood: string
    state: string
    city: string
    buildingNumber: string
    referencePoint: string
    complement: string

    constructor(clientAddess: ClientAddressEntity) {
        this.id = clientAddess.id;
        this.zipCode = clientAddess.zipCode;
        this.street = clientAddess.street;
        this.neighborhood = clientAddess.neighborhood;
        this.state = clientAddess.state;
        this.city = clientAddess.city;
        this.buildingNumber = clientAddess.buildingNumber;
        this.referencePoint = clientAddess.referencePoint;
        this.complement = clientAddess.complement;
    }
}