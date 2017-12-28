import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Article } from './../shared/models/article';
import { UserService } from './../shared/services/user.service';
import { ArticlesService } from './../shared/services/articles.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticleResolver implements Resolve<Article> {

  constructor(private router: Router,
              private articlesService: ArticlesService,
              private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articlesService.get(route.params['slug'])
                                .catch((error) => this.router.navigateByUrl('/'));
  }

}
