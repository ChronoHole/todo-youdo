import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ProjectService } from '../../services/project.service';
import { Todo } from '../../shared/models/todo.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements DoCheck {
  constructor(
    private _projectService: ProjectService,
    private _todoService: TodoService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngDoCheck() {
    this._changeDetectorRef.detectChanges();
  }

  @Input() projectId: number;
  @Input() title: string;
  @Input() todos: Todo[];

  removeProject(projectId: number) {
    this._projectService.deleteProject(projectId).subscribe();
  }

  removeTodo(todoId: number) {
    this._todoService.deleteTodo(todoId).subscribe();
  }

  updateTodo(projectId: number, todoId: number) {
    this._todoService.patchTodo(projectId, todoId).subscribe();
  }
}
