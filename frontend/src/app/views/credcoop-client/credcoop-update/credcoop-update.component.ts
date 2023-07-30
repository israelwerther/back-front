import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CredcoopClient } from 'src/app/interfaces/CredcoopClient';
import { CredcoopClientService } from '../credcoop.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientAddress } from 'src/app/interfaces/ClientAddress';

@Component({
  selector: 'app-credcoop-client-update',
  templateUrl: './credcoop-update.component.html',
  styleUrls: ['./credcoop-update.component.css'],
})
export class CredcoopClientUpdateComponent implements OnInit {
  clientId: string = '';
  profileForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private credcoopClientService: CredcoopClientService
  ) {
    this.profileForm = this.createProfileEditForm();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clientId = params['id'];
      this.getClientData(this.clientId);
    });
  }

  createProfileEditForm() {
    return this.fb.group({
      clientName: ['', Validators.required],
      cpf: ['', Validators.required],
      idCard: ['', Validators.required],
      addresses: this.fb.array([]),
    });
  }

  getClientData(id: string) {
    const token = localStorage.getItem('token_storage');
    if (token) {
      this.credcoopClientService.getClientById(id, token).subscribe(
        (clientData) => {
          this.createProfileEditForm().patchValue({
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
    const addressArray = this.createProfileEditForm().get(
      'addresses'
    ) as FormArray;
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
          complement: [address.complement],
        })
      );
    });
  }

  get addresses() {
    return this.createProfileEditForm().get('addresses') as FormArray;
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
    const clientData: CredcoopClient = {
      clientName: this.createProfileEditForm().value.clientName,
      cpf: this.createProfileEditForm().value.cpf,
      idCard: this.createProfileEditForm().value.idCard,
      clientAddresses: this.createProfileEditForm().value
        .addresses as ClientAddress[],
    };

    const token = localStorage.getItem('token_storage');

    if (token) {
      this.credcoopClientService
        .updateCredcoopClient(this.clientId, clientData, token)
        .subscribe(
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
