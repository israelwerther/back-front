import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  selectedState: number = -1;
  selectedCity: any = null;
  cities: any[] = [];
  states: any[] = [];

  complement: string = '';
  numberAddress: number | null = null;
  cep: string = '';

  constructor(
    private cityService: CityService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getStates();
  }

  getStates() {
    this.cityService.getStates().subscribe(
      (result: any[]) => {
        console.log('Entrou getStates', result)
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

  onSubmit() {
    const formData = {
      complement: this.complement,
      numberAddress: this.numberAddress,
      cep: this.cep,
      cityId: this.selectedCity,
    };

    const userId = this.authService.getUserId() ?? 0;

    const accessToken = this.authService.getAccessToken();
    console.log('accessToken 1', accessToken)
    if (accessToken) {
      const headers = new HttpHeaders().set('Authorization', accessToken);
      this.cityService.createAddress(formData, userId, accessToken).subscribe(
        (response: any) => {
          console.log('Endereço criado com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao criar o endereço:', error);
        }
      );
    } else {
      console.error('Usuário não autenticado');
      // Lógica adicional, se necessário
    }
  }
}
