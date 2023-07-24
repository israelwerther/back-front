import { Component } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { ClientCredcoopService } from '../client-credcoop/client-credcoop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userList: any[] = [];
  totalClients!: number;

  constructor(private clientCredcoopService: ClientCredcoopService) { }

  ngOnInit(): void {
    
  }

  


}
