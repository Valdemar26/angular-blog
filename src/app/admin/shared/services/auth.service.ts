import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { FirebaseAuthResponse, UserInterface } from '../../../shared/interfaces';
import { environment } from '../../../../environments/environment';


@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  // getter
  get token(): string {
    const expDate = new Date(localStorage.getItem('firebase-token-expires'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('firebase-token');
  }


  login(user: UserInterface): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      user
    )
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Даний Email не зареєстровано');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неправильний Email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неправильний Password');
        break;
    }

    return throwError(error);
  }

  private setToken(response: FirebaseAuthResponse | null) {
    if (response) {
      const expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000);

      localStorage.setItem('firebase-token', response.idToken);
      localStorage.setItem('firebase-token-expires', expiresDate.toString());
    } else {
      localStorage.clear();
    }

  }
}
