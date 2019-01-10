import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './sites/home/home.component';
import {PageNotFoundComponent} from './sites/page-not-found/page-not-found.component';
import {LoginComponent} from './auth/login/login.component';
import {AccountComponent} from './sites/panel/account/account.component';
import {AuthGuard} from './auth/guards/auth-guard.service';
import {PanelComponent} from './sites/panel/panel.component';
import {FilesComponent} from './sites/panel/files/files.component';
import {AboutComponent} from './sites/about/about.component';
import {AccountsComponent} from './sites/panel/accounts/accounts.component';
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
import { ProgramowanieSystemowEkspertowychComponent } from './sites/programs/programowanie-systemow-ekspertowych/programowanie-systemow-ekspertowych.component';
import { SztucznaInteligencjaComponent } from './sites/programs/sztuczna-inteligencja/sztuczna-inteligencja.component';
import { TechnologieProgramistyczneUslugInternetowychComponent } from './sites/programs/technologie-programistyczne-uslug-internetowych/technologie-programistyczne-uslug-internetowych.component';
import { DefaultComponent } from './sites/programs/default/default.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'o-studiach', component: AboutComponent},
  {path: 'organizacja', component: OrganisationComponent},
  {path: 'plan-studiow', component: StudyPlanComponent},
  {path: 'programy', component: ProgramsComponent, children: [
    {path: '', redirectTo: 'lista', pathMatch: 'full'},
    {path: 'lista', component: DefaultComponent},
    {path: 'programowanie-obiektowe', component: ProgramowanieObiektoweComponent},
    {path: 'technologie-sieci-web', component: TechnologieSieciWebComponent},
    {path: 'projektowanie-baz-danych', component: ProjektowanieBazDanychComponent},
    {path: 'systemy-rozproszone', component: SystemyRozproszoneComponent},
    {path: 'programowanie-w-jezyku-java', component: ProgramowanieWJezykuJavaComponent},
    {path: 'sieci-komputerowe', component: SieciKomputeroweComponent},
    {path: 'aplikacje-bazodanowe', component: AplikacjeBazodanoweComponent},
    {path: 'przedmiot-obieralny', component: PrzedmiotObieralnyComponent},
    {path: 'grafika-komputerowa', component: GrafikaKomputerowaComponent},
    {path: 'programowanie-systemow-ekspertowych', component: ProgramowanieSystemowEkspertowychComponent},
    {path: 'sztuczna-inteligencja', component: SztucznaInteligencjaComponent},
    {path: 'technologie-programistyczne-uslug-internetowych', component: TechnologieProgramistyczneUslugInternetowychComponent}
  ]},
  {path: 'rekrutacja', component: RecruitmentComponent},
  {path: 'kontakt', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'panel', component: PanelComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'files', pathMatch: 'full' },
      {path: 'files', component: FilesComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'account', component: AccountComponent}
    ]},
  {path: '**', component: PageNotFoundComponent} // musi być ostatnie
];

// , canActivate: [AuthGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
