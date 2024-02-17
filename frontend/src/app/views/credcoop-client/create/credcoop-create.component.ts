import { Component, OnInit } from '@angular/core';
import { CredcoopClientService } from '../credcoop.service';
import { CredcoopClient } from 'src/app/interfaces/CredcoopClient';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credcoop-client-create',
  templateUrl: './credcoop-create.component.html',
  styleUrls: ['./credcoop-create.component.css'],
})
export class CredcoopClientCreateComponent {
  constructor(
    private credcoopClientService: CredcoopClientService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  profileForm = this.fb.group({
    clientName: ['', Validators.required],
    cpf: ['', Validators.required],
    idCard: ['', Validators.required],
    addresses: this.fb.array([
      this.fb.group({
        zipCode: ['', Validators.required],
        street: [''],
        neighborhood: [''],
        state: [''],
        city: [''],
        buildingNumber: [''],
        referencePoint: [''],
        complement: [''],
      }),
    ]),
  });

  fieldLabels: { [key: string]: string } = {
    clientName: 'Nome completo',
    cpf: 'CPF',
    idCard: 'RG',
    zipCode: 'CEP',
    street: 'Rua',
    neighborhood: 'Bairro',
    state: 'Estado',
    city: 'Cidade',
    buildingNumber: 'Nº',
    referencePoint: 'Ponto de referência',
    complement: 'Complemento',
  };

  get addresses() {
    return this.profileForm.get('addresses') as FormArray;
  }

  addAddress() {
    const addressForm = this.fb.group({
      zipCode: ['', Validators.required],
      street: [''],
      buildingNumber: [''],
      neighborhood: [''],
      city: [''],
      state: [''],
      complement: [''],
      referencePoint: [''],
    });

    this.addresses.push(addressForm);
  }

  deleteAddress(index: number) {
    this.addresses.removeAt(index);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const clientData: CredcoopClient = {
        clientName: this.profileForm.value.clientName,
        cpf: this.profileForm.value.cpf,
        idCard: this.profileForm.value.idCard,
        clientAddresses: this.profileForm.value.addresses || [],
      };

      const token = localStorage.getItem('token_storage');

      if (token) {
        this.credcoopClientService.createCredcoopClient(clientData, token).subscribe({
            next: () => {
              this.router.navigate(['credcoop-lista']);
            },
            error: (error) => {
              console.error('Erro ao cadastrar o cliente e endereço:', error);
            },
          });
      }
    } else {
      this.credcoopClientService.markFormGroupTouched(this.profileForm);
      this.missingFields();
    }
  }
 

  missingFields() {
    const missingFields: string[] = [];
    Object.keys(this.profileForm.controls).forEach((controlName) => {
      const control = this.profileForm.get(controlName);
      if (control?.invalid) {
        missingFields.push(this.fieldLabels[controlName]);
      }
    });

    const message = `Os seguintes campos são obrigatórios:\n\n${missingFields.join( '\n' )}`;
    alert(message);
  }

  // Acitive tabs
  activeTab: string = 'v-pills-1';
  activateTab(tabId: string) {
    this.activeTab = tabId;
    const tabButton = document.getElementById(tabId + '-tab') as HTMLElement;
    tabButton.click();
  }

  isActiveTab(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}
