import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDetailDto } from './create-invoice-detail.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty as IsOptional, Min } from 'class-validator';

export class UpdateInvoiceDetailDto extends PartialType(
  CreateInvoiceDetailDto,
) {
  @ApiProperty({ type: Number, format: 'int', required: false, minimum: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  invoice_id: number;

  @ApiProperty({ type: Number, format: 'int', required: false, minimum: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  concept_id: number;

  @ApiProperty({ type: Number, format: 'int', required: false, minimum: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  quantity: number;
}
