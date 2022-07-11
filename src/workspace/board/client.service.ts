import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { BoardEntity } from './entities/board.entity';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepo: Repository<BoardEntity>,
    @InjectRepository(ClientEntity)
    private clientRepo: Repository<ClientEntity>,
  ) {}

  async addClientToBoard(
    boardId: number,
    createClientDto: CreateClientDto,
  ): Promise<ClientEntity> {
    const newClient = new ClientEntity();
    Object.assign(newClient, createClientDto);

    const board = await this.boardRepo.findOneBy({
      id: boardId,
    });
    newClient.board = board;

    // TODO: board entity should not be eager so it won't pass the clients array on it
    const savedClient = await this.clientRepo.save(newClient);
    delete savedClient.board.clients;
    return savedClient;
  }

  async updateClient(clientId: number, updateClientDto: CreateClientDto) {
    const client = await this.clientRepo.findOneBy({ id: clientId });

    if (!client)
      throw new HttpException('client not found', HttpStatus.NOT_FOUND);

    Object.assign(client, updateClientDto);
    return this.clientRepo.save(client);
  }

  async deleteClient(clientId: number) {
    const client = await this.clientRepo.findOneBy({ id: clientId });

    return this.clientRepo.remove(client);
  }
}
