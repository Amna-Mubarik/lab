// src/tasks/entities/task.entity.ts
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
    this.id = partial.id || Date.now().toString() + Math.random().toString(36).substr(2, 9);
    this.status = partial.status || TaskStatus.TODO;
    this.createdAt = partial.createdAt || new Date();
    this.updatedAt = partial.updatedAt || new Date();
  }
}