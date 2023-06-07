import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/address.service';

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

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.getStates();
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

  onSubmit() {
    const formData = {
      complement: this.complement,
      numberAddress: this.numberAddress,
      cep: this.cep,
      cityId: this.selectedCity,
    };

    console.log(formData); // Exemplo: exibindo no console para fins de teste

    this.cityService.createAddress(formData).subscribe(
      (response: any) => {
        console.log('Endereço criado com sucesso:', response);
        // Lógica adicional, se necessário
      },
      (error) => {
        console.error('Erro ao criar o endereço:', error);
        // Lógica adicional, se necessário
      }
    );
  }
}
