import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountsService} from './accounts.service';
import {Subscription} from 'rxjs';
import {User} from '../../../shared/models/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteAccountComponent} from './modals/delete-account/delete-account.component';
import {EditAccountComponent} from './modals/edit-account/edit-account.component';
import {LoaderService} from '../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  providers: [AccountsComponent]
})
export class AccountsComponent implements OnInit, OnDestroy {

  accountsSub: Subscription;
  accounts: User[] = [];
  isLoadingData: boolean;

  constructor(
    private accountsService: AccountsService,
    private modalService: NgbModal,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.getAccountsReq();
  }

  getAccountsReq() {
    this.isLoadingData = true;
    this.loaderService.showLoader();
    this.accountsSub = this.accountsService.getAccounts().subscribe(
      (data: User[]) => {
        console.log(data);
        this.accounts = data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.loaderService.hideLoader();
        this.isLoadingData = false;
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
    editDialogRef.componentInstance.account_id = account.id;
    editDialogRef.componentInstance.newUser = false;

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
