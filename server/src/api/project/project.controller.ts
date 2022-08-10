import { CreateProjectDto } from './project.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectController {
  @Inject(ProjectService)
  private readonly _service: ProjectService;

  @Get()
  public getAllProjects(): Promise<Project[]> {
    return this._service.getAllProjects();
  }

  @Post()
  public createProject(@Body() body: CreateProjectDto): Promise<Project> {
    return this._service.createProject(body);
  }

  @Delete(':id')
  public removeProject(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Project> {
    return this._service.removeProject(id);
  }
}
