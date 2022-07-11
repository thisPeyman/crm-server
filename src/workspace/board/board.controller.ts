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
import { AuthGuard } from 'src/users/guards/auth.guard';
import { WorkspaceGuard } from '../guards/workspace.guard';
import { BoardService } from './board.service';
import { ClientService } from './client.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { BoardEntity } from './entities/board.entity';
import { ClientEntity } from './entities/client.entity';

const WORKSPACE_ID = 'workspaceId';

@UseGuards(AuthGuard, WorkspaceGuard)
@Controller(`workspace/:${WORKSPACE_ID}/board`)
export class BoardController {
  constructor(
    private boardService: BoardService,
    private clientService: ClientService,
  ) {}

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
  updateBoard(
    @Param('boardId') boardId: number,
    @Body() updateBoardDto: CreateBoardDto,
  ): Promise<BoardEntity> {
    return this.boardService.updateBoard(updateBoardDto, boardId);
  }

  @Delete(':boardId')
  deleteBoard(@Param('boardId') boardId: number) {
    return this.boardService.deleteBoard(boardId);
  }

  @UsePipes(new ValidationPipe())
  @Post(':boardId/client')
  addClientToBoard(
    @Param('boardId') boardId: number,
    @Body() createClientDto: CreateClientDto,
  ): Promise<ClientEntity> {
    return this.clientService.addClientToBoard(boardId, createClientDto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':boardId/client/:clientId')
  updateClient(
    @Param('clientId') clientId: number,
    @Body() updateClientDto: CreateClientDto,
  ): Promise<ClientEntity> {
    return this.clientService.updateClient(clientId, updateClientDto);
  }

  @Delete(':boardId/client/:clientId')
  deleteClient(@Param('clientId') clientId: number) {
    return this.clientService.deleteClient(clientId);
  }

  // updateClientInfo() {}

  // removeClientFromBoard() {}
}
