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
    private readonly createClientRepository: Repository<ClientCredcoopEntity>,
  ) { }

  async createClientCredcoop(createClientCredcoopDto: CreateClientCredcoopDto): Promise<ClientCredcoopEntity> {
    return await this.createClientRepository.save(createClientCredcoopDto);
  }

  async getAllClientCredcoop(
    options: IPaginationOptions & { clientName?: string }
  ): Promise<Pagination<ReturnClientCredcoopDto>> {
    const queryBuilder = this.createClientRepository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.clientName', 'c.cpf']).orderBy('c.clientName', 'ASC');

    if (options.clientName) {
      queryBuilder.where('c.clientName ILIKE :clientName', { clientName: `%${options.clientName}%` });
    }

    return paginate<ReturnClientCredcoopDto>(queryBuilder, options);
  }

  async findClientCredcoopById(ClientCredcoopId: number): Promise<ClientCredcoopEntity> {
    const user = await this.createClientRepository.findOne({
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

  async findOne(id: number): Promise<ClientCredcoopEntity> {
    return await this.createClientRepository.findOne({
      where: {
        id: id,
      },
      relations: ['clientAddresses']
    });
  }

  async editClient(id: number, updatedData: ReturnClientCredcoopDto): Promise<ClientCredcoopEntity> {
    const existingClient = await this.createClientRepository.findOne({
      where: {
        id: id,
      },
      relations: ['clientAddresses']
    });

    if (!existingClient) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    Object.assign(existingClient, updatedData); ReturnClientCredcoopDto
    return this.createClientRepository.save(existingClient);
  }

  async deleteClientCredcoop(ClientCredcoopId: number): Promise<void> {
    const clientCredcoop = await this.createClientRepository.findOne({
      where: { id: ClientCredcoopId },
    });
    if (!clientCredcoop) {
      throw new NotFoundException(`ClientCredcoop ${ClientCredcoopId} not found`);
    }
    await this.createClientRepository.remove(clientCredcoop);
  }
}
