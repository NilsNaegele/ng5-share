import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './../shared/models/user';
import { UserService } from './../shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user = new User();
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) {

                this.settingsForm = this.formBuilder.group({
                  image: '',
                  username: '',
                  bio: '',
                  email: '',
                  password: ''
                });
            this.settingsForm.patchValue(this.user);
      }

  ngOnInit() {
    (<any>Object).assign(this.user, this.userService.getCurrentUser());
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;
    this.updateUser(this.settingsForm.value);
    this.userService.update(this.user)
        .subscribe(updateUser => this.router.navigateByUrl('/profile/' + updateUser.username),
      errors => {
        this.errors = errors;
        this.isSubmitting = false;
      });
  }

  updateUser(values: Object) {
    (<any>Object).assign(this.user, values);
  }

}
