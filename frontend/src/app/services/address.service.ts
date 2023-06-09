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

  createAddress(addressData: any, userId: number, token: string): Observable<any> {
    console.log('@@@@@@@@@@@@@@', token)
    const url = `${this.api_url}/address/${userId}`;
    console.log('${userId}90909090909090909', `${userId}`)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(url, addressData, { headers });
  }
}
