import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, skipWhile, switchMap, tap } from 'rxjs/operators';

import { PostsService } from '../shared/services/posts.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  public showLoader = false;

  posts$: Observable<any>;
  public time$: Observable<Date>;
  search$: Observable<any>;
  posts: Post[];
  private subscription = new Subscription();

  constructor(
    private postsService: PostsService,
    private title: Title
  ) {
    title.setTitle('Angular Blog | Ангулар блог українською');
  }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.showLoader = true;

    this.postsService.getAllPosts().subscribe(data => {

      this.posts = data;
      this.posts$ = of(this.posts);

      this.showLoader = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
