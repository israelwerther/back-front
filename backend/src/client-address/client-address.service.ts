import { Injectable } from '@nestjs/common';
import { CreateClientAddressDto } from './dto/create-client-address.dto';
import { UpdateClientAddressDto } from './dto/update-client-address.dto';
import { ClientAddressEntity } from './entities/client-address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientCredcoopService } from 'src/client-credcoop/client-credcoop.service';
import { Repository } from 'typeorm';

@Injectable()
export class ClientAddressService {
  constructor(
    @InjectRepository(ClientAddressEntity)
    private readonly clientAddressRepository: Repository<ClientAddressEntity>,
    private readonly clientCredcoopService: ClientCredcoopService,
  ) { }

  async createClientCredcoopAddress(
    createClientAddressDto: CreateClientAddressDto,
    clientCredcoopId: number
  ): Promise<ClientAddressEntity> {
    await this.clientCredcoopService.findClientCredcoopById(clientCredcoopId);
    return this.clientAddressRepository.save({
      ...createClientAddressDto,
      clientCredcoopId,
    });
  }

  findAll() {
    return `This action returns all clientAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientAddress`;
  }

  update(id: number, updateClientAddressDto: UpdateClientAddressDto) {
    return `This action updates a #${id} clientAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientAddress`;
  }
}
