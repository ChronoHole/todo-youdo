import { Todo } from './todo.entity';
import { CreateTodoDto } from './todo.dto';
import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('projects')
export class TodoController {
  @Inject(TodoService)
  private readonly _service: TodoService;

  @Post('todos')
  public createTodo(@Body() body: CreateTodoDto): Promise<Todo> {
    return this._service.createTodo(body);
  }

  @Patch(':projectid/todos/:todoid')
  public changeTodoStatus(
    @Param('projectid', ParseIntPipe) projectId: number,
    @Param('todoid', ParseIntPipe) todoId: number,
  ): Promise<Todo> {
    return this._service.changeTodoStatus(projectId, todoId);
  }

  @Delete('todos/:id')
  public removeTodo(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this._service.removeTodo(id);
  }
}
