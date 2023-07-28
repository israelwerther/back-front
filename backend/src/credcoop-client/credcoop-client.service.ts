import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredcoopClientDto } from './dto/create-credcoop-client.dto';
import { UpdateClientCredcoopDto } from './dto/update-credcoop-client.dto';
import { CredcoopClientEntity } from './entities/credcoop-client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination, IPaginationOptions, } from 'nestjs-typeorm-paginate';
import { ReturnClientCredcoopDto } from './dto/return-credcoop-client.dto';

@Injectable()
export class CredcoopClientService {
  constructor(
    @InjectRepository(CredcoopClientEntity)
    private readonly clientCredcoopRepository: Repository<CredcoopClientEntity>,
  ) { }

  async createCredcoopClient(createClientCredcoopDto: CreateCredcoopClientDto): Promise<CredcoopClientEntity> {
    return await this.clientCredcoopRepository.save(createClientCredcoopDto);
  }

  async getAllClientCredcoop(
    options: IPaginationOptions & { clientName?: string }
  ): Promise<Pagination<ReturnClientCredcoopDto>> {
    const queryBuilder = this.clientCredcoopRepository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.clientName', 'c.cpf']).orderBy('c.clientName', 'ASC');

    if (options.clientName) {
      queryBuilder.where('c.clientName ILIKE :clientName', { clientName: `%${options.clientName}%` });
    }

    return paginate<ReturnClientCredcoopDto>(queryBuilder, options);
  }

  async getClientsIdAndName(options: { clientName?: string }): Promise<ReturnClientCredcoopDto[]> {
    const queryBuilder = this.clientCredcoopRepository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.clientName']).orderBy('c.clientName', 'ASC');
  
    if (options.clientName) {
      queryBuilder.where('c.clientName ILIKE :clientName', { clientName: `%${options.clientName}%` });
    }
  
    return queryBuilder.getMany();
  }

  async findClientCredcoopById(ClientCredcoopId: number): Promise<CredcoopClientEntity> {
    const user = await this.clientCredcoopRepository.findOne({
      where: { id: ClientCredcoopId },
    });

    if (!user) {
      throw new NotFoundException(`User ${ClientCredcoopId} not found`);
    }
    return user;
  }

  async findAll(): Promise<CredcoopClientEntity[]> {
    return await this.clientCredcoopRepository.find();
  }

  async findOne(id: number): Promise<CredcoopClientEntity> {
    return await this.clientCredcoopRepository.findOne({
      where: {
        id: id,
      },
      relations: ['clientAddresses', 'clientLoans']
    });
  }

  async editClient(id: number, updatedData: ReturnClientCredcoopDto): Promise<CredcoopClientEntity> {
    const existingClient = await this.clientCredcoopRepository.findOne({
      where: {
        id: id,
      },
      relations: ['clientAddresses', 'clientLoans']
    });

    if (!existingClient) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    Object.assign(existingClient, updatedData); ReturnClientCredcoopDto
    return this.clientCredcoopRepository.save(existingClient);
  }

  async deleteClientCredcoop(ClientCredcoopId: number): Promise<void> {
    const clientCredcoop = await this.clientCredcoopRepository.findOne({
      where: { id: ClientCredcoopId },
    });
    if (!clientCredcoop) {
      throw new NotFoundException(`ClientCredcoop ${ClientCredcoopId} not found`);
    }
    await this.clientCredcoopRepository.remove(clientCredcoop);
  }

  async getTotalItemsInDatabase(): Promise<number> {
    return this.clientCredcoopRepository.count();
  }

  async getTotalClientCredcoop(): Promise<number> {
    return this.clientCredcoopRepository.count();
  }
}
