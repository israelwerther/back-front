import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientCredcoopDto } from './dto/create-client-credcoop.dto';
import { UpdateClientCredcoopDto } from './dto/update-client-credcoop.dto';
import { ClientCredcoopEntity } from './entities/client-credcoop.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination, IPaginationOptions, } from 'nestjs-typeorm-paginate';
import { ReturnClientCredcoopDto } from './dto/return-client-credcoop.dto';

@Injectable()
export class ClientCredcoopService {
  constructor(
    @InjectRepository(ClientCredcoopEntity)
    private readonly createClientCredcoopDto: Repository<ClientCredcoopEntity>,
  ) { }

  async createClientCredcoop(createClientCredcoopDto: CreateClientCredcoopDto): Promise<ClientCredcoopEntity> {
    return await this.createClientCredcoopDto.save(createClientCredcoopDto);
  }

  async getAllClientCredcoop(
    options: IPaginationOptions & { name?: string }
  ): Promise<Pagination<ReturnClientCredcoopDto>> {
    const queryBuilder = this.createClientCredcoopDto.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.clientName', 'c.cpf']).orderBy('c.clientName', 'ASC');

    if (options.name) {
      queryBuilder.where('c.clientName LIKE :name', { name: `%${options.name}%` });
    }

    return paginate<ReturnClientCredcoopDto>(queryBuilder, options);
  }

  async findClientCredcoopById(ClientCredcoopId: number): Promise<ClientCredcoopEntity> {
    const user = await this.createClientCredcoopDto.findOne({
      where: { id: ClientCredcoopId },
    });

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

  async deleteClientCredcoop(ClientCredcoopId: number): Promise<void> {
    const clientCredcoop = await this.createClientCredcoopDto.findOne({
      where: { id: ClientCredcoopId },
    });
    if (!clientCredcoop) {
      throw new NotFoundException(`ClientCredcoop ${ClientCredcoopId} not found`);
    }
    await this.createClientCredcoopDto.remove(clientCredcoop);
  }
}
