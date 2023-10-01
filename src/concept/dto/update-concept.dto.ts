import { PartialType } from '@nestjs/mapped-types';
import { CreateConceptDto } from './create-concept.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsNotEmpty as IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateConceptDto extends PartialType(CreateConceptDto) {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: Number, format: 'decimal', required: false })
  @IsNumber()
  @IsOptional()
  unit_price: number;

  @ApiProperty({ type: Number, format: 'int', required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  quantity: number;

  @ApiProperty({ type: Number, format: 'int', required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  invoice_id: number;
}
