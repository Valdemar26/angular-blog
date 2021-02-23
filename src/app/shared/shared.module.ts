import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { CommentsComponent } from './components/comments/comments.component';
import { ReplyComponent } from './components/reply/reply.component';
import { ToastComponent } from './components/toast/toast.component';

import { CommentsPipe } from './pipe/comments.pipe';
import { ReversePipe } from './pipe/reverse.pipe';


@NgModule({
  declarations: [
    CommentsComponent,
    ReplyComponent,
    ToastComponent,
    CommentsPipe,
    ReversePipe
  ],
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    CommentsComponent,
    ReplyComponent,
    ToastComponent,
    CommentsPipe,
    ReversePipe
  ]
})
export class SharedModule {

}
