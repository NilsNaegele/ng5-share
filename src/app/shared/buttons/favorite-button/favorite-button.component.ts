import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from '../../models/article';
import { UserService } from './../../services/user.service';
import { ArticlesService } from './../../services/articles.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent {
  @Input() article: Article;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(private router: Router,
              private userService: UserService,
              private articlesService: ArticlesService) { }

  toggleFavorite() {
    this.isSubmitting = true;
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }

        if (!this.article.favorited) {
          this.articlesService.favorite(this.article.slug)
                .subscribe(data => {
                  this.isSubmitting = false;
                  this.onToggle.emit(true);
                },
                  error => this.isSubmitting = false
              );
        } else {
          this.articlesService.unfavorite(this.article.slug)
                .subscribe(data => {
                  this.isSubmitting = false;
                  this.onToggle.emit(false);
                },
                  error => this.isSubmitting = false
              );
        }
      }
    );
  }

}
