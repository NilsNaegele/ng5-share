import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/models/user';
import { Article } from '../shared/models/article';
import { UserService } from '../shared/services/user.service';
import { ArticlesService } from '../shared/services/articles.service';

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articlesService: ArticlesService,
              private userService: UserService) { }

  ngOnInit() {
    // retrieve prefetched article
    this.route.data.subscribe((data: { article: Article}) => {
      this.article = data.article;
      console.log(this.article);
    });

    // load current user's data
    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;
      console.log(this.currentUser);
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
    this.isDeleting = true;
    this.articlesService.destroy(this.article.slug).subscribe(success => {
      this.router.navigateByUrl('/');
    });
  }

}

