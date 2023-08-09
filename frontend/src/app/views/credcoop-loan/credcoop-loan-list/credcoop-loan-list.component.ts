import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-credcoop-loan-list',
  templateUrl: './credcoop-loan-list.component.html',
  styleUrls: ['./credcoop-loan-list.component.css'],
})
export class CredcoopLoanListComponent {
  private apiUrl = 'http://localhost:8080/loan';
  loans: any[] = [];
  pages: number[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages: number = 0;
  searchContractNumber = "";

  config: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCredcoopLoans();
  }  

  loadCredcoopLoans() {
    const token = localStorage.getItem('token_storage');    
    if (token) {
      this.getCredcoopLoans(token).subscribe({
        next: (response) => {
          this.loans = response.items;
          this.totalItems = response.meta.totalItems;
          this.updateTotalPages(this.totalItems);
        },
        error: (error) => {
          console.error('Erro ao obter os clientes:', error);
        },
      });
    }
  }

  getCredcoopLoans(token: string, contractNumber?: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);

    let apiUrl = `${this.apiUrl}?page=${this.currentPage}&limit=${this.itemsPerPage}`;
    if (contractNumber) {
      apiUrl += `&contractNumber=${contractNumber}`;
    }

    return this.http.get<any>(apiUrl, { headers });
  }

  searchLoans() {
    const token = localStorage.getItem('token_storage');

    if (token) {
      this.getCredcoopLoans(token, this.searchContractNumber).subscribe({
          next: (response) => {
            this.loans = response.items;
            this.totalItems = response.meta.totalItems;
            this.updateTotalPages(this.totalItems);
          },
          error: (error) => {
            console.error('Erro ao obter os clientes:', error);
          },
        });
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.config.currentPage = page;
      const token = localStorage.getItem('token_storage');

      if (token) {
        this.currentPage = page;
        this.getCredcoopLoans(token).subscribe(
          (response) => {
            this.loans = response.items;
          },
          (error) => {
            console.error('Erro ao obter os clientes:', error);
          }
        );
      }
    }
  }

  updatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Quantidade de itens toais
  updateTotalPages(totalItems: number) {
    this.totalPages = Math.ceil(totalItems / this.config.itemsPerPage);
    this.updatePages();
  }
  

}
