import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { ClientCredcoopService } from '../client-credcoop/client-credcoop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userList: any[] = [];
  totalClients!: number;
  totalClientCredcoop: number = 0;

  constructor(private clientCredcoopService: ClientCredcoopService) { }

  ngOnInit(): void {
    
    const token = localStorage.getItem('token_storage');
    if (token) {
      this.clientCredcoopService.getTotalClientCredcoop(token).subscribe({
        next:(response) => {
          this.totalClientCredcoop = response.totalClientCredcoop;
        },
        error: (error) => {
          console.error('Erro ao obter o total do client-credcoop:', error);
        }
      });
    }

    // const token = localStorage.getItem('token_storage');
    // if (token) {
    //   this.clientCredcoopService.getCredcoopClients(token).subscribe({
    //     next: (response) => {
    //       this.totalItemsInDatabase = response.meta.totalItemsInDatabase;
    //     }
    //   });
    // }
  }

  

}
