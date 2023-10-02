import { PartialType } from '@nestjs/mapped-types';
import { CreateThirdPartyInvoicedDto } from './create-third-party-invoiced.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateThirdPartyInvoicedDto extends PartialType(
  CreateThirdPartyInvoicedDto,
) {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  phone?: string;
}
