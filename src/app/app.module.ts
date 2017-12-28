import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SettingsModule } from './settings/settings.module';
import { ProfileModule } from './profile/profile.module';
import { EditorModule } from './editor/editor/editor.module';
import { ArticleModule } from './article/article.module';

import { environment } from './../environments/environment';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HeaderComponent } from './shared/layout/header/header.component';

import { ApiService } from './shared/services/api.service';
import { UserService } from './shared/services/user.service';
import { JwtService } from './shared/services/jwt.service';
import { AuthenticationGuard } from './authentication/authentication-guard.service';
import { UserFirebaseService } from './shared/services/user.firebase.service';
import { ProfilesService } from './shared/services/profiles.service';
import { ArticlesService } from './shared/services/articles.service';
import { CommentsService } from './shared/services/comments.service';
import { TagsService } from './shared/services/tags.service';

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
    AuthenticationModule,
    EditorModule,
    SettingsModule,
    ProfileModule,
    ArticleModule
  ],
  providers: [ApiService, UserService, UserFirebaseService,
              JwtService, AuthenticationGuard, ProfilesService,
              ArticlesService, CommentsService, TagsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
