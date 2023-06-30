import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientCredcoopService {
  private api_url = 'http://localhost:8080/client-credcoop';

  constructor(private http: HttpClient) { }

  createCredcoopClient(credcoopData: any, token_storage: string): Observable<any> {
    const token = localStorage.getItem('token_storage');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const url = `${this.api_url}`;
    return this.http.post(url, credcoopData, { headers });
  }
}
