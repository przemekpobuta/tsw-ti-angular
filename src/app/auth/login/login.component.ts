import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthService} from '../auth.service';
import {LoaderService} from '../../shared/components/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: ToastrService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required]
    });

    // reset login status
    this.authService.logout();
  }
  ngOnDestroy() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.alertService.error('Niewłaściwe dane logowania!', 'Błąd logowania');
    } else {
      this.loaderService.showLoader();
      this.authService.login(this.f.login.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          result => {},
          error => {
            this.alertService.error(error, 'Błąd logowania');
          },
          () => {
            this.authService.currentUser$.subscribe(res => {
              this.router.navigate(['/panel']);
              this.alertService.clear();
            }, () => {
              this.loaderService.hideLoader();
            });
          });
    }
  }
}
