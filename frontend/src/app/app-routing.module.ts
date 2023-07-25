import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { StatesCitiesComponent } from './views/states-cities/states-cities.component';
import { AddressComponent } from './views/address/address.component';
import { UserComponent } from './views/user/user.component';
import { AuthComponent } from './views/auth/auth.component';
import { AddressListComponent } from './views/address-list/address-list.component';
import { LoanDashboardComponent } from './views/loan/loan-dashboard/loan-dashboard.component';
import { LoanCreateComponent } from './views/loan/loan-create/loan-create.component';
import { LoanListComponent } from './views/loan/loan-list/loan-list.component';
import { ClientCredcoopComponent } from './views/credcoop-client/credcoop.component';
import { ClientCredcoopCreateComponent } from './views/credcoop-client/credcoop-create/credcoop-create.component';
import { ClientCredcoopListComponent } from './views/credcoop-client/credcoop-list/credcoop-list.component';
import { ClientCredcoopUpdateComponent } from './views/credcoop-client/credcoop-update/credcoop-update.component';


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
    path: 'credcoop-lista',
    component: ClientCredcoopListComponent,
  },
  {
    path: 'credcoop-atualiza/:id',
    component: ClientCredcoopUpdateComponent,
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
