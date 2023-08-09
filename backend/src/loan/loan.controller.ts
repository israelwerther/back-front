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

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('contractNumber') contractNumber?: string
  ): Promise<Pagination<ReturnClientLoanDto>> {
    limit = limit > 100 ? 100 : limit;
    const options = { page, limit, contractNumber };

    const data = await this.loanService.getAllLoan(options);

    return {
      items: data.items,
      meta: {
        ...data.meta,
      },
    };
  }

  @Get()
  findAll() {
    return this.loanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loanService.findOne(+id);
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loanService.update(+id, updateLoanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loanService.remove(+id);
  }
}
