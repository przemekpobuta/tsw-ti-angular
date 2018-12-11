import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs';
import { User } from '../shared/models/user.model';
import {first, shareReplay, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$: Subject<User> = new Subject<User>();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  register(user: User) {
    return this.http.post(environment.api_url + 'auth/signup', user);
  }

  login(email: string, password: string) {
    return this.http.post<any>(environment.api_url + 'auth/signin', {'email': email, 'password': password})
    // this is just the HTTP call,
    // we still need to handle the reception of the token
      .pipe(tap(res => this.setSession(res)), // handles the auth result
        shareReplay());
    // prevents the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions.
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.currentUser$.next(undefined);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getUserProfile(email): any {
    return this.http.get(environment.api_url + `users/${email}`);
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  private setSession(authResult) {
    // console.log(authResult);
    localStorage.setItem('accessToken', authResult.access_token);

    this.http.get(environment.api_url + 'auth/me')
      .pipe(first())
      .subscribe(
        (user: User) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser$.next(user);
          console.log(this.getCurrentUser());
        },
        error => {
          console.log(error);
        });
  }
}
