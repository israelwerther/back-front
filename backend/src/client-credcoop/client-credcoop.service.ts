import { Injectable } from '@nestjs/common';
import { CreateClientCredcoopDto } from './dto/create-client-credcoop.dto';
import { UpdateClientCredcoopDto } from './dto/update-client-credcoop.dto';
import { ClientCredcoopEntity } from './entities/client-credcoop.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientCredcoopService {

  constructor(
    @InjectRepository(ClientCredcoopEntity)
    private readonly createClientCredcoopDto: Repository<ClientCredcoopEntity>
  ) { }

  async createClientCredcoop(createClientCredcoopDto: CreateClientCredcoopDto) {
    return await this.createClientCredcoopDto.save(createClientCredcoopDto);
  }

  findAll() {
    return `This action returns all clientCredcoop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientCredcoop`;
  }

  update(id: number, updateClientCredcoopDto: UpdateClientCredcoopDto) {
    return `This action updates a #${id} clientCredcoop`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientCredcoop`;
  }
}
