import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AuthenticationComponent } from './authentication.component';

import { NoAuthGuard } from './no-auth-guard.service';

const authenticationRouting: ModuleWithProviders = RouterModule.forChild([
        {
          path: 'login',
          component: AuthenticationComponent,
          canActivate: [NoAuthGuard]
        },
        {
          path: 'register',
          component: AuthenticationComponent,
          canActivate: [NoAuthGuard]
        }
]);

@NgModule({
  imports: [
    SharedModule,
    authenticationRouting
  ],
  declarations: [
    AuthenticationComponent
  ],
  providers: [ NoAuthGuard ]
})
export class AuthenticationModule { }
