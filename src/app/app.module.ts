import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
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
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import { AboutComponent } from './sites/about/about.component';
import { LoadingBarComponent } from './shared/components/loader/loading-bar/loading-bar.component';
import {LoaderService} from './shared/components/loader/loader.service';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { MoveDialogComponent } from './sites/panel/files/file-explorer/modals/move-dialog/move-dialog.component';
import { UploadDialogComponent } from './sites/panel/files/file-explorer/modals/upload-dialog/upload-dialog.component';
import {FilterPipeModule} from 'ngx-filter-pipe';
import { AccountsComponent } from './sites/panel/accounts/accounts.component';
import {AccountsService} from './sites/panel/accounts/accounts.service';
import { EditAccountComponent } from './sites/panel/accounts/modals/edit-account/edit-account.component';
import { DeleteAccountComponent } from './sites/panel/accounts/modals/delete-account/delete-account.component';
import {OrderModule} from 'ngx-order-pipe';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    RenameDialogComponent,
    AboutComponent,
    LoadingBarComponent,
    MoveDialogComponent,
    UploadDialogComponent,
    AccountsComponent,
    EditAccountComponent,
    DeleteAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    PerfectScrollbarModule,
    FilterPipeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModalModule,
    ReactiveFormsModule,
    ProgressbarModule.forRoot(),
    ScrollToModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    AccountsService,
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    NewFolerDialogComponent,
    UploadDialogComponent,
    RenameDialogComponent,
    MoveDialogComponent,
    DeleteAccountComponent,
    EditAccountComponent
  ]
})
export class AppModule { }
