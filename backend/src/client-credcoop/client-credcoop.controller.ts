import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, DefaultValuePipe, ParseIntPipe, NotFoundException } from '@nestjs/common';
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
    @Query('clientName') clientName?: string
  ): Promise<Pagination<ReturnClientCredcoopDto>> {
    limit = limit > 100 ? 100 : limit;
    const options = { page, limit, clientName };

    const data = await this.clientCredcoopService.getAllClientCredcoop(options);

    const totalItemsInDatabase = await this.clientCredcoopService.getTotalItemsInDatabase();
    
    return {
      items: data.items,
      meta: {
        ...data.meta,
        totalItemsInDatabase,
      },
    };
  }

  @Get(':select-client')
  async getClientsIdAndName(clientName?: string): Promise<ReturnClientCredcoopDto[]> {
    return this.clientCredcoopService.getClientsIdAndName({ clientName });
  }

  @Get(':total-client-credcoop')
  async returnTotalClientCredcoop() {
    const totalClientCredcoop = await this.clientCredcoopService.getTotalClientCredcoop();
    return { 
      totalClientCredcoop: totalClientCredcoop
    };
  }

  @Get()
  findAll() {
    return this.clientCredcoopService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ClientCredcoopEntity> {
    const client = await this.clientCredcoopService.findOne(id);

    if (!client) {
      throw new NotFoundException('ClientCredcoop not found.');
    }

    return client;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() returnClientCredcoopDto: ReturnClientCredcoopDto) {
    return this.clientCredcoopService.editClient(+id, returnClientCredcoopDto);
  }

  @Delete(':id')
  async deleteClientCredcoop(@Param('id') id: number): Promise<void> {
    try {
      await this.clientCredcoopService.deleteClientCredcoop(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  

}
