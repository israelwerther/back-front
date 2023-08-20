import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-credcoop-loan-list',
  templateUrl: './credcoop-loan-list.component.html',
  styleUrls: ['./credcoop-loan-list.component.css'],
})
export class CredcoopLoanListComponent implements OnInit {
  private apiUrl = 'http://localhost:8080/loan/credcoop';
  loans: any[] = [];
  pages: number[] = [];
  totalItems = 0;
  totalPages: number = 0;
  searchQuery = '';

  config: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  constructor(private http: HttpClient, private router: Router) {}

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

  getCredcoopLoans(token: string, searchQuery?: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);

    let params = new HttpParams();
    if (searchQuery) {
      params = params.set('searchQuery', searchQuery);
    }

    let apiUrl = `${this.apiUrl}?page=${this.config.currentPage}&limit=${this.config.itemsPerPage}`;
    if (searchQuery) {
      apiUrl += `&searchQuery=${searchQuery}`;
    }

    return this.http.get<any>(apiUrl, { headers });
  }

  searchLoans() {
    const token = localStorage.getItem('token_storage');

    if (token) {
      this.getCredcoopLoans(token, this.searchQuery).subscribe({
        next: (response) => {
          this.loans = response.items;
          this.totalItems = response.meta.totalItems;
          this.updateTotalPages(this.totalItems);
        },
        error: (error) => {
          console.error('Erro ao obter os empréstimos:', error);
        },
      });
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.config.currentPage = page;
      const token = localStorage.getItem('token_storage');

      if (token) {
        this.config.currentPage = page;
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

  editLoan(id: string) {
    this.router.navigate([`/credcoop-atualiza-emprestimo/${id}`]);
  }
}
