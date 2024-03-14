import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseTokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
