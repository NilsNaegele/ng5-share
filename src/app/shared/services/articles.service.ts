import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { Article } from '../models/article';
import { ApiService } from './api.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ArticlesService {

  constructor(private apiService: ApiService) { }

  get(slug): Observable<Article> {
    return this.apiService.get('/articles/' + slug)
                           .map(data => data.article);
  }

  save(article): Observable<Article> {
    if (article.slug) {
      return this.apiService.put('/articles/' + article.slug, { article: article })
                            .map(data => data.article);
    } else {
      return this.apiService.post('/articles/', { article: article})
                            .map(data => data.article);
    }
  }

  destroy(slug) {
    return this.apiService.delete('/articles/' + slug);
  }

  favorite(slug): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }

}
