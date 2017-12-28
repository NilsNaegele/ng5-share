import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { UserService } from './../shared/services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isAuthenticated.take(1);
  }

}
