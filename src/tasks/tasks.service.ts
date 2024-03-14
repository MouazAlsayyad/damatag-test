import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';

import { ResponseTaskDto } from './dto/response-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}
  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<ResponseTaskDto> {
    const data = { ...createTaskDto, user: user._id };
    const newTask = await this.taskModel.create(data);
    return newTask.toObject() as ResponseTaskDto;
  }

  findAllTask(user: User): Promise<ResponseTaskDto[]> {
    return this.taskModel.find({ user });
  }

  async findTaskById(id: string, user: User): Promise<ResponseTaskDto> {
    return this.findByIdAndVerifyOwnership(id, user);
  }

  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<ResponseTaskDto> {
    await this.findByIdAndVerifyOwnership(id, user);
    return await this.taskModel.findByIdAndUpdate(id, updateTaskDto);
  }

  async removeTaskById(id: string, user: User): Promise<ResponseTaskDto> {
    await this.findByIdAndVerifyOwnership(id, user);
    return await this.taskModel.findByIdAndDelete(id);
  }

  private async findByIdAndVerifyOwnership(
    id: string,
    user: User,
  ): Promise<ResponseTaskDto> {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException(`task with id ${id} not found.`);
    if (String(task.user) !== String(user.id)) throw new ForbiddenException();

    return task;
  }
}
