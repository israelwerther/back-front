import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from 'src/user/enum/user-type.enum';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ReturnClientLoanDto } from './dto/return-client-loan.dto';


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
  async getAll(
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

  
}
