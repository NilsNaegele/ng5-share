import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';

import { ArticlesService } from './../shared/services/articles.service';
import { UserService } from './../shared/services/user.service';

import { Observable } from 'rxjs/Observable';

import { Article } from './../shared/models/article';

@Injectable()
export class EditableArticleResolver implements Resolve<Article> {

  constructor(private router: Router,
              private userService: UserService,
              private articlesService: ArticlesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articlesService.get(route.params['slug'])
                               .map(article => {
                                  if (this.userService.getCurrentUser().username === article.author.username) {
                                    return article;
                                  } else {
                                    this.router.navigateByUrl('/');
                                  }
                                })
                                .catch((error) => this.router.navigateByUrl('/'));
  }

}
