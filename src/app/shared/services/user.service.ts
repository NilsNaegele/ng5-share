import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from '../models/user';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

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

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: Http,
              private apiService: ApiService,
              private jwtService: JwtService) { }

  populate() {
    // if JWT detected, attempt to get and store users info
    if (this.jwtService.getToken()) {
      // utilize newly created get() method parameters are optional
      this.apiService.get('/user').subscribe(
        data => this.setAuth(data.user),
        error => this.purgeAuth()
      );
    } else {
      // remove any potential remnantsof previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // set current user data into observable
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    // set isauthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
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

  update(user): Observable<User> {
    return this.apiService.put('/user', { user })
                .map(data => {
                    this.currentUserSubject.next(data.user);
                    return data.user;
                });
  }

}
