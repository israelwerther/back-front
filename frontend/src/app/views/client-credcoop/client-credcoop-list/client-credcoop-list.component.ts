import { Component } from '@angular/core';
import { ClientCredcoopService } from '../client-credcoop.service';

@Component({
  selector: 'app-client-credcoop-list',
  templateUrl: './client-credcoop-list.component.html',
  styleUrls: ['./client-credcoop-list.component.css']
})
export class ClientCredcoopListComponent {
  clients?: any[];
  totalItems = 0;

  constructor(public clientCredcoopService: ClientCredcoopService) { }

  ngOnInit() {
    const token = localStorage.getItem('token_storage');

    if (token) {
      this.clientCredcoopService.getCredcoopClients(token).subscribe({
        next: (response) => {
          this.clients = response.items;
          this.totalItems = response.meta.totalItems;
          this.clientCredcoopService.updateTotalPages(this.totalItems);
        },
        error: (error) => {
          console.error('Erro ao obter os clientes:', error);
        }
      });
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.clientCredcoopService.totalPages) {
      this.clientCredcoopService.currentPage = page;
      const token = localStorage.getItem('token_storage');

      if (token) {
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

}
