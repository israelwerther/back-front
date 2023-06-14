import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card-x',
  templateUrl: './card-x.component.html',
  styleUrls: ['./card-x.component.css']
})
export class CardXComponent implements OnInit {
  @Input()
  subject?: Subject<any>;

  points = 0;

  ngOnInit(): void {
    this.subject?.subscribe(value => { this.points = value * 2; });
  }
}
