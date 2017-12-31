import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Profile } from './../../shared/models/profile';
import { ArticleListConfig } from '../../shared/models/article-list-config';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.css']
})
export class ProfileFavoritesComponent implements OnInit {
  profile: Profile;
  favoritesConfig = new ArticleListConfig();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.data.subscribe((data: { profile: Profile}) => {
            this.profile = data.profile;
            this.favoritesConfig.filters.favorited = this.profile.username;
    });
  }

}
