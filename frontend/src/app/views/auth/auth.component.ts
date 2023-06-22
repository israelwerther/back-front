import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
      this.router.navigate(['']);
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

