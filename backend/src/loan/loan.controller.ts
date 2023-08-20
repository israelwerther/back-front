import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, DefaultValuePipe, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from 'src/user/enum/user-type.enum';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ReturnClientLoanDto } from './dto/return-client-loan.dto';
import { LoanEntity } from './entities/loan.entity';


@Roles(UserType.User)
@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) { }

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.createLoan(createLoanDto);
  }

  @Get('/credcoop')
  async getAllCredcoopLoan(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('searchQuery') searchQuery?: string,
  ): Promise<Pagination<ReturnClientLoanDto>> {
    limit = limit > 100 ? 100 : limit;
    const options = { page, limit, searchQuery };

    const data = await this.loanService.getAllCredcoopLoan(options);

    return {
      items: data.items,
      meta: { ...data.meta }
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<LoanEntity> {
    const client = await this.loanService.findOne(id);

    if (!client) {
      throw new NotFoundException('Credcoop Loan not found.');
    }

    return client;
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() returnClientLoanDto: ReturnClientLoanDto) {
    return this.loanService.editLoan(+id, returnClientLoanDto);
  }
  
}
