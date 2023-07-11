import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ClientCredcoopService } from './client-credcoop.service';
import { CreateClientCredcoopDto } from './dto/create-client-credcoop.dto';
import { UpdateClientCredcoopDto } from './dto/update-client-credcoop.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnClientCredcoopDto } from './dto/return-client-credcoop.dto';
import { ClientCredcoopEntity } from './entities/client-credcoop.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Roles(UserType.User)
@Controller('client-credcoop')
export class ClientCredcoopController {
  constructor(private readonly clientCredcoopService: ClientCredcoopService) { }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createClientCredcoop: CreateClientCredcoopDto): Promise<ClientCredcoopEntity> {
    return await this.clientCredcoopService.createClientCredcoop(createClientCredcoop);
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<ReturnClientCredcoopDto>> {
    limit = limit > 100 ? 100 : limit;
    return this.clientCredcoopService.getAllClientCredcoop({
      page,
      limit
    });
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
