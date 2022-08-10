import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Project, ProjectBody } from '../shared/models/project.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private _httpClient: HttpClient) {}

  private _url = environment.apiURL;
  private _projects = new BehaviorSubject<Project[]>([]);
  private _projects$: Observable<Project[]> = this._projects.asObservable();

  private _afterDeleteProject(projectId: number) {
    this.projectsValue = this._projects.value.filter(
      (project) => project.id != projectId
    );
  }

  public getProjects() {
    return this._httpClient.get<Project[]>(this._url + '/projects');
  }

  public postProject(body: ProjectBody) {
    return this._httpClient.post<Project>(this._url + '/projects', body);
  }

  public deleteProject(projectId: number) {
    return this._httpClient
      .delete<Project>(this._url + '/projects/' + projectId)
      .pipe(tap(() => this._afterDeleteProject(projectId)));
  }

  public get projects$() {
    return this._projects$;
  }

  public get projectsValue() {
    return this._projects.value;
  }

  public set projectsValue(projects: Project[]) {
    this._projects.next(projects);
  }
}
