import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from './../shared/models/article';
import { ArticlesService } from './../shared/services/articles.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  article = new Article();
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;

  constructor(private articlesService: ArticlesService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder
              ) {
              this.articleForm = this.fb.group({
                title: '',
                description: '',
                body: ''
              });
    this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }

  ngOnInit() {
    // if there is an article prefetched, load it
    this.route.data.subscribe((data: { article: Article}) => {
          if (data.article) {
            this.article = data.article;
            this.articleForm.patchValue(data.article);
          }
    });
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;
    // only add tag if it does not exist yet
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter((tag) => tag !== tagName);
  }


  updateArticle(values: Object) {
    (<any>Object).assign(this.article, values);
  }

  submitForm() {
    this.isSubmitting = true;
    // update the model
    this.updateArticle(this.articleForm.value);
    // post changes
    this.articlesService.save(this.article).subscribe(
      article => this.router.navigateByUrl('/editor/' + article.slug),
      errors => {
        this.errors = errors;
        this.isSubmitting = false;
      });
  }

}
