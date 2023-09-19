import { Query, Resolver, Args, Float } from '@nestjs/graphql';
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

  // @Query()
  // async calculateLoanValues(
  //   @Args('loanAmount', { type: () => Float }) loanAmount: number,
  //   @Args('amountOfInstallments', { type: () => Float }) amountOfInstallments: number,
  //   @Args('loanStartDate') loanStartDate: Date,
  // ): Promise<LoanCalculation> {
  //   // Implemente a lógica para calcular os valores do empréstimo aqui
  //   const calculatedValues = this.loanService.calculateLoanValues(loanAmount, amountOfInstallments, loanStartDate);

  //   // Crie e retorne uma instância do tipo LoanCalculation com os valores calculados
  //   const loanCalculation = new LoanCalculation();
  //   loanCalculation.calculatedInstallmentValue = calculatedValues.calculatedInstallmentValue;
  //   loanCalculation.charges = calculatedValues.charges;
  //   loanCalculation.valueMain = calculatedValues.valueMain;
  //   // Defina outras propriedades

  //   return loanCalculation;
  // }


}
