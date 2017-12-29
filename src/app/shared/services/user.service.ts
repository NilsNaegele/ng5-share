import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from '../models/user';
import { ApiService } from './api.service';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: Http, private apiService: ApiService) { }

  setAuth(user: User) {
    // set current user data into observable
    this.currentUserSubject.next(user);
    // set isauthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, { user: credentials})
                          .map(data => {
                            this.setAuth(data.user);
                            return data;
                          });
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}
