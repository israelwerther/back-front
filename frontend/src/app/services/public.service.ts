import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  baseUrl = 'http://localhost:8080/';
  statusSubject = new Subject<boolean>();
  status: boolean;


  constructor(private http: HttpClient) {
    this.status = false;
    this.statusSubject.subscribe((value) => {
      this.status = value;
    });
  }

  getUser() {
    const url = `${this.baseUrl}user/`;
    return this.http.get(url);
  }

  getAddresses() {
    const url = `${this.baseUrl}address/`;
    return this.http.get(url);
  }

  getMessage() {
    const url = this.baseUrl;
    return this.http.get(url);
  }


  toggleStatus() {
    this.statusSubject.next(!this.status);
  }


}
