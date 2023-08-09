import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanInstallmentDto } from './create-loan-installment.dto';

export class UpdateLoanInstallmentDto extends PartialType(CreateLoanInstallmentDto) {}
