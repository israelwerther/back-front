import { Resolver, Query } from '@nestjs/graphql';
import { CredcoopClientService } from 'src/credcoop-client/credcoop-client.service';
import { CredcoopClientEntity } from 'src/credcoop-client/entities/credcoop-client.entity';

@Resolver(() => CredcoopClientEntity)
export class CredcoopClientResolver {

  constructor(private readonly credcoopClientService: CredcoopClientService) {}
  @Query(() => [CredcoopClientEntity])
  async credcoopClients(): Promise<CredcoopClientEntity[]> {
    return this.credcoopClientService.findAll();
  }
}