import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';

import { SharedModule } from '../../shared/shared.module';
import { AuthenticationGuard } from './../../authentication/authentication-guard.service';
import { EditableArticleResolver } from './../editable-article-resolver.service';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [ AuthenticationGuard ],
    resolve: {
      article: EditableArticleResolver
    }
  }
]);

@NgModule({
  imports: [
    SharedModule,
    editorRouting
  ],
  declarations: [ EditorComponent ],
  providers: [ EditableArticleResolver ]
})
export class EditorModule { }
