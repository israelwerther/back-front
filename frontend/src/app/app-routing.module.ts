import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { StatesCitiesComponent } from './views/states-cities/states-cities.component';
import { AddressComponent } from './views/address/address.component';
import { UserComponent } from './views/user/user.component';
import { AuthComponent } from './views/auth/auth.component';
import { AddressListComponent } from './views/address-list/address-list.component';
import { CredcoopClientComponent } from './views/credcoop-client/credcoop.component';
import { CredcoopClientCreateComponent } from './views/credcoop-client/credcoop-create/credcoop-create.component';
import { CredcoopClientListComponent } from './views/credcoop-client/credcoop-list/credcoop-list.component';
import { CredcoopClientUpdateComponent } from './views/credcoop-client/credcoop-update/credcoop-update.component';
import { CredcoopLoanCreateComponent } from './views/credcoop-loan/credcoop-loan-create/credcoop-loan-create.component';
import { CredcoopDetailComponent } from './views/credcoop-client/credcoop-detail/credcoop-detail.component';
import { CredcoopLoanListComponent } from './views/credcoop-loan/credcoop-loan-list/credcoop-loan-list.component';
import { CredcoopLoanComponent } from './views/credcoop-loan/credcoop-loan.component';
import { CredcoopLoanUpdateComponent } from './views/credcoop-loan/credcoop-loan-update/credcoop-loan-update.component';
import { RateComponent } from './views/rate/rate.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  // Credcoop
  {
    path: 'credcoop',
    component: CredcoopClientComponent,
  },
  {
    path: 'cadastrar-cliente-credcoop',
    component: CredcoopClientCreateComponent,
  },
  {
    path: 'credcoop-lista',
    component: CredcoopClientListComponent,
  },
  {
    path: 'credcoop-atualiza/:id',
    component: CredcoopClientUpdateComponent,
  },
  {
    path: 'credcoop-atualiza-emprestimo/:id',
    component: CredcoopLoanUpdateComponent,
  },
  {
    path: 'credcoop-detalhes/:id',
    component: CredcoopDetailComponent,
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
    path: 'dashboard-emprestimo-credcoop',
    component: CredcoopLoanComponent,
  },
  {
    path: 'cadastrar-emprestimo-credcoop',
    component: CredcoopLoanCreateComponent,
  },
  {
    path: 'emprestimos-credcoop-lista',
    component: CredcoopLoanListComponent,
  },
  // Rates
  {
    path: 'alterar-taxas',
    component: RateComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
