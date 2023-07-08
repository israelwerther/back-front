import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { EsctopCrudComponent } from './views/esctop-crud/esctop-crud.component';
import { StatesCitiesComponent } from './views/states-cities/states-cities.component';
import { AddressComponent } from './views/address/address.component';
import { UserComponent } from './views/user/user.component';
import { AuthComponent } from './views/auth/auth.component';
import { AddressListComponent } from './views/address-list/address-list.component';
import { LoanDashboardComponent } from './views/loan/loan-dashboard/loan-dashboard.component';
import { LoanCreateComponent } from './views/loan/loan-create/loan-create.component';
import { LoanListComponent } from './views/loan/loan-list/loan-list.component';
import { ClientCredcoopComponent } from './views/client-credcoop/client-credcoop.component';
import { ClientCredcoopCreateComponent } from './views/client-credcoop/client-credcoop-create/client-credcoop-create.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'credcoop',
    component: ClientCredcoopComponent,
  },
  {
    path: 'cadastrar-cliente-credcoop',
    component: ClientCredcoopCreateComponent,
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
  {
    path: 'emprestimo-cadastro',
    component: LoanCreateComponent,
  },
  {
    path: 'emprestimo-lista',
    component: LoanListComponent,
  },
  {
    path: 'emprestimo-dashboard',
    component: LoanDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
