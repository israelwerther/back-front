import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { CredcoopClientService } from '../credcoop-client/credcoop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userList: any[] = [];
  totalClients!: number;
  totalClientCredcoop: number = 0;

  constructor(private credcoopClientService: CredcoopClientService) { }

  ngOnInit(): void {
    
    const token = localStorage.getItem('token_storage');
    if (token) {
      this.credcoopClientService.getTotalCredcoopClient(token).subscribe({
        next:(response) => {
          this.totalClientCredcoop = response.totalClientCredcoop;
        },
        error: (error) => {
          console.error('Erro ao obter o total de clientes:', error);
        }
      });
    }

    // const token = localStorage.getItem('token_storage');
    // if (token) {
    //   this.credcoopClientService.getCredcoopClients(token).subscribe({
    //     next: (response) => {
    //       this.totalItemsInDatabase = response.meta.totalItemsInDatabase;
    //     }
    //   });
    // }
  }

  

}
