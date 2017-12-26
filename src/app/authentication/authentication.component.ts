import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../shared/services/user.service';
import { UserFirebaseService } from './../shared/services/user.firebase.service';

import { Errors } from '../shared/models/errors';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  authenticationType = '';
  title = '';
  errors = new Errors();
  errorMessage = '';
  isSubmitting = false;
  isSignIn = false;
  authenticationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private userFirebaseService: UserFirebaseService,
              private route: ActivatedRoute,
              private router: Router) {
    this.authenticationForm = this.fb.group({
      'email': [' ', Validators.required],
      'password': [' ', Validators.required ]
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();
    const credentials = this.authenticationForm.value;
    console.log(credentials);
    this.userService.attemptAuth(this.authenticationType, credentials)
                    .subscribe(data => this.router.navigateByUrl('/'), error => {
                      this.errors = error;
                      this.isSubmitting = false;
                    });

  }

  submitFormFirebase() {
    this.isSubmitting = true;
    const credentials = this.authenticationForm.value;
    if (!credentials.email || !credentials.password || !this.validateEmail(credentials.email)) {
      this.errorMessage = 'All fields and a valid email are required';
      return;
    }
      if (this.authenticationType === 'login') {
        console.log(credentials.email);
      this.userFirebaseService.loginUser(credentials.email.trim(), credentials.password).subscribe((user) => {
        if (user) {
          this.router.navigateByUrl('/');
        }
        console.log(user);
        this.isSubmitting = false;
      });
    }
    if (this.authenticationType === 'register') {
      this.userFirebaseService.registerUser(credentials.email, credentials.password)
                              .subscribe((user) => {
        if (user) {
          this.router.navigateByUrl('/');
        }
        console.log(user);
        this.errorMessage = user.email;
        this.isSubmitting = false;
      });
    }

  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authenticationType = data[data.length - 1].path;
      this.title = (this.authenticationType === 'login') ? 'Sign In' : 'Sign Up';
      if (this.title === 'Sign In') {
        this.isSignIn = true;
      } else {
        this.isSignIn = false;
      }
      if (this.authenticationType === 'register') {
        this.authenticationForm.addControl('username', new FormControl(' ', Validators.required));
      }
    });

  }

}
