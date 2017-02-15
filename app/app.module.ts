import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PairPipe } from './pair.pipe';
import { LoggedInGuard } from './loggedIn.guard';
import { AuthService } from './auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { ProjectComponent, projectChildRoutes } from './project.component';
import { ProjectsComponent } from './projects.component';
import { NewProjectComponent } from './newProject.component';
import { ProjectSummaryComponent } from './projectSummary.component';
import { ConversationComponent } from './conversation.component';

const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: ProjectsComponent, canActivate:[ LoggedInGuard ] },
  { path: 'projects/new', component: NewProjectComponent, canActivate:[ LoggedInGuard ] },
  { path: 'projects/:id', component: ProjectComponent, children:projectChildRoutes, canActivate:[ LoggedInGuard ] }
]

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  declarations: [
    PairPipe,
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProjectComponent,
    ProjectsComponent,
    NewProjectComponent,
    ProjectSummaryComponent,
    ConversationComponent
  ],
  bootstrap: [ AppComponent],
  providers: [ AuthService, LoggedInGuard ]
})
export class AppModule{}
