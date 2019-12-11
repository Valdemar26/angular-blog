import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { PostsService } from '../../shared/posts.service';
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

  ngOnInit() {
    this.postsSubscription = this.postsService.getAllPosts().subscribe( posts => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  remove(id: string) {
    this.deleteSubscription = this.postsService.removePost(id).subscribe(() => {
      this.posts = this.posts.filter( (post) => {
        this.alert.danger('Пост було видалено!');
        return post.id !== id;
      });
    });
  }

}
