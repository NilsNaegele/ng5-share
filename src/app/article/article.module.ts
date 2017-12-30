import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { ArticleComponent } from './article.component';
import { MarkdownPipe } from './markdown.pipe';
import { ArticleResolver } from './article-resolver.service';

const articleRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'article/:slug',
    component: ArticleComponent,
    resolve: {
      article: ArticleResolver
    }
  }
]);

@NgModule({
  imports: [
    SharedModule,
    articleRouting
  ],
  declarations: [
    ArticleComponent,
    MarkdownPipe
  ],
  providers: [
    ArticleResolver
  ]
})
export class ArticleModule { }
