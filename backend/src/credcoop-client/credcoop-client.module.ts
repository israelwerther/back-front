import { Module } from '@nestjs/common';
import { CredcoopClientService } from './credcoop-client.service';
import { CredcoopClientController } from './credcoop-client.controller';
import { CredcoopClientEntity } from './entities/credcoop-client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredcoopClientResolver } from 'src/graphql/resolver/credcoop-client.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CredcoopClientEntity])],
  controllers: [CredcoopClientController],
  providers: [CredcoopClientResolver, CredcoopClientService],
  exports: [CredcoopClientService],
})
export class CredcoopClientModule { }
