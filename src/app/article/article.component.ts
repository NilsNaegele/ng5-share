import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from './../shared/models/user';
import { Article } from './../shared/models/article';

import { ArticlesService } from './../shared/services/articles.service';
import { UserService } from './../shared/services/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;
  isSubmitting = false;
  isDeleting = false;

  constructor(private router: Router, private route: ActivatedRoute,
              private userService: UserService, private articlesService: ArticlesService) { }

  ngOnInit() {
    // retrieve prefetched article
    this.route.data.subscribe((data: { article: Article}) => {
            this.article = data.article;
    });

    // load current users data
    this.userService.currentUser.subscribe((userData: User) => {
                     this.currentUser = userData;
                     this.canModify = (this.currentUser.username === this.article.author.username);
    });
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = false;
    this.articlesService.destroy(this.article.slug)
                        .subscribe(success => {
                              this.router.navigateByUrl('/');
                        });
  }

}
