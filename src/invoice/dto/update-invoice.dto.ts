import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  number: string;

  @ApiProperty({ type: String, format: 'date', required: false })
  @IsDateString()
  @IsOptional()
  date_of_issue: Date;

  @ApiProperty({ type: Number, format: 'decimal', required: false, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  total: number;

  @ApiProperty({ type: Number, format: 'int', required: false, minimum: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  third_party_invoiced_id: number;
}
