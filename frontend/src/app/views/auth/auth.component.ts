import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

interface LoginDto {
  email: string;
  password: string;
}

interface ReturnLogin {
  user: any; // Substitua 'any' pelo tipo correto do usuário retornado pela API
  accessToken: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginData: LoginDto = { email: 'auth@gmail.com', password: '123456' };

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log('headers', headers)
    this.http
      .post<ReturnLogin>('http://localhost:8080/auth/', this.loginData, {
        headers,
      })
      .subscribe(
        (response) => {
          const { user, accessToken } = response;
          console.log('user = ', user)
          // console.log('accessToken', accessToken)
          this.authService.setAccessToken(accessToken);

          localStorage.setItem('accessToken', accessToken);

          // this.authService.setUserId(user.id);
          // this.authService.getUserId();
          if (user.id !== null) {
            this.authService.setUserId(user.id);
          }
          console.log('Login realizado com sucesso!');
          // this.actionAfterLogin(user, accessToken);
        },
        (error) => {
          console.error('Erro ao fazer login:', error);
        }
      );
  }
  // private actionAfterLogin(user: any, accessToken: string): void {
  //   // Faça o que desejar após o login bem-sucedido
  // }
}
