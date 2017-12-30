import { AuthGuard } from './../authentication/auth-guard.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { EditorComponent } from './editor.component';

import { EditableArticleResolver } from './editable-article-resolver.service';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
        {
          path: 'editor',
          component: EditorComponent,
          canActivate: [ AuthGuard ]
        },
        {
          path: 'editor/:slug',
          component: EditorComponent,
          canActivate: [ AuthGuard ],
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
  declarations: [
    EditorComponent
  ],
  providers: [
    EditableArticleResolver
  ]
})
export class EditorModule { }
