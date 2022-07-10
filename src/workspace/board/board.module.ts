import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceEntity } from '../workspace.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardEntity } from './entities/board.entity';
import { ClientEntity } from './entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity, ClientEntity, WorkspaceEntity]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
