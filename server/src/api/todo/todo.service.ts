import { CreateTodoDto } from './todo.dto';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { ProjectService } from '../project/project.service';

@Injectable()
export class TodoService {
  @Inject(ProjectService)
  private readonly _projectService: ProjectService;

  @InjectRepository(Todo)
  private readonly _todoRepository: Repository<Todo>;

  async getOneById(id: number): Promise<Todo> {
    const todo = await this._todoRepository.findOneBy({
      id: id,
    });
    return todo;
  }

  async createTodo(body: CreateTodoDto): Promise<Todo> {
    const todo: Todo = new Todo();
    const project = await this._projectService.getOneById(body.projectId);
    todo.title = body.title;
    todo.project = project;
    return this._todoRepository.save(todo);
  }

  async changeTodoStatus(projectId: number, todoId: number): Promise<Todo> {
    const todo = await this._todoRepository.findOne({
      where: {
        id: todoId,
        project: {
          id: projectId,
        },
      },
    });
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      await this._todoRepository.save(todo);
    }
    return todo;
  }

  async removeTodo(id: number): Promise<Todo> {
    const todo = await this.getOneById(id);
    return this._todoRepository.remove(todo);
  }
}
