import { Component, HostListener, OnInit } from '@angular/core';
import { CredcoopClient } from 'src/app/interfaces/CredcoopClient';
import { CredcoopClientService } from '../credcoop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientAddress } from 'src/app/interfaces/ClientAddress';

@Component({
  selector: 'app-credcoop-detail',
  templateUrl: './credcoop-detail.component.html',
  styleUrls: ['./credcoop-detail.component.css'],
})
export class CredcoopDetailComponent implements OnInit {
  clientData!: CredcoopClient;
  clientId: string = '';
  addresses!: ClientAddress[];
  isPrinting: boolean = false;

  constructor(
    private credcoopClientService: CredcoopClientService,
    private route: ActivatedRoute,
    private router: Router
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
      this.credcoopClientService.getClientById(id, token).subscribe(
        (clientData) => {
          this.clientData = clientData;
          this.addresses = clientData.clientAddresses;
        },
        (error) => {
          console.error('Erro ao obter os dados do cliente:', error);
        }
      );
    }
  }

  @HostListener('window:beforeprint')
  onBeforePrint() {
    this.isPrinting = true;
  }

  @HostListener('window:afterprint')
  onAfterPrint() {
    this.isPrinting = false;
  }  
}
