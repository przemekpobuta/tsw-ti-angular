import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../../../shared/models/user.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountsService} from '../../accounts.service';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {LoaderService} from '../../../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit, OnDestroy {

  @Input() account_id: number;
  @Input() newUser: boolean;

  account: User;
  login: string;
  role: string;
  getUserSub: Subscription;
  updateUserReq: Subscription;

  accountForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private accountsService: AccountsService,
    private alertService: ToastrService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {

    this.login = '';
    this.role = 'Wybierz rolę';

    this.accountForm = this.formBuilder.group({
      login: [this.login, [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
      role: [this.role, Validators.required]
    });

    if (!this.newUser) {
      this.getUserReq(this.account_id);
    }

  }

  ngOnDestroy() {
    if (this.getUserSub) {
      this.getUserSub.unsubscribe();
    }
    if (this.updateUserReq) {
      this.updateUserReq.unsubscribe();
    }
  }

  initEditForm() {
    this.login = this.account.login;
    this.role = this.account.role;

    this.accountForm = this.formBuilder.group({
      login: [this.login, [Validators.required, Validators.minLength(6)]],
      password: [''],
      password_confirmation: [''],
      role: [{value: this.role, disabled: this.role === 'admin'}, Validators.required]
    });
  }

  getUserReq(account_id) {
    this.loaderService.showLoader();
    this.getUserSub = this.accountsService.getAccount(account_id).subscribe(
      (res: User) => {
        this.account = res;
        this.initEditForm();
      }, err => {
        console.error(err);
      }, () => {
        this.loaderService.hideLoader();
      }
    );
  }

  get loginInput() {
    return this.accountForm.controls['login'];
  }
  get passwordInput() {
    return this.accountForm.controls['password'];
  }
  get passwordConfirmationInput() {
    return this.accountForm.controls['password_confirmation'];
  }
  get roleInput() {
    return this.accountForm.controls['role'];
  }


  onClickSave() {
    if (this.newUser) {
      const newUser: User = {
        id: null,
        login: this.accountForm.controls['login'].value,
        password: this.accountForm.controls['password'].value,
        password_confirmation: this.accountForm.controls['password_confirmation'].value,
        role: this.accountForm.controls['role'].value
      };

      this.accountsService.createAccount(newUser).subscribe(
        res => {
          this.alertService.success('Pomyślnie stworzono użytkownika!');
          this.activeModal.close('Zarejestrowano');
        },
        err => {
          this.alertService.error('Błąd podczas tworzenia użytkownika!');
        },
        () => {
        });

    } else {
      let updateUser = {};
      if (this.loginInput.value !== this.account.login) {
        updateUser['login'] = this.loginInput.value;
        this.alertService.info('update LOGIN');
      }
      if (this.passwordInput.value !== '') {
        updateUser['password'] = this.passwordInput.value;
        updateUser['password_confirmation'] = this.passwordConfirmationInput.value;
      }
      if (this.roleInput.value !== this.account.role) {
        updateUser['role'] = this.roleInput.value;
      }
      if (
        updateUser.hasOwnProperty('login') ||
        updateUser.hasOwnProperty('password') ||
        updateUser.hasOwnProperty('role')
      ) {
        console.log(updateUser);
        this.updateUserReq = this.accountsService.updateAccount(updateUser, this.account.id).subscribe(
          res => {
            this.alertService.success('Zaktualizowano użytkownika!');
            // this.initEditForm();
            this.activeModal.close('Zarejestrowano');
          },
          err => {
            this.alertService.error('Nie udało się zaktualizować użytkownika!');
          }
        );
      } else {
        this.alertService.info('Nie dokonany żadnych zmian.');
      }
    }

    // console.log(this.accountForm);
  }

}
