import { ReturnCityDto } from 'src/city/dtos/returnCity.dto';
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  id: number;
  complement: string;
  numberAddress: number;
  cep: string;
  city?: ReturnCityDto;

  constructor(addess: AddressEntity) {
    this.id = addess.id;
    this.complement = addess.complement;
    this.numberAddress = addess.numberAddress;
    this.cep = addess.cep;
    this.city = addess.city ? new ReturnCityDto(addess.city) : undefined;
  }
}
