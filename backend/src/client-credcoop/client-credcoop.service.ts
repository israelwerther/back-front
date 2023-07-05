import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createClientCredcoop(createClientCredcoopDto: CreateClientCredcoopDto): Promise<CreateClientCredcoopDto> {
    return await this.createClientCredcoopDto.save(createClientCredcoopDto);
  }

  async findClientCredcoopById(ClientCredcoopId: number): Promise<ClientCredcoopEntity> {
    const user = await this.createClientCredcoopDto.findOne({
      where: { id: ClientCredcoopId },
    });
    console.log('::: ===============', ClientCredcoopId);
    if (!user) {
      throw new NotFoundException(`User ${ClientCredcoopId} not found`);
    }
    return user;
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
