import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginData = { email: 'auth@gmail.com', password: '123456' };
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(() => {
      // this.router.navigate(['/address']);
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

