import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { User } from '../models/user';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: Http,
              private apiService: ApiService,
              private jwtService: JwtService) { }

  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/user').subscribe(
        data => this.setAuth(data.user),
        error => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // set current user data into observable
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
