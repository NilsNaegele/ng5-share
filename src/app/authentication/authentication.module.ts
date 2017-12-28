import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AuthenticationComponent } from './authentication.component';
import { NoAuthenticationGuard } from './no-authentication-guard.service';

const authenticationRouting: ModuleWithProviders = RouterModule.forChild([
              {
                path: 'login',
                component: AuthenticationComponent,
                canActivate: [ NoAuthenticationGuard ]
              },
              {
                path: 'register',
                component: AuthenticationComponent,
                canActivate: [ NoAuthenticationGuard ]
              }
]);

@NgModule({
  imports: [ authenticationRouting, SharedModule ],
  declarations: [ AuthenticationComponent ],
  providers: [ NoAuthenticationGuard ]
})
export class AuthenticationModule { }
