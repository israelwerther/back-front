import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientAddressService } from './client-address.service';
import { CreateClientAddressDto } from './dto/create-client-address.dto';
import { UpdateClientAddressDto } from './dto/update-client-address.dto';
import { ClientAddressEntity } from './entities/client-address.entity';

@Controller('client-address')
export class ClientAddressController {
  constructor(private readonly clientAddressService: ClientAddressService) { }

  @Post('/:clientCredcoopId')
  create(
    @Body() createClientAddressDto: CreateClientAddressDto,
    @Param('clientCredcoopId') clientCredcoopId: number
  ): Promise<ClientAddressEntity> {
    return this.clientAddressService.createClientCredcoopAddress(createClientAddressDto, clientCredcoopId);
  }

  @Get()
  findAll() {
    return this.clientAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientAddressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientAddressDto: UpdateClientAddressDto) {
    return this.clientAddressService.update(+id, updateClientAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientAddressService.remove(+id);
  }
}
