import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientCredcoopService } from '../client-credcoop.service';
import { ClientCredcoop } from 'src/app/interfaces/ClientCredcoop';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-credcoop-create',
  templateUrl: './client-credcoop-create.component.html',
  styleUrls: ['./client-credcoop-create.component.css']
})
export class ClientCredcoopCreateComponent implements OnInit {
  constructor(
    private clientCredcoopService: ClientCredcoopService,
    private fb: FormBuilder,
    private router: Router,) { }
  @ViewChild('campo') campo!: ElementRef;
  ngOnInit(): void { }

  fieldLabels: { [key: string]: string } = {
    clientName: 'Nome completo',
    cpf: 'CPF',
    zipCode: 'CEP',
    street: 'Rua',
    neighborhood: 'Bairro',
    state: 'Estado',
    city: 'Cidade',
    buildingNumber: 'Nº',
    referencePoint: 'Ponto de referência',
    complement: 'Complemento'
  };

  profileForm = this.fb.group({
    clientName: ['', Validators.required],
    cpf: ['', Validators.required],
    addresses: this.fb.array([
      this.fb.group({
        zipCode: ['', Validators.required],
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

    this.addresses.push(addressForm)
  }

  deleteAddress(index: number) {
    this.addresses.removeAt(index);
  }

  onSubmit() {

    if (this.profileForm.valid) {
      console.log("O fomulário foi valido")
      const clientData: ClientCredcoop = {
        clientName: this.profileForm.value.clientName,
        cpf: this.profileForm.value.cpf,
        clientAddresses: this.profileForm.value.addresses || []
      };

      const token = localStorage.getItem('token_storage');

      if (token) {
        this.clientCredcoopService.createCredcoopClient(clientData, token).subscribe({
          next: () => {
            this.router.navigate(['credcoop-lista'])
          },
          error: (error) => {
            console.error('Erro ao cadastrar o cliente e endereço:', error);
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.profileForm);
      this.missingFields()
    }
  }

  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }

    });
  }

  missingFields() {
    const missingFields: string[] = [];
    Object.keys(this.profileForm.controls).forEach(controlName => {
      const control = this.profileForm.get(controlName);
      if (control?.invalid) {
        missingFields.push(this.fieldLabels[controlName]);
      }
    });

    const message = `Os seguintes campos são obrigatórios:\n\n${missingFields.join('\n')}`;
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
