import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface LoginDto {
  email: string;
  password: string;
}

interface ReturnLogin {
  accessToken: string;
  user: any; // Substitua 'any' pelo tipo correto do usuário retornado pelo backend
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token_storage');
    const userId = localStorage.getItem('id_storage');
    this._isLoggedIn$.next(!!token);
  }

  getToken(): string | null {
    return localStorage.getItem('token_storage') ?? null;
  }

  login(email: string, password: string) {
    const loginData: LoginDto = {
      email: email,
      password: password,
    };

    return this.http
      .post<ReturnLogin>('http://localhost:8080/auth/', loginData)
      .pipe(
        tap((response: ReturnLogin) => {
          this._isLoggedIn$.next(true);
          localStorage.setItem('token_storage', response.accessToken);
          console.log('response.accessToken::: ', response.accessToken);
          localStorage.setItem('id_storage', response.user.id);
        })
      );
  }

  logout(): void {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('token_storage');
  }

  isLoggedIn(): boolean {
    console.log('::: ', this._isLoggedIn$.getValue());
    return this._isLoggedIn$.getValue();
  }
}
