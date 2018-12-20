import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountsService} from './accounts.service';
import {Subscription} from 'rxjs';
import {User} from '../../../shared/models/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UploadDialogComponent} from '../files/file-explorer/modals/upload-dialog/upload-dialog.component';
import {DeleteAccountComponent} from './modals/delete-account/delete-account.component';
import {EditAccountComponent} from './modals/edit-account/edit-account.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {

  accountsSub: Subscription;
  accounts: User[] = [];

  constructor(
    private accountsService: AccountsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAccountsReq();
  }

  getAccountsReq() {
    this.accountsSub = this.accountsService.getAccounts().subscribe(
      (res: User[]) => {
        console.log(res);
        this.accounts = res;
      },
      err => {
        console.log(err);
      },
      () => {

      }
    );
  }

  ngOnDestroy() {
    this.accountsSub.unsubscribe();
  }

  onClickDelete(account: User) {
    const deleteDialogRef = this.modalService.open(DeleteAccountComponent);
    deleteDialogRef.componentInstance.id = account.id;
    deleteDialogRef.componentInstance.login = account.login;

    deleteDialogRef.result.then(res => {
        // console.log(res);
        this.getAccountsReq();
      },
      dismiss => {
        console.error(dismiss);
        this.getAccountsReq();
      });

  }

  openClickEdit(account: User) {
    const editDialogRef = this.modalService.open(EditAccountComponent);
    editDialogRef.componentInstance.account = account;
    editDialogRef.componentInstance.newUser = false;

    editDialogRef.result.then(
      (res: User) => {
        this.accountsService.updateAccount(res);
        // console.log(res);
        this.getAccountsReq();
      },
      dismiss => {
        console.error(dismiss);
        this.getAccountsReq();
      });
  }
  openClickNewAccount() {
    const editDialogRef = this.modalService.open(EditAccountComponent);
    editDialogRef.componentInstance.account = null;
    editDialogRef.componentInstance.newUser = true;

    editDialogRef.result.then(
      (res: User) => {
        // console.log(res);
        this.getAccountsReq();
      },
      dismiss => {
        console.error(dismiss);
        this.getAccountsReq();
      });
  }

}
