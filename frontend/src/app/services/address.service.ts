import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private api_url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getCitiesByState(stateId: number): Observable<any> {
    const url = `${this.api_url}/city/${stateId}`;
    return this.http.get<any>(url);
  }

  getStates(): Observable<any[]> {
    const url = `${this.api_url}/state`;
    return this.http.get<any[]>(url);
  }

  createAddress(addressData: any, id_storage: number, token_storage: string): Observable<any> {
    const token = localStorage.getItem('token_storage');
    console.log('token::: ', token);
    const url = `${this.api_url}/address/${id_storage}`;
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.post(url, addressData, { headers });
  }
}
