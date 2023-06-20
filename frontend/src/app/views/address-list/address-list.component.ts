import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
})
export class AddressListComponent implements OnInit {
  public getJsonValue: any;
  public postJsonValue: any;

  selectedState: number = -1;
  selectedCity: any = null;
  cities: any[] = [];
  states: any[] = [];
  complement: string = '';
  numberAddress: number | null = null;
  cep: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.getMethod();
    this.getStates();
  }

  public getMethod() {
    const userId = Number(localStorage.getItem('id_storage'));
    this.http.get('http://localhost:8080/user/' + userId).subscribe((data) => {
      this.getJsonValue = data;
    });
  }

  getStates() {
    this.cityService.getStates().subscribe(
      (result: any[]) => {
        this.states = result;
      },
      (error) => {
        console.error('Erro ao obter os estados:', error);
      }
    );
  }

  onStateChange() {
    if (this.selectedState) {
      this.cityService.getCitiesByState(this.selectedState).subscribe(
        (result: any[]) => {
          this.cities = result;
        },
        (error) => {
          console.error('Erro ao obter as cidades:', error);
        }
      );
    } else {
      this.cities = [];
    }
  }

  createAddress() {
    const formData = {
      complement: this.complement,
      numberAddress: this.numberAddress,
      cep: this.cep,
      cityId: this.selectedCity,
    };

    const userId = Number(localStorage.getItem('id_storage'));
    const token = localStorage.getItem('token_storage');

    if (token) {
      this.cityService.createAddress(formData, userId, token).subscribe({
        next: () => {
          this.getMethod();
        },
        error: (error) => {
          console.error('Erro ao obter as cidades:', error);
        },
      });
    } else {
      console.error('Usuário não autenticado');
    }
  }

  onDeleteAddress(addressId: number): void {
    const token = this.authService.getToken();
    const userId = Number(localStorage.getItem('id_storage'));

    if (token !== null) {
      const headers = new HttpHeaders().set('Authorization', token);
      this.http.delete(`http://localhost:8080/address/${userId}/${addressId}`, { headers }).subscribe({
        next: () => {
          this.getMethod();
        },
        error: (error) => {
          console.error('Erro ao obter as cidades:', error);
        },
      });
    } else {
      console.error('Token is null');
    }
  }

  public getUserAdresses() {
    this.http.get('http://localhost:8080');
  }
}
