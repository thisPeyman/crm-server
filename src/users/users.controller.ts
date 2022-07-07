import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IExpressRequest } from 'src/types/express-request.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { IUserResponse } from './types/user-response.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.usersService.createUser(createUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<IUserResponse> {
    const user = await this.usersService.loginUser(loginUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @UseGuards(AuthGuard)
  @Get('')
  getUser(@Request() req: IExpressRequest) {
    return req.user;
  }
}
