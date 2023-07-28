import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, DefaultValuePipe, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CredcoopClientService } from './credcoop-client.service';
import { CreateCredcoopClientDto } from './dto/create-credcoop-client.dto';
import { UpdateClientCredcoopDto } from './dto/update-credcoop-client.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnClientCredcoopDto } from './dto/return-credcoop-client.dto';
import { CredcoopClientEntity } from './entities/credcoop-client.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Roles(UserType.User)
@Controller('credcoop-client')
export class ClientCredcoopController {
  constructor(private readonly credcoopClientService: CredcoopClientService) { }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createCredcoopClient: CreateCredcoopClientDto): Promise<CredcoopClientEntity> {
    return await this.credcoopClientService.createCredcoopClient(createCredcoopClient);
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('clientName') clientName?: string
  ): Promise<Pagination<ReturnClientCredcoopDto>> {
    limit = limit > 100 ? 100 : limit;
    const options = { page, limit, clientName };

    const data = await this.credcoopClientService.getAllClientCredcoop(options);

    const totalItemsInDatabase = await this.credcoopClientService.getTotalItemsInDatabase();
    
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
    return this.credcoopClientService.getClientsIdAndName({ clientName });
  }

  @Get(':total-credcoop-client')
  async returnTotalClientCredcoop() {
    const totalClientCredcoop = await this.credcoopClientService.getTotalClientCredcoop();
    return { 
      totalClientCredcoop: totalClientCredcoop
    };
  }

  @Get()
  findAll() {
    return this.credcoopClientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CredcoopClientEntity> {
    const client = await this.credcoopClientService.findOne(id);

    if (!client) {
      throw new NotFoundException('ClientCredcoop not found.');
    }

    return client;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() returnClientCredcoopDto: ReturnClientCredcoopDto) {
    return this.credcoopClientService.editClient(+id, returnClientCredcoopDto);
  }

  @Delete(':id')
  async deleteClientCredcoop(@Param('id') id: number): Promise<void> {
    try {
      await this.credcoopClientService.deleteClientCredcoop(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  

}
