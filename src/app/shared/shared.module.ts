import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ListErrorsComponent } from './list-errors/list-errors.component';
import { ShowAuthenticatedDirective } from './show-authenticated.directive';
import { FollowButtonComponent } from './buttons/follow-button/follow-button.component';
import { ArticleMetaComponent } from './article-helpers/article-meta/article-meta.component';
import { FavoriteButtonComponent } from './buttons/favorite-button/favorite-button.component';
import { ArticleListComponent } from './article-helpers/article-list/article-list.component';
import { ArticlePreviewComponent } from './article-helpers/article-preview/article-preview.component';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListErrorsComponent,
    ShowAuthenticatedDirective,
    FollowButtonComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticleListComponent,
    ArticlePreviewComponent
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ListErrorsComponent,
    ShowAuthenticatedDirective,
    FollowButtonComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticleListComponent,
    ArticlePreviewComponent
  ]
})
export class SharedModule { }
