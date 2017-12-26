import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { ShowAuthenticatedDirective } from './show-authenticated.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    ListErrorsComponent,
    ShowAuthenticatedDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    ListErrorsComponent,
    ShowAuthenticatedDirective
  ]
})
export class SharedModule { }
