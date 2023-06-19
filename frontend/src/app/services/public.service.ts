import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  api_url = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getUser() {
    const url = `${this.api_url}user/`;
    return this.http.get(url);
  }

  getAddresses() {
    const url = `${this.api_url}address/`;
    return this.http.get(url);
  }

  getMessage() {
    const url = this.api_url;
    return this.http.get(url);
  }
}
