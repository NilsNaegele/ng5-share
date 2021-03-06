import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { UserService } from './services/user.service';


@Directive({
  selector: '[appShowAuthenticated]'
})
export class ShowAuthenticatedDirective implements OnInit {
  @Input() set appShowAuthenticated(condition: boolean) {
    this.condition = condition;
  }

  condition: boolean;

  constructor(private userService: UserService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe((isAuthenticated) => {
            console.log(isAuthenticated, this.condition);
            if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
              this.viewContainerRef.createEmbeddedView(this.templateRef);
            } else {
              this.viewContainerRef.clear();
            }
    });
  }

}
