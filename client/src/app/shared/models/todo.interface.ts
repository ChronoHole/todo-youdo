import { Project } from './project.interface';

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  project?: Project;
}

export interface TodoBody {
  projectId: number;
  projectTitle: string;
  title: string;
}
