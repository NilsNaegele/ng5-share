import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HomeAuthenticationResolver } from './home-authentication-resolver.service';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  }
]);


@NgModule({
  imports: [homeRouting, SharedModule],
  declarations: [
    HomeComponent
  ],
  providers: [ HomeAuthenticationResolver ]
})
export class HomeModule { }
