import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async updateWorkspace(
    workspaceId: number,
    userId: number,
    updateWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceEntity> {
    const workspace = await this.findById(workspaceId);

    if (workspace.owner.id !== userId)
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);

    Object.assign(workspace, updateWorkspaceDto);
    return this.workspaceRepository.save(workspace);
  }

  async deleteWorkspace(workspaceId: number, userId: number) {
    const workspace = await this.findById(workspaceId);

    if (workspace.owner.id !== userId)
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);

    return this.workspaceRepository.remove(workspace);
  }

  private async findById(id: number) {
    return this.workspaceRepository.findOne({
      where: { id },
      relations: { owner: true },
    });
  }
}
