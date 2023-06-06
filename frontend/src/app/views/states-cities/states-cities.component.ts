import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-states-cities',
  templateUrl: './states-cities.component.html',
  styleUrls: ['./states-cities.component.css'],
})
export class StatesCitiesComponent implements OnInit {
  selectedState: number = -1;
  selectedCity: number | null = null;
  cities: any[] = []; // Alterado para tipo any[]
  states: any[] = []; // Alterado para tipo any[]

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.getStates();
  }

  getStates() {
    this.cityService
      .getStates()
      .pipe(
        catchError((error) => {
          console.error('Erro ao obter os estados:', error);
          // Retorna um Observable vazio ou lança um novo erro, conforme necessário
          return throwError(() => new Error(error));
        })
      )
      .subscribe((result: any[]) => {
        // Alterado para tipo any[]
        this.states = result;
      });
  }

  onSubmit() {
    this.cityService.getCitiesByState(this.selectedState).subscribe({
      next: (result: any[]) => {
        // Alterado para tipo any[]
        this.cities = result;
      },
      error: (error) => {
        console.error('Erro ao obter as cidades:', error);
      },
    });
  }
}
