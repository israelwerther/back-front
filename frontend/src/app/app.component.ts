import { Component } from '@angular/core';
import { PublicService } from './services/public.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  msg: any;

  constructor(
    private publicService: PublicService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.showMessage();
    // Verifica se o usuário está autenticado
    const isLoggedIn = this.authService.isLoggedIn();

    // Se não estiver autenticado, redireciona para a tela de login
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  showMessage() {
    this.publicService.getMessage().subscribe((data) => {
      this.msg = data;
      console.log('this.msg', this.msg);
    });
  }

  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  navigateToAddressList() {
    this.router.navigate(['address-list']);
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
