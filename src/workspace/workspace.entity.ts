import { UserEntity } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'workspaces' })
export class WorkspaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.workspaces)
  owner: UserEntity;
}
