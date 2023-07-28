import { Module } from '@nestjs/common';
import { ClientCredcoopService } from './client-credcoop.service';
import { ClientCredcoopController } from './client-credcoop.controller';
import { ClientCredcoopEntity } from './entities/client-credcoop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientCredcoopResolver } from 'src/graphql/resolver/client-credcoop.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ClientCredcoopEntity])],
  controllers: [ClientCredcoopController],
  providers: [ClientCredcoopResolver, ClientCredcoopService],
  exports: [ClientCredcoopService],
})
export class ClientCredcoopModule { }
