import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceEntity } from './workspace.entity';
import { UserEntity } from 'src/users/user.entity';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkspaceEntity, UserEntity]),
    BoardModule,
  ],
  providers: [WorkspaceService],
  controllers: [WorkspaceController],
})
export class WorkspaceModule {}
