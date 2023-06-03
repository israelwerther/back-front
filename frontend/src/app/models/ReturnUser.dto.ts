export class ReturnUserDto {
  name: string;
  phone: string;
  email: string;
  cpf: string;
  password: string;

  constructor(user: any) {
    this.name = user.name;
    this.phone = user.phone;
    this.email = user.email;
    this.cpf = user.cpf;
    this.password = user.password;
  }
}
