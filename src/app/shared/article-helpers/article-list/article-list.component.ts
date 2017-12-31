import { Component, Input } from '@angular/core';

import { Article } from '../../models/article';
import { ArticleListConfig } from '../../models/article-list-config';

import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {
  @Input() limit: number;
  @Input() set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }
  query: ArticleListConfig;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: number[] = [1];

  constructor(private articlesService: ArticlesService) { }

  runQuery() {
    this.loading = true;
    this.results = [];

    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = (this.limit * (this.currentPage - 1));
    }

    this.articlesService.query(this.query).subscribe(data => {
      this.loading = false;
      this.results = data.articles;
      this.totalPages = Array.from(new Array(Math.ceil(data.articleCount / this.limit)), (val, index) => index + 1);
    });

  }

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

}
