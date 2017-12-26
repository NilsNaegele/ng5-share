import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { SettingsComponent } from './settings.component';

import { AuthenticationGuard } from './../authentication/authentication-guard.service';

const settingsRouting: ModuleWithProviders = RouterModule.forChild([
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [ AuthenticationGuard ]
      }
]);


@NgModule({
  imports: [
    SharedModule,
    settingsRouting
  ],
  declarations: [ SettingsComponent ]
})
export class SettingsModule { }
