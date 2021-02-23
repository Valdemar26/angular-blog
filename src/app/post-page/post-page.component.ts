import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PostsService } from '../shared/services/posts.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {
  post$: Observable<Post>;

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private title: Title,
    private meta: Meta
  ) {
    meta.addTags([
      { name: 'keywords', content: 'Ангулар, блог, українською, angular, blog, фреймворк, Angular 8, Angular 9'},
      { name: 'description',
        content: '★Ангулар блог українською - тільки актуальні статті по фреймворку Angular, написані українською мовою★'
      }
    ]);

    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.scrollToTop();
    this.getPostById();
  }

  scrollToTop() {
    window.scrollTo(0 ,0);
  }

  getPostById() {
    this.post$ = this.route.params
      .pipe( switchMap((params: Params) => {
        if (params[`id`]) {
          this.getTitle(params[`id`]);
        }
        return this.postsService.getPostById(params[`id`]);
      }));
  }

  getTitle(id) {
    const titleStream$ = this.postsService.getPostById(id).subscribe( (post: Post) => {
      this.title.setTitle(post.title);
    });

    this.subscription.add(titleStream$);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
