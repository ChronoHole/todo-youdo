export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface TodoBody {
  projectId: number;
  title: string;
}
