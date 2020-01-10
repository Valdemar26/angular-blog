import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';

import { PostsService } from '../shared/posts.service';
import { Post } from '../shared/interfaces';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {

  posts$: Observable<any>;
  public time$: Observable<Date>;
  search$: Observable<any>;

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.getCurrentTime();
    this.posts$ = this.postsService.getAllPosts();
  }

  ngAfterViewInit() {
    // this.onSearchChange().subscribe();
    // console.log(this.searchInput.nativeElement);
  }

  getCurrentTime() {
    this.time$ = new Observable( obs => {
      setInterval(() => {
        obs.next(new Date());
      }, 1000);
    });
  }

  onSearchChange(value) {
    console.log(value);
  // behavior subject
  // this.someBeh.next(value)
  //   return fromEvent( this.searchInput.nativeElement, "input" ).pipe(
  //     tap((value) => console.log(value))
  //   );

    fromEvent(document.querySelector('#search'), 'keyup')
      .pipe(
        map(e => (e.target as HTMLTextAreaElement).value),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(val =>
          of(val).pipe(
            tap(v => {
              console.log(v);
            }
            )
          )
        )
      ).subscribe(data => console.log('DATA: ', data));

  }

}
