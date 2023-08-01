import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, DefaultValuePipe, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CredcoopClientService } from './credcoop-client.service';
import { CreateCredcoopClientDto } from './dto/create-credcoop-client.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnCredcoopClientDto } from './dto/return-credcoop-client.dto';
import { CredcoopClientEntity } from './entities/credcoop-client.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Roles(UserType.User)
@Controller('credcoop-client')
export class CredcoopClientController {
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
  ): Promise<Pagination<ReturnCredcoopClientDto>> {
    limit = limit > 100 ? 100 : limit;
    const options = { page, limit, clientName };

    const data = await this.credcoopClientService.getAllCredcoopClient(options);    
    
    return {
      items: data.items,
      meta: {
        ...data.meta,
      },
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
      throw new NotFoundException('Credcoop Client not found.');
    }

    return client;
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() returnCredcoopClientDto: ReturnCredcoopClientDto) {
    return this.credcoopClientService.editClient(+id, returnCredcoopClientDto);
  }

  @Delete(':id')
  async deleteCredcoopClient(@Param('id') id: number): Promise<void> {
    try {
      await this.credcoopClientService.deleteCredcoopClient(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  

}
