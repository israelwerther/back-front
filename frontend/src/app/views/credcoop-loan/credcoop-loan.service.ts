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

  createCredcoopLoan(LoanData: any): Observable<any> {
    const token = localStorage.getItem('token_storage');
    if (!token) {
      throw new Error('Token not available');
    }    
    const headers = new HttpHeaders().set('Authorization', token);

    const url = this.apiUrl;
    return this.http.post(url, LoanData, { headers });
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
  
}
