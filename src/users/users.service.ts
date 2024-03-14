import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { ResponseTokenDto } from './dto/response-token.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register({ username, password }: UserDto): Promise<ResponseTokenDto> {
    const userExists = await this.userModel.findOne({ username });
    if (userExists)
      throw new BadRequestException(
        `This username ${username} is already registered`,
      );

    const newUser = new this.userModel({
      username,
      password: await bcryptjs.hash(password, 12),
    });
    const user = await newUser.save();

    return { token: await this.generateToken(user.id) };
  }

  async login({ username, password }: UserDto): Promise<ResponseTokenDto> {
    const user = await this.userModel.findOne({ username });

    if (!user || !(await bcryptjs.compare(password, user.password)))
      throw new BadRequestException('Invalid credentials');

    return { token: await this.generateToken(user.id) };
  }

  private async generateToken(userId: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      { id: userId },
      { secret: this.configService.get<string>('JSON_TOKEN_KEY') },
    );
    return token;
  }
}
