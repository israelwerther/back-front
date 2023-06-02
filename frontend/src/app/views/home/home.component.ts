import { Component } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userList: any[] = [];

  constructor(private publicService: PublicService) {}

  ngOnInit(): void {
    this.getUserList();
  }
  getUserList(): void {
    this.publicService.getUser().subscribe(
      (data: Object) => {
        this.userList = data as any[];
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
