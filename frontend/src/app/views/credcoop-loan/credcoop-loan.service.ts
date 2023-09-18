import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredcoopLoanService {
  private apiUrl = 'http://localhost:8080/loan';

  constructor(private http: HttpClient, private apollo: Apollo) { }

  createCredcoopLoan(loanData: any): Observable<any> {
    const token = localStorage.getItem('token_storage');
    if (!token) {
      throw new Error('Token not available');
    }    
    const headers = new HttpHeaders().set('Authorization', token);

    const url = this.apiUrl;
    return this.http.post(url, loanData, { headers });
  }  

  updateCredcoopLoan(loanId: string, loanData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    const loanUrl = `${this.apiUrl}/${loanId}`;
    return this.http.patch(loanUrl, loanData, { headers })
  }

  getQueryCredcoopLoan(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: gql`
        query {
          getTotalCredcoopLoans
        }
      `,
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  getCredcoopLoanById(loanId: string, token: string): Observable<any> {
    console.log('loanId::: ', loanId);
    const headers = new HttpHeaders().set('Authorization', token);
    const LoanUrl = `${this.apiUrl}/${loanId}`;
    return this.http.get(LoanUrl, { headers });
  }

  installmentDates: Date[] = [];
  getInstallments(startDate: string, amountOfInstallments: number): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: gql`
      query Query($startDate: String!, $amountOfInstallments: Float!) {
        getInstallmentDates(
          startDate: $startDate, 
          amountOfInstallments: $amountOfInstallments
        )
      }
      `,
      variables: {
        startDate,
        amountOfInstallments,
      },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }
  
}
