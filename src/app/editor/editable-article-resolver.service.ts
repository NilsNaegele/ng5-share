import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Article } from '../shared/models/article';

import { UserService } from './../shared/services/user.service';
import { ArticlesService } from './../shared/services/articles.service';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class EditableArticleResolver implements Resolve<Article> {

  constructor(private router: Router,
              private articleService: ArticlesService,
              private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articleService.get(route.params['slug'])
                              .map(article => {
                                if (this.userService.getCurrentUser().username === article.author.username) {
                                  return article;
                                } else {
                                  this.router.navigateByUrl('/');
                                }
                              }).catch((error) => this.router.navigateByUrl('/'));
  }

}
