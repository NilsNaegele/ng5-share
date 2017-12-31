import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Comment } from './../shared/models/comment';
import { User } from './../shared/models/user';
import { Article } from './../shared/models/article';

import { ArticlesService } from './../shared/services/articles.service';
import { UserService } from './../shared/services/user.service';
import { CommentsService } from './../shared/services/comments.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(private router: Router, private route: ActivatedRoute,
              private userService: UserService,
              private articlesService: ArticlesService,
              private commentsService: CommentsService) { }

  ngOnInit() {
    // retrieve prefetched article
    this.route.data.subscribe((data: { article: Article}) => {
            this.article = data.article;
            // load comments on this article
            this.populateComments();
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
    this.isDeleting = true;
    this.articlesService.destroy(this.article.slug)
                        .subscribe(success => {
                              this.router.navigateByUrl('/');
                        });
  }

  populateComments() {
    this.commentsService.getAll(this.article.slug)
                        .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};
    const commentBody = this.commentControl.value;
    this.commentsService.add(this.article.slug, commentBody)
                        .subscribe(comment => {
                          this.comments.unshift(comment);
                          this.commentControl.reset('');
                          this.isSubmitting = false;
                        },
                      errors => {
                        this.isSubmitting = false;
                        this.commentFormErrors = errors;
                      });
  }

  onDeleteComment(comment) {
    this.commentsService.destroy(comment.id, this.article.slug)
                        .subscribe(success => {
                              this.comments = this.comments.filter((item) => item !== comment);
                        });
  }

}
