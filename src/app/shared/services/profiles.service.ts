import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Profile } from '../models/profile';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ProfilesService {

  constructor(private apiService: ApiService) { }

  follow(username: string): Observable<Profile> {
    return this.apiService.post('/profiles/' + username + '/follow');
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete('/profiles/' + username + '/follow');
  }

  get(username: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + username)
               .map((data: { profile: Profile }) => data.profile);
  }

}
