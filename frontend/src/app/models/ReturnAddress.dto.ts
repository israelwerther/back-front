export class ReturnAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city: any; // Você pode ajustar o tipo conforme necessário

  constructor(address: any) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city;
  }
}
