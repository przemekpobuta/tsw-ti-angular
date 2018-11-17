import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './sites/home/home.component';
import {PageNotFoundComponent} from './sites/page-not-found/page-not-found.component';
import {LoginComponent} from './auth/login/login.component';
import {AccountComponent} from './auth/account/account.component';
import {AuthGuard} from './auth/guards/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent} // musi być ostatnie
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
