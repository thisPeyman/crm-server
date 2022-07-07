import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceEntity } from './workspace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity])],
  providers: [WorkspaceService],
  controllers: [WorkspaceController],
})
export class WorkspaceModule {}
