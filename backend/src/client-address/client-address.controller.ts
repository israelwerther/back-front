import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientAddressService } from './client-address.service';
import { CreateClientAddressDto } from './dto/create-client-address.dto';
import { UpdateClientAddressDto } from './dto/update-client-address.dto';
import { ClientAddressEntity } from './entities/client-address.entity';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from 'src/user/enum/user-type.enum';

@Roles(UserType.User)
@Controller('client-address')
export class ClientAddressController {
  constructor(private readonly clientAddressService: ClientAddressService) { }

  @Post('/:credcoopClientId')
  create(
    @Body() createClientAddressDto: CreateClientAddressDto,
    @Param('credcoopClientId') credcoopClientId: number
  ): Promise<ClientAddressEntity> {
    return this.clientAddressService.createCredcoopClientAddress(createClientAddressDto, credcoopClientId);
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
