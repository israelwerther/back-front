import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { EsctopCrudComponent } from './views/esctop-crud/esctop-crud.component';
import { StatesCitiesComponent } from './views/states-cities/states-cities.component';
import { AddressComponent } from './views/address/address.component';
import { UserComponent } from './views/user/user.component';
import { AuthComponent } from './views/auth/auth.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'esctop',
    component: EsctopCrudComponent,
    canActivate: [authGuard],
  },
  {
    path: 'states',
    component: StatesCitiesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard],
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
