import { Component } from '@angular/core';
import { ClientCredcoopService } from '../client-credcoop.service';
import { ClientCredcoop } from 'src/app/interfaces/ClientCredcoop';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-credcoop-create',
  templateUrl: './client-credcoop-create.component.html',
  styleUrls: ['./client-credcoop-create.component.css']
})
export class ClientCredcoopCreateComponent {
  profileForm = this.fb.group({
    clientName: ['', Validators.required],
    cpf: [''],
    addresses: this.fb.array([
      this.fb.group({
        zipCode: [''],
        street: [''],
        neighborhood: [''],
        state: [''],
        city: [''],
        buildingNumber: [''],
        referencePoint: [''],
        complement: ['']
      })
    ])
  });

  get addresses() {
    return this.profileForm.get('addresses') as FormArray;
  }

  constructor(private clientCredcoopService: ClientCredcoopService, private fb: FormBuilder) { }

  addAddress() {
    this.addresses.push(this.fb.group({
      zipCode: [''],
      street: [''],
      neighborhood: [''],
      state: [''],
      city: [''],
      buildingNumber: [''],
      referencePoint: [''],
      complement: ['']
    }));
  }

  onSubmit() {
    const clientData: ClientCredcoop = {
      clientName: this.profileForm.value.clientName,
      cpf: this.profileForm.value.cpf,
      clientAddresses: this.profileForm.value.addresses || []
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
