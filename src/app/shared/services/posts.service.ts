import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { FbCreateResponse, Post } from '../interfaces';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<any>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        };
      }));
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map( (response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map( key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }));
      }));
  }

  getSearchPost(input) {
    return this.getAllPosts().pipe(
      switchMap((value) => {
        return from(value);
      }),
      filter((i) => {
        console.log(i);
        return i['title'].includes(input);
      })
    );
  }


  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post,
          id,
          date: new Date(post.date)
        };
      }));
  }

  removePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
  }

}
