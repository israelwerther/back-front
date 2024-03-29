import { Component, OnInit } from '@angular/core';
import { CredcoopClientService } from '../credcoop.service';
import { PaginationInstance } from 'ngx-pagination';
import { Router } from '@angular/router';
import { CredcoopClientUpdateComponent } from '../credcoop-update/credcoop-update.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-credcoop-client-list',
  templateUrl: './credcoop-list.component.html',
  styleUrls: ['./credcoop-list.component.css'],
  providers: [CredcoopClientUpdateComponent],
})
export class CredcoopClientListComponent implements OnInit {
  clients: any[] = [];
  pages: number[] = [];
  totalPages: number = 0;
  totalItems = 0;
  searchName: string = '';

  profileForm: FormGroup;

  config: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  constructor(
    public credcoopClientService: CredcoopClientService,
    public credcoopClientUpdateComponent: CredcoopClientUpdateComponent,
    private router: Router
  ) {
    this.profileForm = this.credcoopClientUpdateComponent.createProfileEditForm();
  }

  ngOnInit() {
    this.loadCredcoopClients();
  }  

  loadCredcoopClients() {
    const token = localStorage.getItem('token_storage');
    if (token) {
      this.credcoopClientService.getCredcoopClients(token).subscribe({
        next: (response) => {
          this.clients = response.items;
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
        this.credcoopClientService.currentPage = page;
        this.credcoopClientService.getCredcoopClients(token).subscribe(
          (response) => {
            this.clients = response.items;
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

  deleteClient(id: number): void {
    const token = localStorage.getItem('token_storage');
    if (token) {
      this.credcoopClientService.deleteCredcoopClient(id, token).subscribe({
        next: () => {
          console.log('Cliente excluído com sucesso');
          this.credcoopClientService.getCredcoopClients(token).subscribe({
            next: (response) => {
              this.clients = response.items;
            },
          });
          this.loadCredcoopClients();
        },
        error: (error) => {
          console.error('Erro ao excluir o cliente:', error);
        },
      });
    }
  }

  searchClients() {
    const token = localStorage.getItem('token_storage');

    if (token) {
      this.credcoopClientService
        .getCredcoopClients(token, this.searchName)
        .subscribe({
          next: (response) => {
            this.clients = response.items;
            this.totalItems = response.meta.totalItems;
            this.updateTotalPages(this.totalItems);
          },
          error: (error) => {
            console.error('Erro ao obter os clientes:', error);
          },
        });
    }
  }

  editClient(id: string) {
    this.router.navigate([`/credcoop-atualiza/${id}`]);
  }

  detailClient(id: string) {
    this.router.navigate([`/credcoop-detalhes/${id}`]);
  }  
}
