import { hash } from 'bcrypt';
import { WorkspaceEntity } from 'src/workspace/workspace.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => WorkspaceEntity, (workspace) => workspace.owner)
  workspaces: WorkspaceEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
