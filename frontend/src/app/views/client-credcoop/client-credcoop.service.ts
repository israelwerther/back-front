import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientCredcoopService {
  private baseUrl = 'http://localhost:8080'; // Atualize com a URL do seu backend

  constructor(private http: HttpClient) { }

  createCredcoopClient(clientData: any, addressData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    console.log('token::: ', token);
    const clientUrl = `${this.baseUrl}/client-credcoop`;
    const addressUrl = `${this.baseUrl}/client-address`;

    return this.http.post(clientUrl, clientData, { headers }).pipe(
      switchMap((response: any) => {
        const clientId = response.id;
        return this.http.post(`${addressUrl}/${clientId}`, addressData, { headers });
      })
    );
  }
}
