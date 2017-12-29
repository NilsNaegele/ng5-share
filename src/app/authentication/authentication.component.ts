import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors } from '../shared/models/errors';
import { UserService } from './../shared/services/user.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  authenticationType = '';
  title = '';
  errors = new Errors();
  isSubmitting = false;
  authenticationForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService) {
            this.authenticationForm = this.fb.group({
                  'email': ['', Validators.required],
                  'password': ['', Validators.required]
            });
   }

  ngOnInit() {
      this.route.url.subscribe(data => {
              this.authenticationType = data[data.length - 1].path;
              this.title = (this.authenticationType === 'login') ? 'Sign In' : 'Sign Up';
              if (this.authenticationType === 'register') {
                this.authenticationForm.addControl('username', new FormControl('', Validators.required));
              }
      });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();
    const credentials = this.authenticationForm.value;
    console.log(credentials);

    this.userService.attemptAuth(this.authenticationType, credentials)
                    .subscribe(data => this.router.navigateByUrl('/'),
                               error => {
                                 this.errors = error;
                                 this.isSubmitting = false;
                               });

  }

}
