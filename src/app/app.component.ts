import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterStateSnapshot, NavigationStart} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {User} from './shared/models/user.model';
import {LoaderService} from './shared/components/loader/loader.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit, AfterContentInit {

  user: User;
  isPanel = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private loaderService: LoaderService,
    private alertService: ToastrService,
    private route: ActivatedRoute
    ) {
    }

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url.substr(0, 6) === '/panel') {
          this.isPanel = true;
        } else {
          this.isPanel = false;
        }
      }
    });

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
  ngAfterContentInit() {

  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
    this.alertService.success('Wylogowano pomyślnie!');
  }
}
