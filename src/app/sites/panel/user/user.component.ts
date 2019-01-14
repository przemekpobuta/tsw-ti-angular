import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { User } from 'src/app/shared/models/user.model';
import { FileService } from '../files/file-explorer/services/file.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [FileService]
})
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: ToastrService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    console.log('A');
    this.user = this.authService.getCurrentUser();
    if (this.user.role !== 'user') {
      this.router.navigate(['/panel']);
    }
  }

}
