import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PostsService } from '../shared/services/posts.service';
import { Post } from '../shared/interfaces';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  public showLoader = false;
  public pictures = [];

  posts$: Observable<any>;
  public time$: Observable<Date>;
  search$: Observable<any>;
  posts: Post[];
  private subscription = new Subscription();

  constructor(
    private postsService: PostsService,
    private title: Title,
    private http: HttpClient
  ) {
    title.setTitle('Angular Blog | Ангулар блог українською');
  }

  public ngOnInit(): void {
    this.getAllPosts();
    this.getRandomPics();
  }

  public getRandomPics(): void {
    const picturesSubscription = this.http.get(`https://api.unsplash.com/photos/?client_id=${environment.unsplashApi}`).pipe(
      tap((data) => console.log('pictures1: ', data)),
      map((pic: any) => pic.map((p) => p.urls.full)),
      tap((data) => console.log('pictures2: ', data))
    ).subscribe(pictures => this.pictures = pictures);

    this.subscription.add(picturesSubscription);
  }

  public getAllPosts(): void {
    this.showLoader = true;

    this.postsService.getAllPosts().subscribe(data => {

      this.posts = data.reverse();
      console.log(this.posts);
      this.posts$ = of(this.posts);

      this.showLoader = false;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
