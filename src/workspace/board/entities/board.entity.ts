import { WorkspaceEntity } from 'src/workspace/workspace.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ClientEntity, (client) => client.board)
  clients: ClientEntity[];

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.boards)
  workspace: WorkspaceEntity;
}
