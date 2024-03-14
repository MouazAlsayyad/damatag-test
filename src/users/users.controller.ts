import { Controller, Post, Body, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { Login, Register, Users } from 'src/router';
import { ResponseTokenDto } from './dto/response-token.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(Users)
@Controller(Users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private logger = new Logger(UsersController.name);

  @Post(Register)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201 })
  register(@Body() createUserDto: UserDto): Promise<ResponseTokenDto> {
    try {
      return this.usersService.register(createUserDto);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Post(Login)
  @ApiOperation({ summary: 'Login as a user' })
  @ApiResponse({ status: 201 })
  login(@Body() createUserDto: UserDto): Promise<ResponseTokenDto> {
    try {
      return this.usersService.login(createUserDto);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
