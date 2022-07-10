import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/users/decorators/user.decorator';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { WorkspaceGuard } from '../guards/workspace.guard';
import { WorkspaceEntity } from '../workspace.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './entities/board.entity';

const WORKSPACE_ID = 'workspaceId';

@UseGuards(AuthGuard, WorkspaceGuard)
@Controller(`workspace/:${WORKSPACE_ID}/board`)
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('')
  getAllBoards(
    @Param(WORKSPACE_ID) workspaceId: number,
  ): Promise<BoardEntity[]> {
    return this.boardService.getAllBoards(workspaceId);
  }

  @UsePipes(new ValidationPipe())
  @Post('')
  createNewBord(
    @Param(WORKSPACE_ID) workspaceId: number,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<BoardEntity> {
    return this.boardService.createBoard(createBoardDto, workspaceId);
  }

  @UsePipes(new ValidationPipe())
  @Put(':boardId')
  updateBord(
    @Param('boardId') boardId: number,
    @Body() updateBoardDto: CreateBoardDto,
  ): Promise<BoardEntity> {
    return this.boardService.updateBoard(updateBoardDto, boardId);
  }

  @Delete(':boardId')
  deleteBoard(@Param('boardId') boardId: number) {
    return this.boardService.deleteBoard(boardId);
  }

  // @Post('')
  // makeNewBoard() {
  //   this.boardService.makeNewBoard();
  // }

  // @Put()
}
