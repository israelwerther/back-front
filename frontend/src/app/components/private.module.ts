import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { PrivateComponent } from './private/private.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PrivateModule { }
