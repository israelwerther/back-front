import { Component } from '@angular/core';
import { ClientCredcoopService } from '../client-credcoop.service';
import { ClientAddress } from 'src/app/interfaces/ClientAddress';
import { ClientCredcoop } from 'src/app/interfaces/ClientCredcoop';


@Component({
  selector: 'app-client-credcoop-create',
  templateUrl: './client-credcoop-create.component.html',
  styleUrls: ['./client-credcoop-create.component.css']
})
export class ClientCredcoopCreateComponent {
  clientName: string = '';
  cpf: string = '';
  zipCode: string = '';
  street: string = '';
  neighborhood: string = '';
  state: string = '';
  city: string = '';
  buildingNumber: string = '';
  referencePoint: string = '';
  complement: string = '';

  constructor(
    private clientCredcoopService: ClientCredcoopService
  ) { }

  onSubmit() {
    const addressData: ClientAddress = {
      zipCode: this.zipCode,
      street: this.street,
      neighborhood: this.neighborhood,
      state: this.state,
      city: this.city,
      buildingNumber: this.buildingNumber,
      referencePoint: this.referencePoint,
      complement: this.complement
    };

    const clientData: ClientCredcoop = {
      clientName: this.clientName,
      cpf: this.cpf,
      clientAddresses: [addressData]
    };

    const token = localStorage.getItem('token_storage');

    if (token) {
      this.clientCredcoopService.createCredcoopClient(clientData, token).subscribe({
        next: () => {
          console.log('Cliente e endereço criados com sucesso');
        },
        error: (error) => {
          console.error('Erro ao cadastrar o cliente e endereço:', error);
        }
      });
    }
  }
}
