import { Injectable } from '@angular/core';

import { Profile } from '../models/profile';
import { ApiService } from './api.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfilesService {

  constructor(private apiService: ApiService) { }

  get(username: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + username)
               .map((data: { profile: Profile}) => data.profile);
  }

}
