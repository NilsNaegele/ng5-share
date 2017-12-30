import { Component, Input } from '@angular/core';

import { Article } from '../../models/article';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.css']
})
export class ArticleMetaComponent {
  @Input() article: Article;

}
