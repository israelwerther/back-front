import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientCredcoop } from 'src/app/interfaces/ClientCredcoop';
import { ClientCredcoopService } from '../client-credcoop.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ClientAddress } from 'src/app/interfaces/ClientAddress';


@Component({
  selector: 'app-client-credcoop-update',
  templateUrl: './client-credcoop-update.component.html',
  styleUrls: ['./client-credcoop-update.component.css']
})
export class ClientCredcoopUpdateComponent implements OnInit {
  clientId: string="";

  profileForm = this.fb.group({
    clientName: ['', Validators.required],
    cpf: ['', Validators.required],
    idCard: ['', Validators.required],
    addresses: this.fb.array([])
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private clientCredcoopService: ClientCredcoopService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clientId = params['id'];
      this.getClientData(this.clientId);
    });
  }

  getClientData(id: string) {
    const token = localStorage.getItem('token_storage');
    if (token) {
      this.clientCredcoopService.getClientById(id, token).subscribe(
        (clientData) => {          
          this.profileForm.patchValue({
            clientName: clientData.clientName,
            cpf: clientData.cpf,
            idCard: clientData.idCard,
          });
          
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
    const clientData: ClientCredcoop = {
      clientName: this.profileForm.value.clientName,
      cpf: this.profileForm.value.cpf,
      idCard: this.profileForm.value.idCard,
      clientAddresses: this.profileForm.value.addresses as ClientAddress[]
    };

    const token = localStorage.getItem('token_storage');

    if (token) {
      this.clientCredcoopService.updateCredcoopClient(this.clientId, clientData, token).subscribe(
        () => {
          console.log('Cliente atualizado com sucesso');
        },
        (error) => {
          console.error('Erro ao atualizar o cliente:', error);
        }
      );
    }
  }

}
