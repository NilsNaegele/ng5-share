import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';

import { HomeAuthResolver } from './home-auth-resolver.service';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  }
]);


@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [HomeComponent],
  exports: [ HomeComponent ],
  providers: [ HomeAuthResolver ]
})
export class HomeModule { }
