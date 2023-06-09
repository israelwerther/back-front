import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface CreateUserDto {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  cpf: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  createUser(): void {
    const user: CreateUserDto = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      cpf: this.cpf,
      password: this.password,
    };

    this.http.post('http://localhost:8080/user', user).subscribe(
      () => {
        console.log('Usuário criado com sucesso!');
        // Faça o que desejar após a criação do usuário
      },
      (error) => {
        console.error('Erro ao criar usuário:', error);
        // Lide com o erro de criação de usuário
      }
    );
  }
}
