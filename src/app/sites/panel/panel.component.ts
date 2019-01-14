import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../shared/models/user.model';
import {Subscription} from 'rxjs';
import {FileService} from './files/file-explorer/services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [FileService]
})
export class PanelComponent implements OnInit, OnDestroy {

  activeUser: User = null;
  activeUserSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activeUser = this.authService.getCurrentUser();
    if (this.activeUser.role === 'user') {
      this.router.navigate(['/user']);
    }

  }
  ngOnDestroy() {
    // this.activeUserSub.unsubscribe();
  }


}
