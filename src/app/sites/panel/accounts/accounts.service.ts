import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {User} from '../../../shared/models/user.model';
import {Observable} from 'rxjs';
import {PanelComponent} from '../panel.component';

@Injectable()
export class AccountsService {

  constructor(
    private http: HttpClient
  ) { }

  getAccounts() {
    return this.http.get(environment.api_url + 'users/');
  }
  getAccount(account_id: number) {
    return this.http.get(environment.api_url + 'users/' + account_id);
  }

  deleteAccount(id: number) {
    console.log('deleteAccount: usunięto ' + id);
    return this.http.delete(environment.api_url + 'users/' + id);
  }
  updateAccount(account: User, id: number) {
    // console.log('updated account: ');
    // console.log(account);
    return this.http.put(environment.api_url + 'users/' + id, account);
  }
  createAccount(account: User) {
    console.log('created account: ');
    console.log(account);
    return this.http.post(environment.api_url + 'users/', {
      login: account.login,
      password: account.password,
      password_confirmation: account.password_confirmation,
      role: account.role
    });
  }

}
