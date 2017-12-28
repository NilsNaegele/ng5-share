import { ArticleListConfig } from './../../shared/models/article-list-config';
import { Profile } from './../../shared/models/profile';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.css']
})
export class ProfileFavoritesComponent implements OnInit {
  profile: Profile;
  favoritesConfig = new ArticleListConfig();

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.parent.data.subscribe((data: { profile: Profile}) => {
      this.profile = data.profile;
      this.favoritesConfig.filters.favorited = this.profile.username;
    });
  }

}
