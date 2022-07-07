import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IExpressRequest } from 'src/types/express-request.interface';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<IExpressRequest>();

  if (!req.user) return null;

  if (data) return req.user[data];

  return req.user;
});
