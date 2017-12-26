import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';

import { environment } from './../environments/environment';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HeaderComponent } from './shared/layout/header/header.component';

import { ApiService } from './shared/services/api.service';
import { UserService } from './shared/services/user.service';
import { UserFirebaseService } from './shared/services/user.firebase.service';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false});


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    HomeModule,
    rootRouting,
    AuthenticationModule
  ],
  providers: [ApiService, UserService, UserFirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
