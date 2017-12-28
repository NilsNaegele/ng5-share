import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { UserService } from './../shared/services/user.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Injectable()
export class HomeAuthenticationResolver implements Resolve<boolean> {

  constructor(private router: Router, private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isAuthenticated.take(1);
  }

}
