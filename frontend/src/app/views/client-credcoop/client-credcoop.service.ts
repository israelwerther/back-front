import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientCredcoopService {
  private apiUrl = 'http://localhost:8080/client-credcoop';

  constructor(private http: HttpClient) { }

  createCredcoopClient(clientData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    const clientUrl = this.apiUrl;
    return this.http.post(clientUrl, clientData, { headers })
  }
}
