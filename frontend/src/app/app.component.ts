import { Component } from '@angular/core';
import { PublicService } from './services/public.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  msg: any;
  sideNavStatus: boolean = true;

  constructor(private publicService: PublicService) { }
  ngOnInit(): void {
    this.showMessage();
  }

  showMessage() {
    this.publicService.getMessage().subscribe((data) => {
      this.msg = data;
      console.log('this.msg', this.msg);
    });
  }

  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }
}
