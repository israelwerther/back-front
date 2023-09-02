import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Rate } from 'src/app/interfaces/Rate';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent {
  private apiUrl = 'http://localhost:8080/rate';

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  rateForm = this.fb.group({
    fees: [1000],
    dailyIOF: [1000],
    extraIOF: [1000],
  });

  createRate(rateData: any): Observable<any> {
    const token = localStorage.getItem('token_storage');
    if (!token) {
      throw new Error('Token not available');
    }    
    const headers = new HttpHeaders().set('Authorization', token);

    const url = this.apiUrl;
    return this.http.post(url, rateData, { headers });
  }

  onSubmitRate() {
    if (this.rateForm.valid) {
      const rateData: Rate = {
        fees: this.rateForm.value.fees,
        dailyIOF: this.rateForm.value.dailyIOF,
        extraIOF: this.rateForm.value.extraIOF,
      }

      this.createRate(rateData).subscribe({
        next: () => {
          console.log("Taxas atualizadas com sucesso");
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.error('Erro ao atualizar taxas', error);
        },
      });
    } else {
      console.log("Formulário inválido");
      //this.missingFields();
    }
  }
}
