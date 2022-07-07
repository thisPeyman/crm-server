import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/constants';
import { IExpressRequest } from 'src/types/express-request.interface';
import { UserEntity } from '../user.entity';
import { UsersService } from '../users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: IExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode = verify(token, JWT_SECRET) as UserEntity;
      const user = await this.usersService.findById(decode.id);
      req.user = user;
      next();
    } catch (e) {
      next();
    }
  }
}
