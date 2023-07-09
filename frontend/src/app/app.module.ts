import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import { SidenavComponent } from './template/sidenav/sidenav.component';
import { HomeComponent } from './views/home/home.component';
import { EsctopCrudComponent } from './views/esctop-crud/esctop-crud.component';
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
import { ClientCredcoopComponent } from './views/client-credcoop/client-credcoop.component';
import { ClientEsctopComponent } from './views/client-esctop/client-esctop.component';
import { ClientCredcoopCreateComponent } from './views/client-credcoop/client-credcoop-create/client-credcoop-create.component';
import { ClientCredcoopListComponent } from './views/client-credcoop/client-credcoop-list/client-credcoop-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    EsctopCrudComponent,
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
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
