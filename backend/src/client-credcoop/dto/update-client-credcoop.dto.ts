import { PartialType } from '@nestjs/mapped-types';
import { CreateClientCredcoopDto } from './create-client-credcoop.dto';

export class UpdateClientCredcoopDto extends PartialType(CreateClientCredcoopDto) {}
