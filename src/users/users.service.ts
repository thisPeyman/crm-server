import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const exception = await this.checkCredentials(createUserDto);
    if (exception) throw exception;
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    return this.userRepository.save(newUser);
  }

  async loginUser({ email, password }: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, id: true, password: true, username: true },
    });

    if (!user) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;
    return user;
  }

  private async checkCredentials({
    username,
    email,
  }: CreateUserDto): Promise<HttpException> {
    const userByUsername = await this.userRepository.findOneBy({ username });
    const userByEmail = await this.userRepository.findOneBy({ email });

    if (userByEmail || userByUsername) {
      console.log(userByUsername, userByEmail);
      return new HttpException(
        'Username or Email are already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
