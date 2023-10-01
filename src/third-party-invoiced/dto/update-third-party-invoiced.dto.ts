import { PartialType } from '@nestjs/mapped-types';
import { CreateThirdPartyInvoicedDto } from './create-third-party-invoiced.dto';

export class UpdateThirdPartyInvoicedDto extends PartialType(
  CreateThirdPartyInvoicedDto,
) {}
