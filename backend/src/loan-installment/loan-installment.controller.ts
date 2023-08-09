import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoanInstallmentService } from './loan-installment.service';
import { CreateLoanInstallmentDto } from './dto/create-loan-installment.dto';
import { UpdateLoanInstallmentDto } from './dto/update-loan-installment.dto';
import { LoanInstallment } from './entities/loan-installment.entity';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from 'src/user/enum/user-type.enum';

@Roles(UserType.User)
@Controller('loan-installment')
export class LoanInstallmentController {
  constructor(private readonly loanInstallmentService: LoanInstallmentService) {}

  @Post('/:loanId')
  create(
    @Body() createLoanInstallmentDto: CreateLoanInstallmentDto,
    @Param('loanId') loanId: number
    ): Promise<LoanInstallment>{
    return this.loanInstallmentService.createLoanInstallment(createLoanInstallmentDto, loanId);
  }

  @Get()
  findAll() {
    return this.loanInstallmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loanInstallmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoanInstallmentDto: UpdateLoanInstallmentDto) {
    return this.loanInstallmentService.update(+id, updateLoanInstallmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loanInstallmentService.remove(+id);
  }
}
