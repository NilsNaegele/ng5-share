import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Profile } from '../../models/profile';
import { UserService } from '../../services/user.service';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent {
  @Input() profile: Profile;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(private router: Router,
              private profilesService: ProfilesService,
              private userService: UserService) { }

  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe((authenticated) => {
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return;
      }
      if (!this.profile.following) {
        this.profilesService.follow(this.profile.username)
        .subscribe(data => {
          this.isSubmitting = false;
          this.onToggle.emit(true);
        },
        error => this.isSubmitting = false
      );
      } else {
        this.profilesService.unfollow(this.profile.username)
              .subscribe(data => {
                this.isSubmitting = false;
                this.onToggle.emit(false);
              },
        error => this.isSubmitting = false
        );
      }
    });

  }

}
