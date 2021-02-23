import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { CommentsInterface } from '../interfaces/comments.interface';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  public commentsList$: BehaviorSubject<CommentsInterface[]> = new BehaviorSubject<CommentsInterface[]>([]);
  private commentsListArray: CommentsInterface[] = [];

  public replyList$: BehaviorSubject<CommentsInterface[]> = new BehaviorSubject<CommentsInterface[]>([]);
  private replyListArray: any[] = [];

  constructor() { }

  public getCommentsFromStorage(id: number): CommentsInterface[] {
    const commentsFromStorage = localStorage.getItem(`comments-${id}`);
    return commentsFromStorage ? JSON.parse(commentsFromStorage) : [];
  }

  public initCommentsList(id: number): void {
    this.commentsList$.next(this.getCommentsFromStorage(id));
  }

  public updateCommentsList(id: number, comment?: CommentsInterface): void {

    if (comment && Object.keys(comment).length) {
      this.commentsListArray = this.getCommentsFromStorage(id);
      this.commentsListArray.push(comment);
      localStorage.setItem(`comments-${id}`, JSON.stringify(this.commentsListArray));
      this.commentsList$.next(this.commentsListArray);
      this.replyList$.next(this.commentsListArray);
    }
  }

  public updateReplyList(id: number, replyId: number, reply?: CommentsInterface): void {

    const commentsFromStorage = JSON.parse(localStorage.getItem(`comments-${id}`));

    const repliedComment = commentsFromStorage.filter((singleComment: CommentsInterface) => singleComment.commentId === replyId);

    if (repliedComment[0].reply) {
      repliedComment[0].reply.push(reply);
    } else {
      repliedComment[0].reply = [];
      repliedComment[0].reply.push(reply);
    }

    localStorage.setItem(`comments-${id}`, JSON.stringify([...commentsFromStorage]));
    this.commentsList$.next(commentsFromStorage);
  }

  public get getComments(): Observable<any> {
    return this.commentsList$.asObservable();
  }

  public get getReplyToComments(): Observable<any> {
    return this.replyList$.asObservable();
  }
}
