import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Rate } from 'src/app/interfaces/Rate';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})

export class RateComponent {
  private apiUrl = 'http://localhost:8080/rate';
  rateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apollo: Apollo,
    private toastr: ToastrService
  ) {
    this.rateForm = this.fb.group({
      fees: [0, Validators.required],
      dailyIOF: [0, Validators.required],
      extraIOF: [0, Validators.required],
      lateFee: [0, Validators.required],
    });
  }

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
        lateFee: this.rateForm.value.lateFee,
      }

      this.createRate(rateData).subscribe({
        next: () => {
          this.showSuccessToast();
        },
        error: (error) => {
          console.error('Erro ao atualizar taxas', error);
        },
      });
    } else {
      console.log("Formulário inválido");
      this.showErrorToast();
      this.markFormGroupTouched(this.rateForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Método para exibir o toastr de sucesso
  showSuccessToast() {
    this.toastr.success('Taxas atualizadas com sucesso', 'Sucesso');
  }

  // Método para exibir o toastr de erro
  showErrorToast() {
    this.toastr.error('Preencha corretamente todos os campos', 'Erro');
  }

  ngOnInit(): void {
    this.getLatestRate().subscribe(rate => {
      this.rateForm.patchValue(rate); // Preenche automaticamente os campos do formulário
    });
  }

  // Consulta GraphQL para obter as taxas mais recentes
  getLatestRate() {
    return this.apollo.watchQuery<any>({
      query: gql`
        query {
          getLatestRate {
            fees
            dailyIOF
            extraIOF
            lateFee
          }
        }
      `,
      fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map(({ data }) => data.getLatestRate)
    );
  }

}
