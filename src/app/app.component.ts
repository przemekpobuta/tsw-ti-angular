import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isHomePage: boolean;

  constructor(
    private router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        // return true if route is homepage
        this.isHomePage = (event.urlAfterRedirects === '/home');
      }
    });
  }

  ngOnInit() {
  }
}
