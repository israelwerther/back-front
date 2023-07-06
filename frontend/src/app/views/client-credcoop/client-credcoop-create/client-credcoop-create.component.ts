import { Component } from '@angular/core';
import { ClientCredcoopService } from '../client-credcoop.service';
import { ClientCredcoop } from 'src/app/interfaces/ClientCredcoop';

@Component({
  selector: 'app-client-credcoop-create',
  templateUrl: './client-credcoop-create.component.html',
  styleUrls: ['./client-credcoop-create.component.css']
})
export class ClientCredcoopCreateComponent {

  clientCredcoop: ClientCredcoop = {
    clientName: "",
    cpf: "",
  }


  // Client address
  zipCode: string = '';
  street: string = '';
  neighborhood: string = '';
  state: string = '';
  city: string = '';
  buildingNumber: string = '';
  referencePoint: string = '';
  complement: string = '';

  constructor(private clientCredcoopService: ClientCredcoopService) { }

  ngOnInit() {

  }

  onSubmit() {
    const addressData = {
      zipCode: this.zipCode,
      street: this.street,
      neighborhood: this.neighborhood,
      state: this.state,
      city: this.city,
      buildingNumber: this.buildingNumber,
      referencePoint: this.referencePoint,
      complement: this.complement
    };

    const formData = {
      clientName: this.clientName,
      cpf: this.cpf,
      address: addressData
    };

    const token = localStorage.getItem('token_storage');

    if (token) {
      this.clientCredcoopService.createCredcoopClient(formData, addressData, token).subscribe(
        (response: any) => {
          console.log('Cliente e endereço criados com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao cadastrar o cliente e endereço:', error);
        }
      );
    } else {
      console.error('Usuário não autenticado');
    }
  }
}
