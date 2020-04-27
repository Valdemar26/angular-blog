import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, skipWhile, switchMap, tap } from 'rxjs/operators';

import { PostsService } from '../shared/posts.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  posts$: Observable<any>;
  public time$: Observable<Date>;
  search$: Observable<any>;
  posts: Post[];
  private subscription = new Subscription();

  @ViewChild('searchInput', { static: true }) search: ElementRef;
  makeSearch = false;

  constructor(
    private postsService: PostsService,
    private title: Title
  ) {
    title.setTitle('Angular Blog | Ангулар блог українською');
  }

  ngOnInit() {
    this.getCurrentTime();
    this.getAllPosts();
    this.getInputData();
  }

  getCurrentTime() {
    this.time$ = new Observable( obs => {
      setInterval(() => {
        obs.next(new Date());
      }, 1000);
    });
  }

  getAllPosts() {
    this.postsService.getAllPosts().subscribe(data => {
      this.posts = data;
      this.posts$ = of(this.posts);
    });

    // console.log(this.search$);
  }

  getFilteredPosts(currentInputValue): Observable<any> {
    return of(this.posts).pipe(
      tap(data => console.log('getFilteredPosts: ', data)),
      map((arrayOfPosts) => {
        return arrayOfPosts.filter((item) => item.title.toLowerCase().includes(currentInputValue.toLowerCase()));
      })
    );
  }

  getInputData() {
    console.log('getInputData: ', this.search.nativeElement);
    this.posts$ = fromEvent(this.search.nativeElement, 'keyup').pipe(
      tap( (res) => console.log('res: ', res)),
      skipWhile( (data) => !data),
      filter( (val) => !!val ),
      map( (event: any) => event.target.value ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap( (currentInputValue) => {
        this.makeSearch = true;
        return this.getFilteredPosts(currentInputValue);
      }),
      tap( (res) => {
        console.log('result: ', res);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
