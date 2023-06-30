import { Component } from '@angular/core';
import { ClientCredcoopService } from '../client-credcoop.service';

@Component({
  selector: 'app-client-credcoop-create',
  templateUrl: './client-credcoop-create.component.html',
  styleUrls: ['./client-credcoop-create.component.css']
})
export class ClientCredcoopCreateComponent {
  clientName: string = '';

  constructor(private clientCredcoopService: ClientCredcoopService) { }

  onSubmit() {
    const formData = {
      clientName: this.clientName,
    };

    // const userId = Number(localStorage.getItem('id_storage'));
    const token = localStorage.getItem('token_storage');
    console.log('token::: ', token);

    if (token) {
      this.clientCredcoopService.createCredcoopClient(formData, token).subscribe(
        (response: any) => {
          console.log('Endereço criado com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao cadastrar o cliente:', error);
        }
      );
    } else {
      console.error('Usuário não autenticado');
    }
  }
}
