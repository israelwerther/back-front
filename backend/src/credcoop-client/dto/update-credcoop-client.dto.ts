import { PartialType } from '@nestjs/mapped-types';
import { CreateCredcoopClientDto } from './create-credcoop-client.dto';

export class UpdateClientCredcoopDto extends PartialType(CreateCredcoopClientDto) {}
