import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Profile } from '../shared/models/profile';
import { ProfilesService } from '../shared/services/profiles.service';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProfileResolver {

  constructor(private router: Router,
              private profilesService: ProfilesService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
          return this.profilesService.get(route.params['username'])
                                     .catch((error) => this.router.navigateByUrl('/'));
  }

}
