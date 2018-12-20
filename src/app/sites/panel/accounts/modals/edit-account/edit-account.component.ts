import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../../../shared/models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountsService} from '../../accounts.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

  @Input() account: User;
  @Input() newUser: boolean;

  accountForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private accountsService: AccountsService,
    private alertService: ToastrService
  ) { }

  ngOnInit() {

    let login = '';
    let role = 'Wybierz rolę';

    if (!this.newUser) {
      login = this.account.login;
      switch (this.account.role) {
        case 'admin': {
          role = '1';
          break;
        }
        case 'moderator': {
          role = '2';
          break;
        }
        case 'none': {
          role = '3';
          break;
        }
      }
    }
    this.accountForm = this.formBuilder.group({
      login: [login, [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
      role: [role, Validators.required]
    });
  }

  onClickSave() {
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

    // console.log(this.accountForm);

    // this.activeModal.close(newUser);
  }

}
