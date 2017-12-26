import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AuthenticationComponent } from './authentication.component';

const authenticationRouting: ModuleWithProviders = RouterModule.forChild([
              {
                path: 'login',
                component: AuthenticationComponent
              },
              {
                path: 'register',
                component: AuthenticationComponent
              }
]);

@NgModule({
  imports: [ authenticationRouting, SharedModule ],
  declarations: [ AuthenticationComponent ],
  providers: []
})
export class AuthenticationModule { }