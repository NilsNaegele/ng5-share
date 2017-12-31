import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { User } from '../../shared/models/user';
import { Comment } from '../../shared/models/comment';

import { UserService } from './../../shared/services/user.service';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit {
  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // load current users data
    this.userService.currentUser.subscribe((userData: User) => {
        this.canModify = (userData.username === this.comment.author.username);
    });
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }

}
