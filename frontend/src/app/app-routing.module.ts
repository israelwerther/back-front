import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { StatesCitiesComponent } from './views/states-cities/states-cities.component';
import { AddressComponent } from './views/address/address.component';
import { UserComponent } from './views/user/user.component';
import { AuthComponent } from './views/auth/auth.component';
import { AddressListComponent } from './views/address-list/address-list.component';
import { ClientCredcoopComponent } from './views/credcoop-client/credcoop.component';
import { ClientCredcoopCreateComponent } from './views/credcoop-client/credcoop-create/credcoop-create.component';
import { ClientCredcoopListComponent } from './views/credcoop-client/credcoop-list/credcoop-list.component';
import { ClientCredcoopUpdateComponent } from './views/credcoop-client/credcoop-update/credcoop-update.component';
import { CredcoopLoanComponent } from './views/credcoop-loan/credcoop-loan.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  // Credcoop
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
  // Loans 
  {
    path: 'emprestimo',
    component: CredcoopLoanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
