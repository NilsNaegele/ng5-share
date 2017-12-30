import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';

import { ProfileComponent } from './profile.component';

import { ProfileResolver } from './profile-resolver.service';

const profileRouting: ModuleWithProviders = RouterModule.forChild([
      {
        path: 'profile/:username',
        component: ProfileComponent,
        resolve: {
          profile: ProfileResolver
        }
      }
]);


@NgModule({
  imports: [
    profileRouting,
    SharedModule
  ],
  declarations: [ ProfileComponent ],
  providers: [ ProfileResolver ]
})
export class ProfileModule { }
