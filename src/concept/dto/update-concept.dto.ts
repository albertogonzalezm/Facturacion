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

  @ApiProperty({ type: Number, format: 'decimal', required: false, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  unit_price: number;

  @ApiProperty({ type: Number, format: 'int', required: false, minimum: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  quantity: number;

  @ApiProperty({ type: Number, format: 'int', required: false, minimum: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  invoice_id: number;
}
