import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
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

  @ApiProperty({ type: Number, format: 'decimal', minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  total: number;

  @ApiProperty({ type: Number, format: 'int', minimum: 1 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  third_party_invoiced_id: number;
}
