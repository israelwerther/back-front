import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() sideNavStatus: boolean = false;

  list = [
    {
      number: '1',
      name: 'dashboard',
      icon: 'fa-solid fa-house',
      path:  "",
    },
    {
      number: '2',
      name: 'esctop',
      icon: 'fa-solid fa-house',
      path:  "/esctop",
    },
  ]
  
}
