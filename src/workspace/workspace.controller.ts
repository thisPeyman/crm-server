import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/users/decorators/user.decorator';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { UserEntity } from 'src/users/user.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceService } from './workspace.service';

@UseGuards(AuthGuard)
@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  createWorkspace(
    @User() user: UserEntity,
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ) {
    return this.workspaceService.createWorkspace(user, createWorkspaceDto);
  }
}
