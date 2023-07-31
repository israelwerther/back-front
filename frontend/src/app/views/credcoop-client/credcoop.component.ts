import { Component, OnInit } from '@angular/core';
import { CredcoopClientService } from './credcoop.service';

@Component({
  selector: 'app-credcoop-client',
  templateUrl: './credcoop.component.html',
  styleUrls: ['./credcoop.component.css'],
})
export class CredcoopClientComponent{
  clients: any[]=[];

  ngOnInit() {
    this.loadQueryCredcoop();
  }
  
  constructor(   
    private credcoopClientService: CredcoopClientService
  ) {}


  loadQueryCredcoop() {
    this.credcoopClientService.getQueryCredcoop().subscribe((result) => {
      this.clients = result.data.credcoopClientsCount;
      console.log("Agata", this.clients)
    });
  }

}
