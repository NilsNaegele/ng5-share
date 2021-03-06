import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleListConfig } from './../../shared/models/article-list-config';
import { TagsService } from './../../shared/services/tags.service';
import { UserService } from './../../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated: boolean;
  listConfig = new ArticleListConfig();
  tags: string[] = [];
  tagsLoaded = false;

  constructor(private router: Router,
              private userService: UserService,
              private tagsService: TagsService) { }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe((authenticated) => {
                this.isAuthenticated = authenticated;
                if (authenticated) {
                  this.setListTo('feed');
                } else {
                  this.setListTo('all');
                }
    });

    this.tagsService.getAll().subscribe(tags => {
              this.tags = tags;
              this.tagsLoaded = true;
    });
  }

  setListTo(type = '', filters = {}) {
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.listConfig = { type: type, filters: filters };
  }

}
