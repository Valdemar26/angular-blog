import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { empty } from 'rxjs/internal/Observer';

import { PostsService } from '../shared/posts.service';
import { Post } from '../shared/interfaces';


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

  constructor(
    private postsService: PostsService,
    // private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getCurrentTime();
    // this.cd.detectChanges();
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

    fromEvent(value, 'input')
      .pipe(
        map((res: any) => res.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(val => {
          return this.postsService.getSearchPost(val);
         }
        )
      ).subscribe(data => console.log('DATA: ', data));

  }

}
