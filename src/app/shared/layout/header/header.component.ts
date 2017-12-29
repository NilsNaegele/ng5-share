import { Component, OnInit } from '@angular/core';

import { User } from './../../models/user';
import { UserService } from './../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
    });
  }

}
