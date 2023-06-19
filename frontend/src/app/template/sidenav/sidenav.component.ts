import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  @Input() sideNavStatus: boolean = false;

  list = [
    {
      number: '1',
      name: 'dashboard',
      icon: 'fa-solid fa-house',
      path: '',
    },
    {
      number: '2',
      name: 'esctop',
      icon: 'fa-solid fa-house',
      path: '/esctop',
    },
    {
      number: '3',
      name: 'states',
      icon: 'fa-solid fa-house',
      path: '/states',
    },
    {
      number: '4',
      name: 'address',
      icon: 'fa-solid fa-house',
      path: '/address',
    },
    {
      number: '5',
      name: 'address-list',
      icon: 'fa-solid fa-list',
      path: '/address-list',
    },
    {
      number: '6',
      name: 'user',
      icon: 'fa-solid fa-house',
      path: '/user',
    },
    {
      number: '7',
      name: 'login',
      icon: 'fa-solid fa-house',
      path: '/login',
    },
  ];
}
