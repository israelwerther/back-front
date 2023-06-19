import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
})
export class AddressListComponent implements OnInit {
  public getJsonValue: any;
  public postJsonValue: any;
  constructor(private http: HttpClient, private authService: AuthService) {}
  private api_url = 'http://localhost:8080';

  ngOnInit(): void {
    this.getMethod();
  }

  public getMethod() {
    const userId = Number(localStorage.getItem('id_storage'));

    this.http.get('http://localhost:8080/user/' + userId).subscribe((data) => {
      this.getJsonValue = data;
    });
  }

  onDeleteAddress(addressId: number): void {
    const token = this.authService.getToken();
    const userId = Number(localStorage.getItem('id_storage'));
    if (token !== null) {
      const headers = new HttpHeaders().set('Authorization', token);
      this.http
        .delete(`http://localhost:8080/address/${userId}/${addressId}`, {
          headers,
        })
        .toPromise()
        .then(() => {
          // Atualize a lista de endereços após a exclusão
          this.getMethod();
        })
        .catch((error) => {
          // Trate os erros da exclusão, se necessário
          console.error('Erro ao excluir o endereço:', error);
        });
    } else {
      // Tratar o caso em que o token é nulo
      console.error('Token is null');
    }
  }

  public getUserAdresses() {
    this.http.get('http://localhost:8080');
  }
}
