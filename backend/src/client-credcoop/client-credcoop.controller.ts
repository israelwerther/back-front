import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientCredcoopService } from './client-credcoop.service';
import { CreateClientCredcoopDto } from './dto/create-client-credcoop.dto';
import { UpdateClientCredcoopDto } from './dto/update-client-credcoop.dto';

@Controller('client-credcoop')
export class ClientCredcoopController {
  constructor(private readonly clientCredcoopService: ClientCredcoopService) { }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createClientCredcoopDto: CreateClientCredcoopDto) {
    return await this.clientCredcoopService.createClientCredcoop(createClientCredcoopDto);
  }

  @Get()
  findAll() {
    return this.clientCredcoopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientCredcoopService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientCredcoopDto: UpdateClientCredcoopDto) {
    return this.clientCredcoopService.update(+id, updateClientCredcoopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientCredcoopService.remove(+id);
  }
}
