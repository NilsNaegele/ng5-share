import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Profile } from '../../shared/models/profile';
import { ArticleListConfig } from '../../shared/models/article-list-config';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.css']
})
export class ProfileArticlesComponent implements OnInit {
  profile: Profile;
  articlesConfig = new ArticleListConfig();

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.parent.data.subscribe((data: { profile: Profile}) => {
            this.profile = data.profile;
            this.articlesConfig.filters.author = this.profile.username;
    });
  }

}
