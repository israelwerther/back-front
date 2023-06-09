import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReturnAddressDto } from '../models/ReturnAddress.dto';

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

  // createAddress(address: ReturnAddressDto) {
  //   return this.http.post(`${this.api_url}/address`, address);
  // }

  getMessage() {
    const url = this.api_url;
    return this.http.get(url);
  }
}
