import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { ListErrorsComponent } from './list-errors/list-errors.component';
import { ShowAuthenticatedDirective } from './show-authenticated.directive';
import { FollowButtonComponent } from './buttons/follow-button/follow-button.component';
import { ArticleMetaComponent } from './article-helpers/article-meta/article-meta.component';
import { FavoriteButtonComponent } from './buttons/favorite-button/favorite-button.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    ListErrorsComponent,
    ShowAuthenticatedDirective,
    FollowButtonComponent,
    FavoriteButtonComponent,
    ArticleMetaComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    ListErrorsComponent,
    ShowAuthenticatedDirective,
    FollowButtonComponent,
    FavoriteButtonComponent,
    ArticleMetaComponent
  ]
})
export class SharedModule { }
