import { Query, Resolver, Args } from '@nestjs/graphql';
import * as moment from 'moment-timezone';
import { LoanService } from 'src/loan/loan.service';

@Resolver()
export class LoanResolver {
  constructor(private loanService: LoanService) {}

  @Query(() => [Date])
  async getInstallmentDates(
    @Args('startDate') startDate: string,
    @Args('amountOfInstallments') amountOfInstallments: number,
  ): Promise<Date[]> {
    const parsedStartDate = moment.tz(startDate, 'UTC');
    return this.loanService.createInstallmentDates(
      parsedStartDate,
      amountOfInstallments,
    );
  }
}
