import { Component } from '@angular/core';
import { ClientCredcoopService } from '../credcoop.service';
import { PaginationInstance } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credcoop-client-list',
  templateUrl: './credcoop-list.component.html',
  styleUrls: ['./credcoop-list.component.css']
})
export class ClientCredcoopListComponent {
  clients: any[] = [];
  pages: number[] = [];
  totalPages: number = 0;
  totalItems = 0;
  totalItemsInDatabase = 0;
  searchName: string = '';

  config: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  constructor(
    public clientCredcoopService: ClientCredcoopService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token_storage');

    if (token) {
      this.clientCredcoopService.getCredcoopClients(token).subscribe({
        next: (response) => {
          this.clients = response.items;
          this.totalItems = response.meta.totalItems;
          this.totalItemsInDatabase = response.meta.totalItemsInDatabase;
          this.updateTotalPages(this.totalItems);
        },
        error: (error) => {
          console.error('Erro ao obter os clientes:', error);
        }
      });
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.config.currentPage = page;
      const token = localStorage.getItem('token_storage');

      if (token) {
        this.clientCredcoopService.currentPage = page;
        this.clientCredcoopService.getCredcoopClients(token).subscribe(
          response => {
            this.clients = response.items;
          },
          error => {
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

  deleteClient(id: number): void {
    const token = localStorage.getItem('token_storage');
    if (token) {
      this.clientCredcoopService.deleteClientCredcoop(id, token).subscribe({
        next: () => {
          console.log('Cliente excluído com sucesso');
          this.clientCredcoopService.getCredcoopClients(token).subscribe({
            next: (response) => {
              this.clients = response.items;
            }
          });
        },
        error: (error) => {
          console.error('Erro ao excluir o cliente:', error);
        }
      });
    }
  }

  searchClients() {
    const token = localStorage.getItem('token_storage');

    if (token) {
      this.clientCredcoopService.getCredcoopClients(token, this.searchName).subscribe({
        next: (response) => {
          this.clients = response.items;
          this.totalItems = response.meta.totalItems;
          this.updateTotalPages(this.totalItems);
        },
        error: (error) => {
          console.error('Erro ao obter os clientes:', error);
        }
      });
    }
  }

  editClient(id: string) {
    this.router.navigate([`/credcoop-atualiza/${id}`]);
  }

}
