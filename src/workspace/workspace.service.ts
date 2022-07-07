import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceEntity } from './workspace.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(WorkspaceEntity)
    private workspaceRepository: Repository<WorkspaceEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createWorkspace(
    user: UserEntity,
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceEntity> {
    const newWorkspace = new WorkspaceEntity();
    Object.assign(newWorkspace, createWorkspaceDto);
    newWorkspace.owner = user;

    return this.workspaceRepository.save(newWorkspace);
  }

  async getWorkspaces(userId: number): Promise<WorkspaceEntity[]> {
    const userWithWorkspaces = await this.userRepository.findOne({
      where: { id: userId },
      relations: { workspaces: true },
    });

    return userWithWorkspaces.workspaces;
  }
}
