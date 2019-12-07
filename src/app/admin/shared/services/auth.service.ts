import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserInterface } from '../interfaces';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  // getter
  get token(): string {
   return '';
  }


  login(user: UserInterface): Observable<any> {
    return this.http.post('', user);
  }

  logout() {

  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken() {

  }
}
