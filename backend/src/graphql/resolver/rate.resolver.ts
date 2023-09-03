import { Query, Resolver } from '@nestjs/graphql';
import { RateEntity } from 'src/rate/entities/rate.entity';
import { RateService } from 'src/rate/rate.service';

@Resolver(() => RateEntity)
export class RateResolver {

	constructor(private readonly rateService: RateService) { }

	// Retorna a taxa mais recente cadastrada permitindo calcular os empréstimos sempre com a taxa atualizada
	@Query(() => RateEntity)
	async getLatestRate(): Promise<RateEntity> {
		const latestRate = await this.rateService.getLatestRate();
		return latestRate;
	}

}