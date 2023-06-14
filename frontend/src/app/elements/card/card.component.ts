import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  @Input()
  subject!: Subject<any>;
  points = 0;

  @Input()
  text1 = "";

  @Input()
  text2 = "";

  add() {
    this.points++;
    this.subject.next(this.points);
  }

}
