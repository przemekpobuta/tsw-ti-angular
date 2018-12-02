import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {User} from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: User;


  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        // return true if route is homepage
        // this.isHomePage = (event.urlAfterRedirects === '/home');
      }
    });
  }

  ngOnInit() {

    if (this.authService.getCurrentUser()) {
      this.user = this.authService.getCurrentUser();
    } else {
      this.authService.currentUser$.subscribe(
        user => {
          this.user = user;
          // this.user = this.authService.getCurrentUser();
          // console.log(result);
        }
      );
    }

  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
