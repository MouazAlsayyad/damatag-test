import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    required: false,
    description: 'The title of the task',
    example: 'Complete homework',
  })
  title?: string;

  @ApiProperty({
    required: false,
    description: 'The description of the task',
    example: 'Finish math assignment',
  })
  description?: string;

  @ApiProperty({
    required: false,
    description: 'Indicates if the task is completed',
    default: false,
  })
  completed?: boolean;
}
