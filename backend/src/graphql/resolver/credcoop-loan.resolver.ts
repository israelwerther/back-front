import { Query,Int, Resolver } from "@nestjs/graphql";
import { LoanEntity } from "src/loan/entities/loan.entity";
import { LoanService } from "src/loan/loan.service";

@Resolver(() => LoanEntity)
export class CredcoopLoanResolver {
    constructor(private readonly loanService:LoanService) {}

    @Query(() => Int)
    async getTotalCredcoopLoans() {
        const totalCredcoopLoans = await this.loanService.getTotalCredcoopLoans();
        return totalCredcoopLoans;
    }
}