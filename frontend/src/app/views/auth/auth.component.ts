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
  email = "";
  password = "";

  loginErrorMessage: string = '';
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(() => {
      this.router.navigate(['home']);
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

}

