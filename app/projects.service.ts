import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Project } from './project';


@Injectable()
export class ProjectsService {
  constructor(private http: Http){}
  extractData(res: Response){
    return res.json();
  }

  getUsers(): Observable<any[]>{
    return this.http.get('/api/users').map(this.extractData);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get('/api/projects').map(this.extractData);
  }
}
