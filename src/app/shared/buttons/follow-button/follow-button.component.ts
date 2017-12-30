import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Profile } from '../../models/profile';

import { ProfilesService } from './../../services/profiles.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent {
  @Input() profile: Profile;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe((authenticated) => {
      // not authenticated push to login screen
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return;
      }
      // follow this profile if we aren't already
      if (!this.profile.following) {
        this.profileService.follow(this.profile.username)
                            .subscribe(
                              data => {
                                this.isSubmitting = false;
                                this.onToggle.emit(true);
                              },
                              error => this.isSubmitting = false
                            );
      // otherwise unfollow this profile
      } else {
        this.profileService.unfollow(this.profile.username)
                           .subscribe(data => {
                             this.isSubmitting = false;
                             this.onToggle.emit(false);
                           },
                            error => this.isSubmitting = false
                          );
      }
    });
  }

  constructor(private router: Router,
              private userService: UserService,
              private profileService: ProfilesService) { }


}
