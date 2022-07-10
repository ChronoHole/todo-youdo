import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { TodoService } from './../../services/todo.service';
import { ProjectService } from './../../services/project.service';
import { Project, ProjectBody } from '../../shared/models/project.interface';
import { TodoBody } from '../../shared/models/todo.interface';

interface Category {
  id: number | string;
  title: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _projectService: ProjectService,
    private _todoService: TodoService,
    private _dialogRef: MatDialogRef<DialogComponent>
  ) {}

  projectForm: FormGroup;
  projects$: Observable<Project[]>;
  categories: Category[] = [{ id: 'uid', title: 'Новая категория' }];

  ngOnInit() {
    this.projectForm = this._formBuilder.group({
      categoryId: new FormControl('', Validators.required),
      todoTitle: new FormControl('', Validators.required),
      projectTitle: new FormControl('', Validators.required),
    });
    this.projects$ = this._projectService.projects$;
    this._createCategories();
  }

  private _createCategories() {
    const projects = this._projectService.projectsValue;
    for (let i = 0; i < projects.length; i++) {
      this.categories.push({
        id: projects[i].id,
        title: projects[i].title,
      });
    }
  }

  get categoryId() {
    return this.projectForm.get('categoryId');
  }

  get todoTitle() {
    return this.projectForm.get('todoTitle');
  }

  get projectTitle() {
    return this.projectForm.get('projectTitle');
  }

  makeTodo() {
    const projectId = this.categoryId!.value;
    const body: TodoBody = {
      title: this.todoTitle!.value,
      projectId: projectId,
    };
    const projects = this._projectService.projectsValue;
    this._todoService.postTodo(body).subscribe((todo) => {
      const project = projects.find((project) => project.id === projectId);
      project?.todos.push(todo);
      this._projectService.projectsValue = projects;
    });
    this._dialogRef.close();
  }
  makeProject() {
    const body: ProjectBody = {
      title: this.projectTitle!.value,
      todos: [],
    };
    const projects = this._projectService.projectsValue;
    this._projectService.postProject(body).subscribe((project) => {
      projects.push(project);
      this.projectForm.controls['categoryId'].setValue(project.id);
      this.makeTodo();
    });
  }
}
