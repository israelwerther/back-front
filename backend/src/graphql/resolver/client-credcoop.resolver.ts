import { Resolver, ResolveField, Query } from '@nestjs/graphql';
import { ClientCredcoopService } from 'src/client-credcoop/client-credcoop.service';
import { ClientCredcoopEntity } from 'src/client-credcoop/entities/client-credcoop.entity';

@Resolver(() => ClientCredcoopEntity)
export class ClientCredcoopResolver {

  constructor(private readonly clientCredcoopService: ClientCredcoopService) {}
  @Query(() => [ClientCredcoopEntity])
  async allClientCredcoops(): Promise<ClientCredcoopEntity[]> {
    return this.clientCredcoopService.findAll();
  }
}