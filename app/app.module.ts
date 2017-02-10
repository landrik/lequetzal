import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { PairPipe } from './pair.pipe';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects.component';
import { ProjectSummaryComponent } from './projectSummary.component'

const routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full'},
  { path: 'projects', component: ProjectsComponent }
]

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  declarations: [
    PairPipe,
    AppComponent,
    ProjectsComponent,
    ProjectSummaryComponent
  ],
  bootstrap: [ AppComponent]
})
export class AppModule{}
