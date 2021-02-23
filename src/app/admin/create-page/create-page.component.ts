import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Post } from '../../shared/interfaces';
import { PostsService } from '../../shared/services/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;

  constructor(private postsService: PostsService, private alert: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    };

    this.postsService.create(post).subscribe(() => {
      console.log('Post: ', post);
      this.form.reset();
      this.alert.success('Create Post');
    });
  }

}
