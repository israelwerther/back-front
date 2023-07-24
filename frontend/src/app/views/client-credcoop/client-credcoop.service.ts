import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientCredcoopService {
  private apiUrl = 'http://localhost:8080/client-credcoop';
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private http: HttpClient) { }

  createCredcoopClient(clientData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    const clientUrl = this.apiUrl;
    return this.http.post(clientUrl, clientData, { headers })
  }

  getCredcoopClients(token: string, clientName?: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);

    let apiUrl = `${this.apiUrl}?page=${this.currentPage}&limit=${this.itemsPerPage}`;
    if (clientName) {
      apiUrl += `&clientName=${clientName}`;
    }

    return this.http.get<any>(apiUrl, { headers });
  }

  deleteClientCredcoop(id: number, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', token);
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  updateCredcoopClient(clientId: string, clientData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    const clientUrl = `${this.apiUrl}/${clientId}`;
    return this.http.patch(clientUrl, clientData, { headers })
  }

  getClientById(clientId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    const clientUrl = `${this.apiUrl}/${clientId}`;
    return this.http.get(clientUrl, { headers });
  }

  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
