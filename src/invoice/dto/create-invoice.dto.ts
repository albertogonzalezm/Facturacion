import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ type: String, format: 'date' })
  @IsDateString()
  @IsNotEmpty()
  date_of_issue: Date;

  @ApiProperty({ type: Number, format: 'decimal' })
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty({ type: Number, format: 'int' })
  @IsInt()
  @IsNotEmpty()
  third_party_invoiced_id: number;
}
