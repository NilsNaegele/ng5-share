import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    SharedModule,
    HomeModule,
    rootRouting

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
