import { Module } from '@nestjs/common';
import { ClientCredcoopService } from './client-credcoop.service';
import { ClientCredcoopController } from './client-credcoop.controller';
import { ClientCredcoopEntity } from './entities/client-credcoop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClientCredcoopEntity])],
  controllers: [ClientCredcoopController],
  providers: [ClientCredcoopService]
})
export class ClientCredcoopModule { }
