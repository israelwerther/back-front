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
import { ClientCredcoopComponent } from './views/credcoop-client/credcoop.component';
import { ClientCredcoopCreateComponent } from './views/credcoop-client/credcoop-create/credcoop-create.component';
import { ClientCredcoopListComponent } from './views/credcoop-client/credcoop-list/credcoop-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CredcoopClientUpdateComponent } from './views/credcoop-client/credcoop-update/credcoop-update.component';
import { CredcoopLoanComponent } from './views/credcoop-loan/credcoop-loan.component';
import { CredcoopLoanCreateComponent } from './views/credcoop-loan/credcoop-loan-create/credcoop-loan-create.component';
import { GraphQLModule } from './graphql.module';


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
    ClientCredcoopComponent,
    ClientCredcoopCreateComponent,
    ClientCredcoopListComponent,
    CredcoopClientUpdateComponent,   
    CredcoopLoanComponent,
    CredcoopLoanCreateComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
