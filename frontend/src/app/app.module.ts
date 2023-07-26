import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './template/sidenav/sidenav.component';
import { HomeComponent } from './views/home/home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatesCitiesComponent } from './views/states-cities/states-cities.component';
import { AddressComponent } from './views/address/address.component';
import { UserComponent } from './views/user/user.component';
import { AuthComponent } from './views/auth/auth.component';
import { AddressListComponent } from './views/address-list/address-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoanDashboardComponent } from './views/loan/loan-dashboard/loan-dashboard.component';
import { LoanCreateComponent } from './views/loan/loan-create/loan-create.component';
import { LoanListComponent } from './views/loan/loan-list/loan-list.component';
import { ClientCredcoopComponent } from './views/credcoop-client/credcoop.component';
import { ClientEsctopComponent } from './views/client-esctop/client-esctop.component';
import { ClientCredcoopCreateComponent } from './views/credcoop-client/credcoop-create/credcoop-create.component';
import { ClientCredcoopListComponent } from './views/credcoop-client/credcoop-list/credcoop-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientCredcoopUpdateComponent } from './views/credcoop-client/credcoop-update/credcoop-update.component';
import { CredcoopLoanComponent } from './views/credcoop-loan/credcoop-loan.component';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    StatesCitiesComponent,
    AddressComponent,
    UserComponent,
    AuthComponent,
    AddressListComponent,
    LoanDashboardComponent,
    LoanCreateComponent,
    LoanListComponent,
    ClientCredcoopComponent,
    ClientEsctopComponent,
    ClientCredcoopCreateComponent,
    ClientCredcoopListComponent,
    ClientCredcoopUpdateComponent,   
    CredcoopLoanComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
