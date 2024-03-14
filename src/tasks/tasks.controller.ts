import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { ParseMongoIdPipe } from 'src/mongo/pipes/parse-mongo-id.pipe';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Tasks } from 'src/router';
import { ResponseTaskDto } from './dto/response-task.dto';

@ApiTags(Tasks)
@Controller(Tasks)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  private logger = new Logger(TasksController.name);

  @UseGuards(AuthGuard())
  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiBody({ type: CreateTaskDto })
  create(
    @Req() req,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ResponseTaskDto> {
    try {
      return this.tasksService.createTask(createTaskDto, req.user);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @UseGuards(AuthGuard())
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks',
  })
  findAll(@Req() req): Promise<ResponseTaskDto[]> {
    try {
      return this.tasksService.findAllTask(req.user);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task details',
  })
  findOne(
    @Req() req,
    @Param('id', new ParseMongoIdPipe()) id: string,
  ): Promise<ResponseTaskDto> {
    try {
      return this.tasksService.findTaskById(id, req.user);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @UseGuards(AuthGuard())
  @Put(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ type: UpdateTaskDto })
  update(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req,
  ): Promise<ResponseTaskDto> {
    try {
      return this.tasksService.updateTaskById(id, updateTaskDto, req.user);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  remove(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Req() req,
  ): Promise<ResponseTaskDto> {
    try {
      return this.tasksService.removeTaskById(id, req.user);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
