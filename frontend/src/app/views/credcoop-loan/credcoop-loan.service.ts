import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select2Client } from 'src/app/interfaces/select2Client';

@Injectable({
  providedIn: 'root'
})
export class CredcoopLoanService {
  private apiUrl = 'http://localhost:8080/loan';

  constructor(private http: HttpClient) { }

  createCredcoopLoan(LoanData: any): Observable<any> {    
    const token = localStorage.getItem('token_storage');
    if (!token) {
      throw new Error('Token not available');
    }    
    const headers = new HttpHeaders().set('Authorization', token);

    const url = this.apiUrl;
    return this.http.post(url, LoanData, { headers });
  }

  
  select2Client(): Observable<select2Client[]> {
    const token = localStorage.getItem('token_storage');
    if (!token) {
      throw new Error('Token not available');
    }    
    const headers = new HttpHeaders().set('Authorization', token);
    const url = 'http://localhost:8080/client-credcoop/select-client';
   
    return this.http.get<select2Client[]>(url, { headers });
  }
}
