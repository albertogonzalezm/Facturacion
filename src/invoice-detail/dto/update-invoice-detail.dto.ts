import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDetailDto } from './create-invoice-detail.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty as IsOptional } from 'class-validator';

export class UpdateInvoiceDetailDto extends PartialType(
  CreateInvoiceDetailDto,
) {
  @ApiProperty({ type: Number, format: 'int', required: false })
  @IsInt()
  @IsOptional()
  invoice_id: number;

  @ApiProperty({ type: Number, format: 'int', required: false })
  @IsInt()
  @IsOptional()
  concept_id: number;

  @ApiProperty({ type: Number, format: 'int', required: false })
  @IsInt()
  @IsOptional()
  quantity: number;
}
