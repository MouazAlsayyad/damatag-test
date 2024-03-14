import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ResponseTaskDto {
  @ApiProperty({ type: String, description: 'The ID of the task' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'The title of the task' })
  @IsString()
  title: string;

  @ApiProperty({ type: String, description: 'The description of the task' })
  @IsString()
  description: string;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the task is completed',
  })
  @IsBoolean()
  completed: boolean;

  @ApiProperty({
    type: Date,
    description: 'The date when the task was last updated',
  })
  updatedAt?: Date;

  @ApiProperty({
    type: Date,
    description: 'The date when the task was created',
  })
  createdAt?: Date;
}
