import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  authenticationType = '';
  title = '';
  isSubmitting = false;
  authenticationForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
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
    const credentials = this.authenticationForm.value;
    console.log(credentials);
  }

}
