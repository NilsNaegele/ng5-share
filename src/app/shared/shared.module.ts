import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ListErrorsComponent } from './list-errors/list-errors.component';
import { ShowAuthenticatedDirective } from './show-authenticated.directive';
import { FollowButtonComponent } from './buttons/follow-button/follow-button.component';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListErrorsComponent,
    ShowAuthenticatedDirective,
    FollowButtonComponent
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ListErrorsComponent,
    ShowAuthenticatedDirective,
    FollowButtonComponent
  ]
})
export class SharedModule { }
