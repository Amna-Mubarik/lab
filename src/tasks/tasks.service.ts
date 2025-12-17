import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      userId,
    });
    return await this.taskRepository.save(task);
  }

  async findAll(userId: string): Promise<Task[]> {
    return await this.taskRepository.find({ where: { userId } });
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    const task = await this.findOne(id, userId);
    Object.assign(task, updateTaskDto);
    task.updatedAt = new Date();
    return await this.taskRepository.save(task);
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId });
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }
}