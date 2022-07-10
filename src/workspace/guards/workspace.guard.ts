import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { IExpressRequest } from 'src/types/express-request.interface';
import { BoardService } from '../board/board.service';

@Injectable()
export class WorkspaceGuard implements CanActivate {
  constructor(private boardService: BoardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<IExpressRequest>();
    const userId = req.user.id;

    const workspaceId: number = +req.params.workspaceId;

    const workspace = await this.boardService.findWorkspaceById(
      workspaceId,
      false,
    );

    if (workspace.owner.id === userId) return true;

    throw new HttpException('Workspace not found', HttpStatus.NOT_FOUND);
  }
}
