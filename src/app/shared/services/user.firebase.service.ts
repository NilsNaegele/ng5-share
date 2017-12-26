import { Injectable, Inject } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../models/user';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserFirebaseService {

  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.authState;
  }

  registerUser(email: string, password: string): Observable<firebase.User> {
    const promise = this.angularFireAuth.auth.createUserWithEmailAndPassword(
      email, password)
    .then((user) => {
      this.logout();
      return user;
    })
    // We output the error here for debugging purposes
    .catch((error) => {
      console.log(error);
      throw error;
    });
    return Observable.fromPromise(<Promise<firebase.User>>promise);
  }

  loginUser(email: string, password: string): Observable<firebase.User> {
    const promise = this.angularFireAuth.auth.signInWithEmailAndPassword(
      email, password)
    .catch((error) => {
      console.log('Error in auth service, loginUser: ' + error);
      throw error;
    });
    return Observable.fromPromise(<Promise<firebase.User>>promise);
  }

  logout() {
    return this.angularFireAuth.auth.signOut()
    .catch((error) => {
      console.log(error);
      throw error;
    });
  }

  isAuthenticated() {
    return this.user
    .map(
      (user) => {
        if (user == null) {
          return false;
        } else {
          return true;
        }
      }
    );

  }



}
