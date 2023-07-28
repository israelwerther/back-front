import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredcoopClientDto } from './dto/create-credcoop-client.dto';
import { UpdateCredcoopClientDto } from './dto/update-credcoop-client.dto';
import { CredcoopClientEntity } from './entities/credcoop-client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination, IPaginationOptions, } from 'nestjs-typeorm-paginate';
import { ReturnCredcoopClientDto } from './dto/return-credcoop-client.dto';

@Injectable()
export class CredcoopClientService {
  constructor(
    @InjectRepository(CredcoopClientEntity)
    private readonly credcoopClientRepository: Repository<CredcoopClientEntity>,
  ) { }

  async createCredcoopClient(createCredcoopClientDto: CreateCredcoopClientDto): Promise<CredcoopClientEntity> {
    return await this.credcoopClientRepository.save(createCredcoopClientDto);
  }

  async getAllCredcoopClient(
    options: IPaginationOptions & { clientName?: string }
  ): Promise<Pagination<ReturnCredcoopClientDto>> {
    const queryBuilder = this.credcoopClientRepository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.clientName', 'c.cpf']).orderBy('c.clientName', 'ASC');

    if (options.clientName) {
      queryBuilder.where('c.clientName ILIKE :clientName', { clientName: `%${options.clientName}%` });
    }

    return paginate<ReturnCredcoopClientDto>(queryBuilder, options);
  }

  async getClientsIdAndName(options: { clientName?: string }): Promise<ReturnCredcoopClientDto[]> {
    const queryBuilder = this.credcoopClientRepository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.clientName']).orderBy('c.clientName', 'ASC');
  
    if (options.clientName) {
      queryBuilder.where('c.clientName ILIKE :clientName', { clientName: `%${options.clientName}%` });
    }
  
    return queryBuilder.getMany();
  }

  async findCredcoopClientId(credcoopClientId: number): Promise<CredcoopClientEntity> {
    const user = await this.credcoopClientRepository.findOne({
      where: { id: credcoopClientId },
    });

    if (!user) {
      throw new NotFoundException(`User ${credcoopClientId} not found`);
    }
    return user;
  }

  async findAll(): Promise<CredcoopClientEntity[]> {
    return await this.credcoopClientRepository.find();
  }

  async findOne(id: number): Promise<CredcoopClientEntity> {
    return await this.credcoopClientRepository.findOne({
      where: {
        id: id,
      },
      relations: ['clientAddresses', 'clientLoans']
    });
  }

  async editClient(id: number, updatedData: ReturnCredcoopClientDto): Promise<CredcoopClientEntity> {
    const existingClient = await this.credcoopClientRepository.findOne({
      where: {
        id: id,
      },
      relations: ['clientAddresses', 'clientLoans']
    });

    if (!existingClient) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    Object.assign(existingClient, updatedData); ReturnCredcoopClientDto
    return this.credcoopClientRepository.save(existingClient);
  }

  async deleteCredcoopClient(credcoopClientId: number): Promise<void> {
    const credcoopClient = await this.credcoopClientRepository.findOne({
      where: { id: credcoopClientId },
    });
    if (!credcoopClient) {
      throw new NotFoundException(`credcoopClient ${credcoopClientId} not found`);
    }
    await this.credcoopClientRepository.remove(credcoopClient);
  }

  async getTotalItemsInDatabase(): Promise<number> {
    return this.credcoopClientRepository.count();
  }

  async getTotalCredcoopClient(): Promise<number> {
    return this.credcoopClientRepository.count();
  }
}
