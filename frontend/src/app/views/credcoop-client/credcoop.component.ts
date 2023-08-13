import { Component, OnInit } from '@angular/core';
import { CredcoopClientService } from './credcoop.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-credcoop-client',
  templateUrl: './credcoop.component.html',
  styleUrls: ['./credcoop.component.css'],
})
export class CredcoopClientComponent implements OnInit{
  totalCredcoopClients: number = 0;

  ngOnInit() {
    this.returnCredcoopClientCount();
  }

  constructor(private credcoopClientService: CredcoopClientService) {}

  returnCredcoopClientCount() {
    this.credcoopClientService.getQueryCredcoop().subscribe((result) => {
      this.totalCredcoopClients = result.data.credcoopClientsCount;
    });
  }
}
