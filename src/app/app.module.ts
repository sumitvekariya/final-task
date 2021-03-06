import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { GroupComponent } from './group/group.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GroupEditComponent } from './group/group-edit/group-edit.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';
import { GroupItemComponent } from './group/group-list/group-item/group-item.component';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamEditComponent } from './team/team-edit/team-edit.component';
import { TeamDetailComponent } from './team/team-detail/team-detail.component';
import { TeamItemComponent } from './team/team-list/team-item/team-item.component';
import { DropdownDirective } from './dropdown.directive';
import { MemberComponent } from './member/member.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberItemComponent } from './member/member-list/member-item/member-item.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { GroupService } from './group/group.service';
import { MemberService } from './member/member.service';
import { TeamService } from './team/team.service';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import swal from 'sweetalert2';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { DatatableComponent } from './datatable/datatable.component';
import { TranslateDirective, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appRoutes: Routes = [
  { path: '', redirectTo: '/group', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'datatable', component: DatatableComponent },
  { path: 'login', component: LoginComponent },
  { path: 'group', component: GroupComponent, children: [
    { path: 'new', component: GroupEditComponent },
    { path: ':id', component: GroupDetailComponent },
    { path: ':id/edit', component: GroupEditComponent },
  ] },
  {
    path: 'team', component: TeamComponent, children: [
      { path: 'new', component: TeamEditComponent },
      { path: ':id', component: TeamDetailComponent },
      { path: ':id/edit', component: TeamEditComponent },
    ]
  },
  {
    path: 'member', component: MemberComponent, children: [
      { path: 'new', component: MemberEditComponent },
      { path: ':id', component: MemberDetailComponent },
      { path: ':id/edit', component: MemberEditComponent },
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    GroupEditComponent,
    GroupListComponent,
    GroupDetailComponent,
    GroupItemComponent,
    TeamComponent,
    TeamListComponent,
    TeamItemComponent,
    TeamEditComponent,
    TeamDetailComponent,
    DropdownDirective,
    MemberComponent,
    MemberListComponent,
    MemberItemComponent,
    MemberDetailComponent,
    MemberEditComponent,
    SignupComponent,
    LoginComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    SlimLoadingBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GroupService, TeamService, MemberService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
