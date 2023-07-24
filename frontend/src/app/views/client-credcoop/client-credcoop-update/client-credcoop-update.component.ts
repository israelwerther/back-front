import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientCredcoop } from 'src/app/interfaces/ClientCredcoop';
import { ClientCredcoopService } from '../client-credcoop.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientAddress } from 'src/app/interfaces/ClientAddress';


@Component({
  selector: 'app-client-credcoop-update',
  templateUrl: './client-credcoop-update.component.html',
  styleUrls: ['./client-credcoop-update.component.css']
})
export class ClientCredcoopUpdateComponent implements OnInit {
  
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clientId = params['id'];
      this.getClientData(this.clientId);
    });
  }

  clientId: string="";

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private clientCredcoopService: ClientCredcoopService,
    private router: Router,
  ) {}
  
  profileForm = this.fb.group({
    clientName: ['', Validators.required],
    cpf: ['', Validators.required],
    idCard: ['', Validators.required],
    addresses: this.fb.array([])
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
    complement: 'Complemento'
  };

  getClientData(id: string) {
    const token = localStorage.getItem('token_storage');
    if (token) {
      this.clientCredcoopService.getClientById(id, token).subscribe(
        (clientData) => {
          // Preencha o form com os dados do cliente obtidos da API
          this.profileForm.patchValue({
            clientName: clientData.clientName,
            cpf: clientData.cpf,
            idCard: clientData.idCard,
          });

          // Preencha o array de endereços com os dados do cliente obtidos da API
          this.setAddresses(clientData.clientAddresses);
        },
        (error) => {
          console.error('Erro ao obter os dados do cliente:', error);
        }
      );
    }
  }
  

  setAddresses(addresses: ClientAddress[]) {
    const addressArray = this.profileForm.get('addresses') as FormArray;
    addresses.forEach((address) => {
      addressArray.push(
        this.fb.group({
          zipCode: [address.zipCode],
          street: [address.street],
          neighborhood: [address.neighborhood],
          state: [address.state],
          city: [address.city],
          buildingNumber: [address.buildingNumber],
          referencePoint: [address.referencePoint],
          complement: [address.complement]
        })
      );
    });
  }

  get addresses() {
    return this.profileForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(
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
    );
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
        idCard: this.profileForm.value.idCard,
        clientAddresses: this.profileForm.value.addresses as ClientAddress[] || []
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
