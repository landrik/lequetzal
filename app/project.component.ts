import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProjectsService } from './projects.service';
import { AuthService } from './auth.service';
import { Project } from './project';

import { ConversationComponent } from './conversation.component';

export const projectChildRoutes = [
  { path: '', component: ProjectComponent },
  { path: 'conversations/:conv_id', component: ConversationComponent }
];

@Component({
  selector: 'project',
  templateUrl: 'app/templates/project.component.html',
  providers: [ ProjectsService ]
})

export class ProjectComponent implements OnInit {
  project: Project;
  canWork: boolean = false;

  constructor (private auth: AuthService,
               private route: ActivatedRoute,
               private service: ProjectsService){}

  ngOnInit() {
    this.route.params
        .map((params: Params) => params['id'])
        .flatMap(id => this.service.getProject(id))
        .subscribe((project: Project) => {
          this.project = project;

          this.auth.currentUser.subscribe(user => {
            this.canWork = project.users.indexOf(user.username) > -1;
          });
        });
  }




}
