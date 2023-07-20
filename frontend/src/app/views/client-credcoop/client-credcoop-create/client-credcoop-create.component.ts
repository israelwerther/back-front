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
  constructor(private clientCredcoopService: ClientCredcoopService, private fb: FormBuilder) { }

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

  deleteAddress(index: number) {
    this.addresses.removeAt(index);
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

  activeButtonOne() {
    const tabButtonOne = document.getElementById('v-pills-1-tab') as HTMLButtonElement;
    tabButtonOne.click();
  }

  activeButtonTwo() {
    const tabButtonTwo = document.getElementById('v-pills-2-tab') as HTMLButtonElement;
    tabButtonTwo.click();
  }

  activeButtonThree() {
    const tabButtonThree = document.getElementById('v-pills-3-tab') as HTMLButtonElement;
    tabButtonThree.click();
  }

  activeButtonFour() {
    const tabButtonFour = document.getElementById('v-pills-4-tab') as HTMLButtonElement;
    tabButtonFour.click();
  }

}
