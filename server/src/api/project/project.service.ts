import { CreateProjectDto } from './project.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly _projectRepository: Repository<Project>;

  public getAllProjects(): Promise<Project[]> {
    return this._projectRepository.find({
      relations: ['todos'],
    });
  }

  async getOneById(id: number): Promise<Project> {
    const project = await this._projectRepository.findOneBy({
      id: id,
    });
    return project;
  }

  async createProject(body: CreateProjectDto): Promise<Project> {
    const project: Project = new Project();
    project.title = body.title;
    project.todos = [];
    return this._projectRepository.save(project);
  }

  async removeProject(id: number): Promise<Project> {
    const project = await this.getOneById(id);
    return this._projectRepository.remove(project);
  }
}
