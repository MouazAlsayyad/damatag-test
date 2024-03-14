import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { Login, Register, Users } from 'src/router';
import { ResponseTokenDto } from './dto/response-token.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(Users)
@Controller(Users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(Register)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201 })
  register(@Body() createUserDto: UserDto): Promise<ResponseTokenDto> {
    return this.usersService.register(createUserDto);
  }

  @Post(Login)
  @ApiOperation({ summary: 'Login as a user' })
  @ApiResponse({ status: 201 })
  login(@Body() createUserDto: UserDto): Promise<ResponseTokenDto> {
    return this.usersService.login(createUserDto);
  }
}
