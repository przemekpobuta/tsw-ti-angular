import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {User} from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(
    private http: HttpClient
  ) { }

  getAccounts() {
    return this.http.get(environment.api_url + 'users/');
  }

  deleteAccount(id: number) {
    console.log('deleteAccount: usunięto ' + id);
    return this.http.delete(environment.api_url + 'users/' + id);
  }
  updateAccount(account: User) {
    console.log('updated account: ');
    console.log(account);
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
