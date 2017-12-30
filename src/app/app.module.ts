import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SettingsModule } from './settings/settings.module';
import { ProfileModule } from './profile/profile.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';

import { UserService } from './shared/services/user.service';
import { ApiService } from './shared/services/api.service';
import { JwtService } from './shared/services/jwt.service';
import { ProfilesService } from './shared/services/profiles.service';
import { AuthGuard } from './authentication/auth-guard.service';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    AuthenticationModule,
    SettingsModule,
    ProfileModule,
    rootRouting

  ],
  providers: [ ApiService, UserService, JwtService, AuthGuard, ProfilesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
