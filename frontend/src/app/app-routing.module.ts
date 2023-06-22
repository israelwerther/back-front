import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { EsctopCrudComponent } from './views/esctop-crud/esctop-crud.component';
import { StatesCitiesComponent } from './views/states-cities/states-cities.component';
import { AddressComponent } from './views/address/address.component';
import { UserComponent } from './views/user/user.component';
import { AuthComponent } from './views/auth/auth.component';
import { AddressListComponent } from './views/address-list/address-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'esctop',
    component: EsctopCrudComponent,
  },
  {
    path: 'states',
    component: StatesCitiesComponent,
  },
  {
    path: 'address',
    component: AddressComponent,
  },
  {
    path: 'address-list',
    component: AddressListComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
