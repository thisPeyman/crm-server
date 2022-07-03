import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.usersService.loginUser(loginUserDto);
  }
}
