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
import { AuthService} from './auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TokenInterceptor} from './auth/iterceptors/token.interceptor';
import { ErrorInterceptor} from './auth/iterceptors/error.interceptor';
import { AuthGuard} from './auth/guards/auth-guard.service';
import { ToastrModule} from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PanelComponent } from './sites/panel/panel.component';
import { FilesComponent } from './sites/panel/files/files.component';
import { ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import { AboutComponent } from './sites/about/about.component';
import { LoadingBarComponent } from './shared/components/loader/loading-bar/loading-bar.component';
import { LoaderService} from './shared/components/loader/loader.service';
import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { FilterPipeModule} from 'ngx-filter-pipe';
import { AccountsComponent } from './sites/panel/accounts/accounts.component';
import { AccountsService} from './sites/panel/accounts/accounts.service';
import { EditAccountComponent } from './sites/panel/accounts/modals/edit-account/edit-account.component';
import { DeleteAccountComponent } from './sites/panel/accounts/modals/delete-account/delete-account.component';
import { OrderModule} from 'ngx-order-pipe';
import { ScrollEventModule } from 'ngx-scroll-event';
import { ScrollService } from './shared/services/scroll.service';
import { OrganisationComponent } from './sites/organisation/organisation.component';
import { StudyPlanComponent } from './sites/study-plan/study-plan.component';
import { ProgramsComponent } from './sites/programs/programs.component';
import { RecruitmentComponent } from './sites/recruitment/recruitment.component';
import { ContactComponent } from './sites/contact/contact.component';
import { ProgramowanieObiektoweComponent } from './sites/programs/programowanie-obiektowe/programowanie-obiektowe.component';
import { TechnologieSieciWebComponent } from './sites/programs/technologie-sieci-web/technologie-sieci-web.component';
import { ProjektowanieBazDanychComponent } from './sites/programs/projektowanie-baz-danych/projektowanie-baz-danych.component';
import { SystemyRozproszoneComponent } from './sites/programs/systemy-rozproszone/systemy-rozproszone.component';
import { ProgramowanieWJezykuJavaComponent } from './sites/programs/programowanie-w-jezyku-java/programowanie-w-jezyku-java.component';
import { SieciKomputeroweComponent } from './sites/programs/sieci-komputerowe/sieci-komputerowe.component';
import { AplikacjeBazodanoweComponent } from './sites/programs/aplikacje-bazodanowe/aplikacje-bazodanowe.component';
import { PrzedmiotObieralnyComponent } from './sites/programs/przedmiot-obieralny/przedmiot-obieralny.component';
import { GrafikaKomputerowaComponent } from './sites/programs/grafika-komputerowa/grafika-komputerowa.component';
import { SztucznaInteligencjaComponent } from './sites/programs/sztuczna-inteligencja/sztuczna-inteligencja.component';
import { DefaultComponent } from './sites/programs/default/default.component';
import { AgmCoreModule } from '@agm/core';
import { UserComponent } from './sites/panel/user/user.component';
import { FaqComponent } from './sites/faq/faq.component';
import { FooterBannerComponent } from './shared/components/footer-banner/footer-banner.component';
import { FileExplorerComponent } from './sites/panel/shared/files-manager/file-explorer/file-explorer.component';
import { NewFolerDialogComponent } from './sites/panel/shared/files-manager/file-explorer/modals/new-foler-dialog/new-foler-dialog.component';
import { RenameDialogComponent } from './sites/panel/shared/files-manager/file-explorer/modals/rename-dialog/rename-dialog.component';
import { MoveDialogComponent } from './sites/panel/shared/files-manager/file-explorer/modals/move-dialog/move-dialog.component';
import { UploadDialogComponent } from './sites/panel/shared/files-manager/file-explorer/modals/upload-dialog/upload-dialog.component';
import { ProgramowanieSystemowEkspertowychComponent } from './sites/programs/programowanie-systemow-ekspertowych/programowanie-systemow-ekspertowych.component';
import { TechnologieProgramistyczneUslugInternetowychComponent } from './sites/programs/technologie-programistyczne-uslug-internetowych/technologie-programistyczne-uslug-internetowych.component';
import { FilesManagerComponent } from './sites/panel/shared/files-manager/files-manager.component';
import { CommonModule } from '@angular/common';
import { NewsService } from './shared/services/news.service';
import { NewsComponent } from './sites/news/news.component';
import { NewsManagementComponent } from './sites/panel/news-management/news-management.component';

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
    OrganisationComponent,
    StudyPlanComponent,
    ProgramsComponent,
    RecruitmentComponent,
    ContactComponent,
    ProgramowanieObiektoweComponent,
    TechnologieSieciWebComponent,
    ProjektowanieBazDanychComponent,
    SystemyRozproszoneComponent,
    ProgramowanieWJezykuJavaComponent,
    SieciKomputeroweComponent,
    AplikacjeBazodanoweComponent,
    PrzedmiotObieralnyComponent,
    GrafikaKomputerowaComponent,
    ProgramowanieSystemowEkspertowychComponent,
    SztucznaInteligencjaComponent,
    TechnologieProgramistyczneUslugInternetowychComponent,
    DefaultComponent,
    UserComponent,
    FaqComponent,
    FooterBannerComponent,
    FilesManagerComponent,
    NewsComponent,
    NewsManagementComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ScrollEventModule,
    OrderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC6QJjy5nD9J6rtXNAM399hBPbSPFjQ-QA'
    }),
    FilterPipeModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ScrollService,
    NewsService
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
