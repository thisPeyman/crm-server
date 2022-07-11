import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardEntity } from './board.entity';

@Entity({ name: 'clients' })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => BoardEntity, (project) => project.clients)
  board: BoardEntity;
}
