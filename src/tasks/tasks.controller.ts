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

  @UseGuards(AuthGuard())
  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiBody({ type: CreateTaskDto })
  create(
    @Req() req,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ResponseTaskDto> {
    return this.tasksService.createTask(createTaskDto, req.user);
  }

  @UseGuards(AuthGuard())
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks',
  })
  findAll(@Req() req): Promise<ResponseTaskDto[]> {
    return this.tasksService.findAllTask(req.user);
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
    return this.tasksService.findTaskById(id, req.user);
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
    return this.tasksService.updateTaskById(id, updateTaskDto, req.user);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  remove(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Req() req,
  ): Promise<ResponseTaskDto> {
    return this.tasksService.removeTaskById(id, req.user);
  }
}
