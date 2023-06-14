import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-esctop-crud',
  templateUrl: './esctop-crud.component.html',
  styleUrls: ['./esctop-crud.component.css']
})
export class EsctopCrudComponent {
  subject = new Subject<any>();
}
