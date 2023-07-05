import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) { }

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAddressDto.cityId);
    return this.addressRepository.save({
      ...createAddressDto,
      userId,
    });
  }

  async deleteAddress(addressId: number, userId: number): Promise<void> {
    const address = await this.addressRepository.findOne({
      where: {
        id: addressId,
        userId: userId,
      },
    });

    if (!address) {
      throw new Error(
        `Endereço com ID ${addressId} não encontrado para o usuário com ID ${userId}.`,
      );
    }

    await this.addressRepository.remove(address);
  }
}
