import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

import { PostsService } from '../shared/posts.service';
import { Post } from '../shared/interfaces';
import { debounceTime, filter, first, map, skip, skipWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$: Observable<Post[]>;
  public time$: Observable<Date>;
  search$: Observable<any>;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.posts$ = this.postsService.getAllPosts();
    this.getCurrentTime();
  }

  getCurrentTime() {
    this.time$ = new Observable( obs => {
      setInterval(() => {
        obs.next(new Date());
      }, 1000);
    });
  }

  onSearchChange(searchValue: any): void {
    // console.log(searchValue,
    //   this.postsService.getAllPosts()
    //     .subscribe(data => {
    //       console.log('DATA: ', data);
    //       filter( a => console.log(a.title));
    //     }));

    // this.search$ = fromEvent(searchValue, 'input').pipe(
    //   // debounceTime(700),
    //   map(e => console.log('search: ', this.postsService.getAllPosts()))
    // );

    this.postsService.getAllPosts().pipe(
      debounceTime(500),
      // first(),
      // skipWhile( data => !data),
      // tap(data => console.log('TAP: ', data)),
      // filter(text => text.title === searchValue),
      // tap( data => console.log('FIRST DATA: ', data))
    )
      .subscribe( data => {
        map(t => t.title);
        console.log(data, searchValue, data.filter(text => text.title === searchValue));
        // pipe(
        //   skipWhile( text => !text),
        //   tap(text => console.log('TAP: ', text)),
        //   filter(text => text.title === searchValue),
        //   tap(text => console.log('TAP1: ', text)),
        // );
    });
  }

}
