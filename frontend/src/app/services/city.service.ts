import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private api_url = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getCitiesByState(stateId: number): Observable<any> {
    const url = `${this.api_url}/city/${stateId}`;
    console.log('111111111111111111111', this.http.get<any>(url));
    return this.http.get<any>(url);
  }

  getStates(): Observable<any[]> {
    const url = `${this.api_url}/state`;
    console.log('22222222222222222222', this.http.get<any[]>(url));
    return this.http.get<any[]>(url);
  }
}
