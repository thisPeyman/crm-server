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
import { UserEntity } from 'src/users/user.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceEntity } from './workspace.entity';
import { WorkspaceService } from './workspace.service';

@UseGuards(AuthGuard)
@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @UsePipes(new ValidationPipe())
  @Post('')
  createWorkspace(
    @User() user: UserEntity,
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceEntity> {
    return this.workspaceService.createWorkspace(user, createWorkspaceDto);
  }

  @Get('')
  getWorkspaces(@User('id') userId: number): Promise<WorkspaceEntity[]> {
    return this.workspaceService.getWorkspaces(userId);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateWorkspace(
    @Param('id') workspaceId: number,
    @Body() updateWorkspaceDto: CreateWorkspaceDto,
    @User('id') userId: number,
  ) {
    return this.workspaceService.updateWorkspace(
      workspaceId,
      userId,
      updateWorkspaceDto,
    );
  }

  @Delete(':id')
  deleteWorkspace(
    @Param('id') workspaceId: number,
    @User('id') userId: number,
  ) {
    return this.workspaceService.deleteWorkspace(workspaceId, userId);
  }
}
