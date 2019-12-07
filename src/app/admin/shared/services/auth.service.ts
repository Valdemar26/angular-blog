import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { FirebaseAuthResponse, UserInterface } from '../interfaces';
import { environment } from '../../../../environments/environment';


@Injectable()
export class AuthService {

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
        tap(this.setToken)
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
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
