import { Component, Input } from '@angular/core';

import { Errors } from '../models/errors';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css']
})
export class ListErrorsComponent {
  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = [];
    if (errorList.errors) {
      for (const field in errorList.errors) {
        if (errorList.errors.hasOwnProperty(field)) {
        this.formattedErrors.push(`${field} ${errorList.errors[field]}`);
        }
      }
    }
  }

  formattedErrors: string[] = [];

  get errorList() { return this.formattedErrors; }

}
