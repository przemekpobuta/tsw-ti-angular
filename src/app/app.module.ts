import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './sites/home/home.component';
import { PageNotFoundComponent } from './sites/page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { AccountComponent } from './sites/panel/account/account.component';
import {AuthService} from './auth/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './auth/iterceptors/token.interceptor';
import {ErrorInterceptor} from './auth/iterceptors/error.interceptor';
import {AuthGuard} from './auth/guards/auth-guard.service';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PanelComponent } from './sites/panel/panel.component';
import { FilesComponent } from './sites/panel/files/files.component';
import { FileExplorerComponent } from './sites/panel/files/file-explorer/file-explorer.component';
import { NewFolerDialogComponent } from './sites/panel/files/file-explorer/modals/new-foler-dialog/new-foler-dialog.component';
import { RenameDialogComponent } from './sites/panel/files/file-explorer/modals/rename-dialog/rename-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    AccountComponent,
    PanelComponent,
    FilesComponent,
    FileExplorerComponent,
    NewFolerDialogComponent,
    RenameDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
