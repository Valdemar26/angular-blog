import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { PostsService } from '../../shared/services/posts.service';
import { Post } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSubscription: Subscription;
  deleteSubscription: Subscription;
  searchString = '';

  constructor(private postsService: PostsService, private alert: AlertService) { }

  public ngOnInit(): void {
    this.postsSubscription = this.postsService.getAllPosts().pipe(
      delay(800)
    ).subscribe( posts => {
      this.posts = posts.reverse();
    });
  }

  public removePost(id: string) {
    this.deleteSubscription = this.postsService.removePost(id)
      .subscribe(() => {
      this.posts = this.posts.filter( (post) => {
        this.alert.danger('Пост було видалено!');
        return post.id !== id;
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

}
