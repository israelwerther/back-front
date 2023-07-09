import { Component } from '@angular/core';
import { ClientCredcoopService } from '../client-credcoop.service';

@Component({
  selector: 'app-client-credcoop-list',
  templateUrl: './client-credcoop-list.component.html',
  styleUrls: ['./client-credcoop-list.component.css']
})
export class ClientCredcoopListComponent {
  clients?: any[];
  constructor(private clientCredcoopService: ClientCredcoopService) { }

  ngOnInit() {
    const token = localStorage.getItem('token_storage');

    if (token) {
      this.clientCredcoopService.getCredcoopClients(token).subscribe({
        next: (data) => {
          this.clients = data;
        },
        error: (error) => {
          console.error('Erro ao cadastrar o cliente e endereço:', error);
        }
      });
    }
  }
}
