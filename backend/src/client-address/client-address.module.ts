import { Module } from '@nestjs/common';
import { ClientAddressService } from './client-address.service';
import { ClientAddressController } from './client-address.controller';
import { ClientAddressEntity } from './entities/client-address.entity';
import { CredcoopClientModule } from 'src/credcoop-client/credcoop-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClientAddressEntity]), CredcoopClientModule],
  controllers: [ClientAddressController],
  providers: [ClientAddressService]
})
export class ClientAddressModule { }
