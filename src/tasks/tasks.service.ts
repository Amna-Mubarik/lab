// src/tasks/tasks.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto, userId: string): Task {
    const task = new Task({
      ...createTaskDto,
      userId,
    });

    this.tasks.push(task);
    return task;
  }

  findAll(userId: string): Task[] {
    return this.tasks.filter(task => task.userId === userId);
  }

  findOne(id: string, userId: string): Task {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }

    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Task {
    const task = this.findOne(id, userId);

    Object.assign(task, {
      ...updateTaskDto,
      updatedAt: new Date(),
    });

    return task;
  }

  remove(id: string, userId: string): void {
    const task = this.findOne(id, userId);
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }
}