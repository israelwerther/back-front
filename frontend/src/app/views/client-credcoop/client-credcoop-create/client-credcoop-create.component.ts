import { Component } from '@angular/core';
import { ClientCredcoopService } from '../client-credcoop.service';
import { ClientAddress } from 'src/app/interfaces/ClientAddress';
import { ClientCredcoop } from 'src/app/interfaces/ClientCredcoop';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-credcoop-create',
  templateUrl: './client-credcoop-create.component.html',
  styleUrls: ['./client-credcoop-create.component.css']
})
export class ClientCredcoopCreateComponent {
  clientForm: FormGroup;

  constructor(private clientCredcoopService: ClientCredcoopService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required],
      cpf: ['', Validators.required],
      addresses: this.fb.array([
        this.createAddressFormGroup()
      ])
    });
  }

  createAddressFormGroup(): FormGroup {
    return this.fb.group({
      zipCode: [''],
      street: [''],
      neighborhood: [''],
      state: [''],
      city: [''],
      buildingNumber: [''],
      referencePoint: [''],
      complement: ['']
    });
  }

  get addresses() {
    return this.clientForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.createAddressFormGroup());
  }

  onSubmit() {

    const clientData: ClientCredcoop = {
      clientName: this.clientForm.value.clientName,
      cpf: this.clientForm.value.cpf,
      clientAddresses: this.clientForm.value.addresses
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
