import { Module } from '@nestjs/common';
import { ClientAddressService } from './client-address.service';
import { ClientAddressController } from './client-address.controller';
import { ClientAddressEntity } from './entities/client-address.entity';
import { ClientCredcoopModule } from 'src/client-credcoop/client-credcoop.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClientAddressEntity]), ClientCredcoopModule],
  controllers: [ClientAddressController],
  providers: [ClientAddressService]
})
export class ClientAddressModule { }
