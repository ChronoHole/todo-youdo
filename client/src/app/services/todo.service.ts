import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProjectService } from './project.service';
import { TodoBody, Todo } from '../shared/models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(
    private _httpClient: HttpClient,
    private _projectService: ProjectService
  ) {}

  private _url = environment.apiURL;

  public postTodo(body: TodoBody) {
    return this._httpClient.post<Todo>(this._url + '/projects/todos', body);
  }

  public patchTodo(projectId: number, todoId: number) {
    return this._httpClient
      .patch(this._url + '/projects/' + projectId + '/todos/' + todoId, '')
      .pipe(tap(() => this._afterPatchTodo(projectId, todoId)));
  }

  public deleteTodo(todoId: number) {
    return this._httpClient
      .delete<Todo>(this._url + '/projects/todos/' + todoId)
      .pipe(tap(() => this._afterDeleteTodo(todoId)));
  }

  private _afterDeleteTodo(todoId: number) {
    const projects = this._projectService.projectsValue.map((project) => ({
      ...project,
      todos: project.todos.filter((todo) => todo.id != todoId),
    }));
    this._projectService.projectsValue = projects;
  }

  private _afterPatchTodo(projectId: number, todoId: number) {
    const projects = this._projectService.projectsValue.map((project) => {
      if (project.id == projectId) {
        return {
          ...project,
          todos: project.todos.map((todo) => {
            if (todo.id == todoId) {
              return { ...todo, isCompleted: !todo.isCompleted };
            }
            return { ...todo };
          }),
        };
      }
      return { ...project };
    });
    this._projectService.projectsValue = projects;
  }
}
