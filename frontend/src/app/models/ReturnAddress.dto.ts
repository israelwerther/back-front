export class ReturnAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city: { id: number; name: string; state_id: number };

  constructor(address: any) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = {
      id: address.city.id,
      name: address.city.name,
      state_id: address.city.state.id,
    };
  }
}
