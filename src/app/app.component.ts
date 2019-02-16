import {AfterContentInit, Component, OnInit, ViewEncapsulation, HostListener, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterStateSnapshot, NavigationStart, ActivationEnd} from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from './auth/auth.service';
import {User} from './shared/models/user.model';
import {LoaderService} from './shared/components/loader/loader.service';
import {ToastrService} from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrollEvent } from 'ngx-scroll-event';
import { ScrollService } from './shared/services/scroll.service';
import { NavbarComponent } from 'angular-bootstrap-md';
// import { NavbarComponent } from 'angular-bootstrap-md/angular-bootstrap-md/navbars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgbModalConfig, NgbModal]
  // encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit, AfterContentInit {

  @ViewChild('navbar') navbar: NavbarComponent;

  faCoffee = faCoffee;
  user: User;
  isPanel = false;
  isPage = false;
  isRecruitment = false;
  showScrollToTop = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private loaderService: LoaderService,
    private alertService: ToastrService,
    private route: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private scrollService: ScrollService
  ) {
      config.backdrop = 'static';
      config.keyboard = false;
  }

  ngOnInit() {

    this.router.events.subscribe(event => {
      this.navbar.hide();
      if (event instanceof NavigationStart) {
        // this.navbar.hide();
        if (
          event.url.substr(0, 6) === '/panel' ||
          event.url.substr(0, 5) === '/user'
        ) {
          this.isPanel = true;
          this.isPage = true;
        } else {
          this.isPanel = false;
          if (event.url.substr(0, 6) === '/home' || event.url.substr(0, 6) === '/') {
            this.isPage = false;
          } else {
            this.isPage = true;
            // console.log('isPage', this.isPage);
          }
        }
      }
      if (event instanceof ActivationEnd) {
        // console.log('ActivationEnd');
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

  handleScroll(event: ScrollEvent) {
    if (event.isReachingTop) {
      this.showScrollToTop = false;
    } else {
      this.showScrollToTop = true;
    }
  }
}
