import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginData = { email: '', password: '' };
  email = new FormControl('', [Validators.required, Validators.email]);

  loginErrorMessage: string = '';
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(() => {
      this.router.navigate(['']);
    },
      () => {
        this.loginErrorMessage = 'Dados inválidos.';
      });
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Digite um email válido';
    }

    return this.email.hasError('email') ? 'Não é um email válido' : '';
  }

}

