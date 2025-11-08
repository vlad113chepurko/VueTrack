export interface Task {
  ID: number;
  TaskName: string;
  TaskAuthor: string;
  TaskStatus: string;
  TaskDeadline: any;
  ProjectID: number;
}

export interface Project {
  ID: number;
  ProjectName: string;
  ProjectDescription: string;
  TaskCounter: number;
  Status: string;
  CreateAt: string;
  Tasks: Task[];
}
