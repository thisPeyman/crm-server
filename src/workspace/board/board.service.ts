import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkspaceEntity } from '../workspace.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(WorkspaceEntity)
    private workspaceRepo: Repository<WorkspaceEntity>,
    @InjectRepository(BoardEntity)
    private boardRepo: Repository<BoardEntity>,
  ) {}

  async getAllBoards(workspaceId: number) {
    const workspace = await this.findWorkspaceById(workspaceId, true);
    return workspace.boards;
  }

  async createBoard(createBoardDto: CreateBoardDto, workspaceId: number) {
    const newBoard = new BoardEntity();
    Object.assign(newBoard, createBoardDto);

    const workspace = await this.findWorkspaceById(workspaceId, false);

    newBoard.workspace = workspace;

    return this.boardRepo.save(newBoard);
  }

  async updateBoard(
    updateBoardDto: CreateBoardDto,
    id: number,
  ): Promise<BoardEntity> {
    const board = await this.boardRepo.findOneBy({ id });
    Object.assign(board, updateBoardDto);

    return this.boardRepo.save(board);
  }

  async deleteBoard(id: number) {
    const board = await this.boardRepo.findOneBy({ id });

    if (!board)
      throw new HttpException('board not found', HttpStatus.NOT_FOUND);

    return this.boardRepo.remove(board);
  }

  findWorkspaceById(id: number, selectBoards: boolean) {
    return this.workspaceRepo.findOne({
      where: { id },
      relations: { boards: selectBoards, owner: true },
    });
  }
}
