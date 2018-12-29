import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log(err);
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.router.navigate(['/login']);
        this.authService.logout();

        // not tested in secured route
        // location.reload(true);
      }
      if (err.status === 422) {
        console.error('Za duży plik!');
      }
      console.error(err.status);
      const error = err.error.message || err.statusText;
      console.log(error);
      return throwError(error);
    }));
  }
}
