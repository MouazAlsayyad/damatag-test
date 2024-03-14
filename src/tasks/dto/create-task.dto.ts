import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Complete homework',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Finish math assignment',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Indicates if the task is completed',
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
