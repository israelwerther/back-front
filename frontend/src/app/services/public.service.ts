import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReturnAddressDto } from '../models/ReturnAddress.dto';
import { ReturnUserDto } from '../models/ReturnUser.dto';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  api_url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getUser() {
    const url = `${this.api_url}user/`;
    return this.http.get(url);
  }

  createAddress(address: ReturnAddressDto) {
    const userId = 2;
    return this.http.post(`http://localhost:8080/address/${userId}`, address);
  }

  createUser(user: ReturnUserDto) {
    return this.http.post(this.api_url + 'user/', user);
  }

  getMessage() {
    const url = this.api_url;
    return this.http.get(url);
  }
}
