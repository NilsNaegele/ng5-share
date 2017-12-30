import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';

import { Article } from './../shared/models/article';

import { ArticlesService } from './../shared/services/articles.service';
import { UserService } from './../shared/services/user.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticleResolver implements Resolve<Article> {

  constructor(private router: Router,
              private userService: UserService,
              private articlesService: ArticlesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articlesService.get(route.params['slug'])
                                .catch((errors) => this.router.navigateByUrl('/'));
  }

}
