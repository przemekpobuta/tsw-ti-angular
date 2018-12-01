import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './sites/home/home.component';
import {PageNotFoundComponent} from './sites/page-not-found/page-not-found.component';
import {LoginComponent} from './auth/login/login.component';
import {AccountComponent} from './sites/panel/account/account.component';
import {AuthGuard} from './auth/guards/auth-guard.service';
import {PanelComponent} from './sites/panel/panel.component';
import {FilesComponent} from './sites/panel/files/files.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'panel', component: PanelComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'files', pathMatch: 'full' },
      {path: 'files', component: FilesComponent},
      {path: 'account', component: AccountComponent}
    ]},
  {path: '**', component: PageNotFoundComponent} // musi być ostatnie
];

// , canActivate: [AuthGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
